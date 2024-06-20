import React, { useState } from 'react';
import "./form.css";
import Question from './Question';
import apis from '../../apis/apis';
import { FaRegQuestionCircle } from 'react-icons/fa';

// CreateForm component
export default function CreateForm() {
  // State to manage the list of questions
  const [questions, setQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Function to add a new question to the list
  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '',graded: true }]);
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
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }
    
    event.preventDefault();
    apis.createExam({ title: examTitle, questions: questions, start_time: startTime, end_time: endTime })
      .then((res) => {
        if (res.status === 200) {
          
          window.location.href = '/home';
        } else {
          alert('Failed to create exam');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="exam-title-container">
        <input 
          type="text" 
          className='exam-title' 
          placeholder="Enter exam title" 
          value={examTitle} 
          onChange={(e) => setExamTitle(e.target.value)}
          required
        />
        <hr className="title-divider" />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="time-inputs">
          <label>
            Start Time:
            <input 
              type="datetime-local" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
              required
            />
          </label>
          <label>
            End Time:
            <input 
              type="datetime-local" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)}
              min={startTime}
              required
            />
          </label>
        </div>
        <div className="createForm py-3">
          <div className="container d-flex justify-content-center">
            <div className="boxInput w-50">
              {questions.length !== 0 ? (
                questions.map((question, index) => (
                  <Question
                    key={index}
                    index={index}
                    questionData={question}
                    handleChange={handleChange}
                    removeQuestion={removeQuestion}
                  />
                ))
              ) : (
                <div className="no-questions">
                  <FaRegQuestionCircle className="no-questions-icon" />
                  <h1>No questions added yet</h1>
                </div>
              )}
              <div className="buttons-container">
                <button type="button" onClick={addQuestion} className="btn btn-primary exam-button">
                  Add New Question
                </button>
                <button type="submit" className="btn btn-success exam-button">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
