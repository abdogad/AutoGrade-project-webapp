export default function  Question ({ index, questionData, handleChange, removeQuestion })  {
  return (
    <div className="question my-3">
      <input
        className='form-control my-2'
        type="text"
        placeholder="Enter your question"
        value={questionData.question}
        onChange={(e) => handleChange(index, 'question', e.target.value)}
      />
      <input
        className='form-control my-2'
        type="text"
        placeholder="Enter the answer"
        value={questionData.answer}
        onChange={(e) => handleChange(index, 'answer', e.target.value)}
      />
      <button className='btn btn-danger' onClick={() => removeQuestion(index)}>Remove</button>
      <div className="brdr my-3"></div>
    </div>
  );
};