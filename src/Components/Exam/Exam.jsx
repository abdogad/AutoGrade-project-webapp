import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./exam.css";
import apis from '../../apis/apis';

export default function Exam() {
  const [formData, setFormData] = useState({
    
      name: '',
      email: '',
      title: '',
      questions: [],
    
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    
    apis.getExamById(id).then((res) => {
      setFormData({
        ...formData,
        title: res.data.title,
        questions: res.data.questions.map((question) => ({ id: question.id, question: question.question, answer: '' }))
      });
      setLoading(false);
    }
    ).catch(() => {
      setLoading(false);
    });
    console.log(formData);

  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAnswerChange = (index, event) => {
    console.log(formData);
    const { value } = event.target;
    const newQuestions = [...formData.questions];
    newQuestions[index].answer = value;
    setFormData({
      ...formData,
      questions: newQuestions
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    apis.submitExam({exam_id: id, student_name: formData.name, student_email: formData.email, questions: formData.questions}).then((res) => {
      console.log(res);
      
    }
    ).catch((err) => {
      console.log(err);
    }
    );

  };

  return (
    <>
      <div className="container  accordion-body d-flex justify-content-center flex-column flex py-5">
      <div className="text-center pb-5">

<h2 >{formData.title}</h2>
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
          {formData.questions.map((question,index) => (
            <div className="exam-question my-3" key={question.id}>
              <h4>{question.question}</h4>
              <input
                className='form-control my-3'
                type="text"
                placeholder="Enter your answer"
                value={question.answer}
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
