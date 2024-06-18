import React, { useState, useEffect } from 'react';
import "./exam.css";

export default function Exam() {
  const [formData, setFormData] = useState(() => {
    // Load formData from localStorage or use default values
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      answers: []
    };
  });

  useEffect(() => {
    // Save formData to localStorage whenever it changes
    localStorage.setItem('formData', JSON.stringify(formData));

    // Cleanup function to delete formData from localStorage when component unmounts
    return () => {
      localStorage.removeItem('formData');
    };
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAnswerChange = (index, event) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = { id: index, answer: event.target.value };
    setFormData({
      ...formData,
      answers: updatedAnswers
    });
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, { id: formData.answers.length, answer: '' }]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Send formData to your backend or perform further processing here
  };

  return (
    <>
      <div className="container  accordion-body d-flex justify-content-center flex-column flex py-5">
      <div className="text-center pb-5">

<h2 >Title of exam</h2>
      </div>
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
          <div className="information d-flex flex-column w-100">
            <label htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                className='form-control my-3'
                type="text"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                className='form-control my-3'
                type="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          {formData.answers.map((answer, index) => (
            <div className="exam-question my-3" key={index}>
              <h4>Qَuestion {index + 1}</h4>
              <input
                className='form-control my-3'
                type="text"
                placeholder="Enter your answer"
                value={answer.answer}
                onChange={(event) => handleAnswerChange(index, event)}
              />
            </div>
          ))}
          {/* <button type="button" onClick={addAnswer} className='btn btn-primary mx-3 px-4'>Add Answer</button> */}
          <button type="submit" className='btn btn-success'>Submit</button>
        </form>
      </div>
    </>
  );
}
