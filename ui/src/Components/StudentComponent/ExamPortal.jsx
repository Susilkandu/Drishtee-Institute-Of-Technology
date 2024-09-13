import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { submitAnswer } from '../../api/studentApi/api'; // Adjusted import path
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const ExamPortal = () => {
  const questions = useSelector(state => state.exmQstns.questions);
  const examId = useSelector(state => state.exmQstns.examId);
  const [answers, setAnswers] = useState([]);

  // Update the answer for a specific question
  const handleOptionChange = (questionId, optionKey) => {
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(answer => answer._id === questionId);

      if (existingAnswerIndex > -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { _id: questionId, rsAns: optionKey };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { _id: questionId, rsAns: optionKey }];
      }
    });
  };

  // Validate if all questions have been answered
  const validateAnswers = () => {
    const answeredQuestionIds = answers.map(answer => answer._id);
    const allQuestionIds = questions.map(q => q._id);

    return allQuestionIds.every(questionId => answeredQuestionIds.includes(questionId));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateAnswers()) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    console.log('Selected Answers:', answers);

    try {
      const rspns = await submitAnswer(examId, answers);
      toast.success('Answers submitted successfully!');
      // Handle the response here (e.g., show success message or handle errors)
      console.log(rspns);
    } catch (error) {
      toast.error('Submission failed. Please try again.');
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      {!questions || questions.length === 0 ? (
        <p className="text-center">No questions available</p>
      ) : (
        questions.map(q => (
          <div key={q._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{q.question}</h5>
              <div className="form-group">
                {Object.entries(q.options).map(([key, option]) => (
                  <div className="form-check" key={key}>
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`${q._id}-${key}`}
                      name={q._id}
                      value={key}
                      checked={answers.find(answer => answer._id === q._id)?.rsAns === key}
                      onChange={() => handleOptionChange(q._id, key)}
                    />
                    <label className="form-check-label" htmlFor={`${q._id}-${key}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
      <button
        className="btn btn-primary btn-lg w-100 mt-3"
        onClick={handleSubmit}
      >
        Submit Answers
      </button>
      <ToastContainer />
    </div>
  );
};

export default ExamPortal;
