/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useState } from "react";
import FormSection from "../../components/FormSection";
import { searchForBusinessScoreSheet } from "../../utils/airtable";
import { QUESTIONS } from "../../utils/scoreQuestions";

const NewScore = () => {
  return (
    <div>
      <h1>New Score</h1>
      <QuestionsDisplay />
    </div>
  );
};

export default NewScore;

const QuestionsDisplay = () => {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [company, setCompany] = useState({ name: "", id: "" });
  const [openStatus, setOpenStatus] = useState(false);

  const resetCompany = () => {
    setCompany({ name: "", id: "" });
  };

  const questionUpdated = (question: any) => {
    // console.log(question);

    // need to search through questions object, find the question that has changed and then updated the value
    const updatedQuestionSet = questions.map((section) => {
      const questionsUpdatedWithNewValues = section.questions.map(
        (oldQuestion) => {
          if (oldQuestion.question === question.question) {
            return {
              question: question.question,
              answer: Number(question.answer),
            };
          } else {
            return oldQuestion;
          }
        }
      );
      return {
        section: section.section,
        questions: questionsUpdatedWithNewValues,
      };
    });

    setQuestions(updatedQuestionSet);
  };

  const handleFullSubmission = async () => {
    if ((reviewer, company)) {
      // console.log(reviewer, company, questions);

      const formattedQuestions = [];
      questions.map((section) => {
        section.questions.map((qu) => {
          formattedQuestions.push({
            question: qu.question,
            answer: String(qu.answer),
          });
        });
        // formattedQuestions.push(...section.questions);
      });
      // questions.map((section) => {
      //   formattedQuestions.push(...section.questions);
      // });
      const newScore = await addToAirtable({
        reviewer,
        company,
        formattedQuestions,
      });
      location.assign(newScore);
    } else {
      alert("Both scorer and company is required.");
    }
  };
  return (
    <main className="h-screen w-full">
      <div
        id="wrapper"
        className=""
      >
        <div id="inner-wrapper" className="">
          {/* select company section */}
          {company.name ? (
            <SelectedCompany company={company} resetCompany={resetCompany} />
          ) : (
            <CompanySearch setCompany={setCompany} />
          )}
          {/* question section */}
          <div className="my-6 rounded-md drop-shadow">
            <div className="mb-2 flex justify-end">
              <button
                className="rounded bg-blue-500 py-2 px-4 text-sm font-bold hover:bg-blue-700"
                onClick={() => {
                  setOpenStatus(!openStatus);
                }}
              >
                {openStatus == true ? "Collapse" : "Expand"}
              </button>
            </div>
            {questions &&
              questions.map((section, i) => (
                <FormSection
                  key={i}
                  title={section.section}
                  questions={section.questions}
                  openStatus={openStatus}
                  questionUpdated={questionUpdated}
                />
              ))}
            <div className="flex w-full items-center justify-center py-4">
              <button
                onClick={handleFullSubmission}
                className="rounded bg-green-600 py-2 px-4 font-bold hover:bg-green-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>

    </main>
  );
};

const CompanySearch = ({ setCompany }) => {
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    // console.log(formData);
    // setCompany(formData.company);
    const results = await searchForBusinessScoreSheet(formData.company);

    if (results != "No businesses found...") {
      setResults(results);
    } else {
      alert("No businesses found with that name. Please try again.");
    }
    console.log(results);

    event.target.reset();
  };

  return (
    <div className="mx-auto flex flex-col pt-4">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Company"
            name="company"
            required
          />
        </div>
        <button
          type="submit"
          className="ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Company</span>
        </button>
      </form>
      {results.length > 0 && (
        <div id="results-container" className="mt-4">
          {results.map((result, i) => (
            <div
              key={i}
              className="cursor-pointer border-b-2 border-gray-200 py-2 hover:opacity-50"
              onClick={() => setCompany({ name: result.name, id: result.id })}
            >
              {result.name}
            </div>
          ))}
          <div className="pt-2 text-sm italic text-gray-500">
            {results.length} {results.length > 1 ? "results" : "result"} found
          </div>
        </div>
      )}
    </div>
  );
};

const SelectedCompany = ({
  company = { name: "Test Company" },
  resetCompany,
}) => {
  return (
    <div className="flex justify-between py-4">
      <div>
        <div className="text-xs uppercase text-gray-500">Company</div>
        <div>{company.name}</div>
      </div>
      <button
        onClick={resetCompany}
        className="flex items-center justify-center rounded-lg bg-red-100 p-3 hover:opacity-70"
      >
        x
      </button>
    </div>
  );
};
