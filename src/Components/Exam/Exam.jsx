import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./exam.css";
import apis from "../../apis/apis";

export default function Exam() {
  const [formData, setFormData] = useState({
    title: "",
    questions: [],
  });
  const [end_time, setEndTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Active");
  const { id } = useParams();

  useEffect(() => {
    apis
      .getExamById(id)
      .then((res) => {
        if (res.data.message){
          
          setStatus(res.data.message);
          setLoading(false);
          return;
        }
        setFormData({
          ...formData,
          title: res.data.title,
          questions: res.data.questions.map((question) => ({
            id: question.id,
            question: question.question,
            answer: "",
          })),
        });
        setEndTime(new Date(res.data.end_time));
        
        
        setLoading(false);
      })
      .catch((err) => {
        
        setStatus("Not found");
        setLoading(false);
      });
  }, [id]); // Added id as a dependency

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAnswerChange = (index, event) => {
    console.log(formData.questions);
    const { value } = event.target;
    const newQuestions = [...formData.questions];
    newQuestions[index].answer = value;
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apis
      .submitExam({
        exam_id: id,
        student_name: formData.name,
        student_email: formData.email,
        questions: formData.questions,
      })
      .then((res) => {
        
        window.location.href = "/home";
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const seconds_to_ms = (d) => {
    d = Number(d);
    var m = Math.floor(d / 60);
    var s = Math.floor((d % 3600) % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  useEffect(() => {
    if (end_time) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = end_time - now;
        setRemainingTime(distance);

        if (distance < 0) {
          clearInterval(interval);
          setRemainingTime(0);
          // Handle exam end (e.g., auto-submit)
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [end_time]);

  if (loading) {
    return <div style={{
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"2rem"
        
    }}></div>;
  }
  if (status !== "Active") {
    return <div style={{
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"2rem"

    }}>{status}</div>;
  }

  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
        
    
    }}>
    <div className="exam-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h1>{formData.title}</h1>
          <div className="time-remaining">
            {remainingTime !== null ? (
              <span>{seconds_to_ms(remainingTime / 1000)}</span>
            ) : null}
          </div>
        </div>

        {formData.questions.map((q, index) => (
          <div className="question" key={q.id}>
            <div className="question-text">
              <h4>{`Q${index + 1}: `}</h4>
              <span>{q.question}</span>
            </div>
            <textarea
              className="answer-box"
              placeholder="Write your answer here..."
              value={q.answer}
              onChange={(e) => handleAnswerChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}
