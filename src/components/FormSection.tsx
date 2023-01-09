import React, { useState } from "react";


const FormSection = ({
  title = "Section Name",
  questions = ["How is the team?", "How is the route to market?"],
  openStatus = false,
  questionUpdated,
}) => {
  return (
    <details
      className="bg-gray-300 duration-300 open:bg-blue-200 hover:bg-gray-100"
      open={openStatus}
    >
      <summary className="cursor-pointer text-gray-900 select-none bg-inherit px-5 py-3 text-lg">
        {title}
      </summary>
      <div className="border border-gray-300 bg-white px-5 py-3 text-sm font-light">
        {questions &&
          questions.map((question, i) => {
            return (
              <div key={i}>
                <Question
                  QUESTION={question}
                  questionUpdated={questionUpdated}
                />
              </div>
            );
          })}
      </div>
    </details>
  );
};

const Question = ({ QUESTION, questionUpdated }) => {
  const [question, setQuestion] = useState(QUESTION);

  const handleQuestionChange = (e) => {
    questionUpdated({ question: question.question, answer: e.target.value });
    setQuestion({
      question: question.question,
      answer: e.target.value,
    });
  };

  return (
    <form className="py-4 text-gray-900">
      <div className="flex justify-between">
        <label
          htmlFor="steps-range"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {question.question}
        </label>
        <div
          className={`px-4 font-bold ${
            question.answer == 3 && "text-amber-500"
          } ${question.answer > 3 && "text-green-500"} ${
            question.answer < 3 && "text-red-500"
          }`}
        >
          {question.answer}
        </div>
      </div>
      <input
        id="steps-range"
        type="range"
        min="1"
        max="5"
        value={question.answer}
        onChange={handleQuestionChange}
        step="1"
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      ></input>
    </form>
  );
};

export default FormSection;
