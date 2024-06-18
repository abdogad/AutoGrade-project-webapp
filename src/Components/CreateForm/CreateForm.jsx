import React, { useState } from 'react';
import "./form.css";
import Question from './Question';

// Question component


// CreateForm component
export default function CreateForm() {
  // State to manage the list of questions
  const [questions, setQuestions] = useState([]);

  // Function to add a new question to the list
  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  // Function to handle changes in question or answer inputs
  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Function to remove a question from the list
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  // Function to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(questions);
    // Here you can send the questions array to your backend or wherever you need
  };

  return (
    <div className="container ">
      <div className="text-center py-5">

<h2 >Title of exam</h2>
      </div>
    
    <form onSubmit={handleSubmit}>
      <div className="createForm py-5">
        <div className="container d-flex justify-content-center">
          <div className="boxInput w-50">
            {/* Render existing questions */}
            {questions.length!==0?questions.map((question, index) => (
              <Question
                key={index}
                index={index}
                questionData={question}
                handleChange={handleChange}
                removeQuestion={removeQuestion}
              />
            )):<><h1>No questions added yet</h1></>}
            {/* Button to add new question */}
            <button type="button" onClick={addQuestion} className='btn btn-primary mx-3 px-4'>Add New Question</button>
            {/* Button to submit the form */}
            <button type="submit" className='btn btn-success'>Submit</button>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
}
