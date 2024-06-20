import React from 'react';

export default function Question({ index, questionData, handleChange, removeQuestion }) {
  return (
    <div className="question my-3">
      <input
        className='form-control my-2'
        type="text"
        placeholder="Enter your question"
        value={questionData.question}
        onChange={(e) => handleChange(index, 'question', e.target.value)}
      />
      {questionData.graded && (
      <input
        className='form-control my-2'
        type="text"
        placeholder="Enter the answer"
        value={questionData.answer}
        onChange={(e) => handleChange(index, 'answer', e.target.value)}
      />
      )}
      <div className="form-check form-switch my-2">
        <input
          className="form-check-input"
          type="checkbox"
          id={`gradedToggle${index}`}
          checked={questionData.graded}
          onChange={(e) => handleChange(index, 'graded', e.target.checked)}
        />
        <label className="form-check-label" htmlFor={`gradedToggle${index}`}>
          Graded
        </label>
      </div>
      <button className='btn btn-danger' onClick={() => removeQuestion(index)}>Remove</button>
      <div className="brdr my-3"></div>
    </div>
  );
}
