from django.shortcuts import render
from django.views import View
from .models import Exam
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import *
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .tasks import make_request_to_model_api, add_answers
import logging
import pandas as pd
import json
import os
from django.conf import settings
from django.core.files.storage import default_storage


logger = logging.getLogger(__name__)

# Create your views here.
class CreateExamAPI(generics.CreateAPIView):
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        title = request.data['title']
        start_time = request.data['start_time']
        end_time = request.data['end_time']
        questions = []

        # Iterate over request data to collect questions
        for key in request.data.keys():
            if key.startswith('questions'):
                question_data = json.loads(request.data[key])
                questions.append({
                    'question': question_data['question'],
                    'answer': question_data['answer'],
                    'graded': question_data['graded']
                })
        exam = Exam.objects.create(
            title=title,
            start_time=start_time,
            end_time=end_time,
            user=request.user
        )
        
        columns = ['score']
        columns_last = []
        for question in questions:
            Question.objects.create(
                exam=exam,
                question=question['question'],
                answer=question['answer'],
                graded=question['graded']
            )
            if question['graded'] == False:
                columns.append(question['question'])
            else:
                columns_last.append(question['question'] + "_score")
        columns += columns_last
        if request.data.get('file'):
            print(request.data['file'])
            file = request.data['file']
            file_path = default_storage.save(file.name, file)
            file_path = os.path.join(settings.MEDIA_ROOT, file_path)
            add_answers.delay(file_path, exam.id)
        df = pd.DataFrame(columns=columns)
        print(df)
        df.to_csv(f'media/results_{exam.id}.csv', index=False)
        return Response({"message": "Exam created successfully"})

# class TestView(View):
#     def get(self, request):
#         make_request_to_model_api(38)

class ExamListAPI(generics.ListAPIView):
    serializer_class = ExamSerializer
    def get_queryset(self):
        return Exam.objects.filter(user=self.request.user)

class ExamQuestionsAPI(generics.RetrieveAPIView):
    serializer_class = QuestionSerializer
    def get(self, request, *args, **kwargs):
        exam_id = self.kwargs['pk']
        exam = get_object_or_404(Exam, id=exam_id)
        if exam.start_time > timezone.now():
            return Response({"message": "Exam not started yet"})
        if exam.end_time < timezone.now():
            return Response({"message": "Exam already ended"})
        if Responses.objects.filter(user=request.user, question__exam=exam).exists():
            return Response({"message": "You have already attempted the exam"})
        questions = Question.objects.filter(exam=exam_id)
        serializer = QuestionSerializer(questions, many=True)
        return Response({
            "questions": serializer.data,
            "title": exam.title,
            "end_time": exam.end_time,
            "start_time": exam.start_time
        })

        
class ResponseSendAPI(generics.CreateAPIView):
    serializer_class = ResponseSerializer
    def post(self, request, *args, **kwargs):
        responses = Responses.objects.filter(user=request.user, question__exam=request.data['exam_id'])
        if responses.exists():
            return Response({"message": "You have already attempted the exam"})
        questions = request.data['questions']
        for question in questions:
            response = Responses.objects.create(
                question_id=question['id'],
                user=request.user,
                response=question['answer']
            )
        
        
        make_request_to_model_api.delay(request.data['exam_id'], request.user.id)
            
        return Response({"message": "Response sent successfully"})
    
        
