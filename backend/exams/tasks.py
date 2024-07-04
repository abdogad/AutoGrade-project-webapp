from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Responses, Question
import requests
import pandas as pd
import os
from django.conf import settings
import firebase_admin
from firebase_admin import credentials, firestore
import cohere
from django.core.files.storage import default_storage
import fitz
from langchain.text_splitter import CharacterTextSplitter




@shared_task
def make_request_to_model_api(exam_id, user_id):
    
    # print(db)
    user = {
        "user": user_id,
        "responses": [],
        "non_graded_responses": []
    }
    
    responses = Responses.objects.filter(user=user['user'], question__exam=exam_id)
    for response in responses:
        if response.question.graded:
            user['responses'].append({
                "question": response.question.question,
                "response": response.response,
                "answer": response.question.answer
            })
        else:
            user['non_graded_responses'].append({
                "question": response.question.question,
                "response": response.response
            })
    print(2)
    url = "API_URL"
    print(url)
    print(1)
    total_score = 0
    scores = []
    for response in user['responses']:
        request = {
            "quetion": response['question'],
            "answer": response['response'],
            "context": response['answer'],
            "num_beams": 1,
            "max_new_tokens": 20,
            "do_sample": "False",
            "id": 0,
            "generate":0
        }
        print(request)
        response = requests.post(url, json=request)
        print(response)
        score = float(response.json()['true'])  # Ensure there's a default value in case of missing key
        scores.append(score)
        # score = 1
        total_score += score

    print(len(user['responses']))
    user['score'] = total_score / len(user['responses']) if len(user['responses']) > 0 else 0
    
    data = []
    tmp = [user['score']] + [x['response'] for x in user['non_graded_responses']] + scores
    data.append(tmp)
            
    columns = ['score'] + [x['question'] for x in user['non_graded_responses']] + [x['question'] + "_score" for x in user['responses']]
    
    # Use settings.MEDIA_ROOT for the file path
    media_dir = settings.MEDIA_ROOT
    if not os.path.exists(media_dir):
        os.makedirs(media_dir)
    
    file_path = os.path.join(media_dir, f'results_{exam_id}.csv')
    
    
    df = pd.read_csv(file_path)
    df = pd.concat([df, pd.DataFrame(data, columns=columns)])
    

    df.to_csv(file_path, index=False)
    
    
@shared_task
def add(x, y):
    return x + y

@shared_task
def add_answers(file_path, exam_id):
    # Initialize Cohere client
    cohere_client = cohere.Client('api_key')
    
    #create a file path
    
    print(file_path)
    # Extract text from the PDF
    document_texts = []
    with fitz.open(file_path) as pdf:
        for page_num in range(len(pdf)):
            page = pdf.load_page(page_num)
            text = page.get_text()
            document_texts.append(text)
    
    # Split text into smaller documents (e.g., by paragraph)
    text_splitter = CharacterTextSplitter(chunk_size = 1000, chunk_overlap=200, separator='', strip_whitespace=False)
    documents = text_splitter.create_documents(document_texts)
    document_strings = [doc.page_content for doc in documents]
    # Embed documents using Cohere
    embeddings = cohere_client.embed(texts=document_strings).embeddings
    

    
    # Get the questions for the exam
    questions = Question.objects.filter(exam=exam_id)
    
    # Store the answers
    for question in questions:
        if question.graded is True:
            question_embedding = cohere_client.embed(texts=[question.question]).embeddings[0]
            similarities = [cosine_similarity(question_embedding, doc_embedding) for doc_embedding in embeddings]
            print(similarities)
            # Get the top 5 documents
            top_5_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:5]
            top_5_docs = [document_strings[i] for i in top_5_indices]
            
            # Save the top 5 documents as the answer
            question.answer = '\n\n'.join(top_5_docs)
            
            question.save()
    #remove the file
    os.remove(file_path)

def cosine_similarity(vec1, vec2):
    dot_product = sum(p*q for p, q in zip(vec1, vec2))
    magnitude1 = sum((p**2) for p in vec1) ** 0.5
    magnitude2 = sum((q**2) for q in vec2) ** 0.5
    if not magnitude1 or not magnitude2:
        return 0
    return dot_product / (magnitude1 * magnitude2)
    
    
