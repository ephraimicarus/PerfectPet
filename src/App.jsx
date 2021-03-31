import React, { useEffect, useState } from "react";
import Question from "./components/Question";
import Answer from "./components/Answer";
import Result from "./components/Result";
import Title from "./components/Title";
import MyActionButton from "./components/MyActionButton";
import "./css/App.css";
import { questionLibrary } from "./components/contentLibraries/questionLibrary";

function App() {
  //Local storage state variables
  const localStorageQuestionIndex = localStorage.getItem("questionIndex");
  const localStorageResultState = localStorage.getItem("resultState");
  const localStorageFirstStage = localStorage.getItem("displayFirst");
  const localStorageSecondStage = localStorage.getItem("displaySecond");
  const localStorageThirdStage = localStorage.getItem("displayThird");
  const localStorageQuizRandomState = localStorage.getItem("quizRandom");

  //Application is divided into three stages: first stage(start/home view), second stage(question and answer view), third stage(result view)
  //Hooks for stage toggle
  const [displayFirstStage, setDisplayFirstStage] = useState(
    localStorageFirstStage ? JSON.parse(localStorageFirstStage) : true
  );
  const [displaySecondStage, setDisplaySecondStage] = useState(
    localStorageSecondStage ? JSON.parse(localStorageSecondStage) : false
  );
  const [displayThirdStage, setDisplayThirdStage] = useState(
    localStorageThirdStage ? JSON.parse(localStorageThirdStage) : false
  );

  const [quizRandom, setQuizRandom] = useState(
    localStorageQuizRandomState
      ? JSON.parse(localStorageQuizRandomState)
      : false
  );

  //Scramble feature hook- incomplete
  const [scrambleResult, setScrambleResult] = useState(false);

  //Questions are fetched by index from questionLibrary.jsx
  //Question index management
  const [questionIndex, setQuestionIndex] = useState(
    localStorageQuestionIndex ? JSON.parse(localStorageQuestionIndex) : 1
  );

  //Hook that creates quiz result text array for Result component
  const [result, setResult] = useState(
    localStorageResultState ? localStorageResultState.split(",") : [""]
  );
  //Local storage variable gets updated on display stage and question index changes
  const localStorageState = {
    questionIndexState: questionIndex,
    resultState: result,
    displayFirstState: displayFirstStage,
    displaySecondState: displaySecondStage,
    displayThirdState: displayThirdStage,
    quizRandomState: quizRandom,
  };
  useEffect(() => {
    setLocalStorageState(localStorageState);
  }, [localStorageState]);

  return (
    <div>
      <Title content="My Perfect Pet" />
      <div className="action-button-main-wrapper">
        <div className="action-button-main">
          <MyActionButton
            display={displayFirstStage}
            handleClick={() => {
              setDisplayFirstStage(false);
              setDisplaySecondStage(true);
            }}
            content="Start Quiz"
          />
        </div>
        <div className="action-button-main">
          <MyActionButton
            display={displayFirstStage}
            handleClick={() => {
              setDisplayFirstStage(false);
              setQuizRandom(true);
              setDisplayThirdStage(true);
            }}
            content="Randomize"
          />
        </div>
      </div>
      <div>
        <div className="question-wrapper">
          <div className="question">
            <Question
              display={displaySecondStage}
              questionIndex={questionIndex}
            />
          </div>
        </div>
        <div className="answer-wrapper">
          <div className="answer">
            <Answer
              display={displaySecondStage}
              questionIndex={questionIndex}
              handleClick={(e) => {
                setResult((x) => [...x, e.target.textContent]);
                setQuestionIndex((x) => x + 1);
                if (questionIndex >= questionLibrary.length) {
                  setDisplaySecondStage(false);
                  setDisplayThirdStage(true);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="result-wrapper">
          <div className="result">
            <Result
              random={quizRandom}
              scramble={scrambleResult}
              display={displayThirdStage}
              content={result}
            />
          </div>

          <div className="action-button-main-wrapper">
            <div className="action-button-main">
              <MyActionButton
                display={displayThirdStage}
                handleClick={() => {
                  setQuestionIndex(1);
                  setResult([""]);
                  setQuizRandom(false);
                  setDisplayFirstStage(true);
                  setDisplayThirdStage(false);
                }}
                content="Restart"
              />
            </div>
          </div>

          {/* Scramble function incomplete */}

          {/* <MyActionButton
            display={displayThirdStage}
            handleClick={() => {
              setQuizRandom(false);
              setScrambleResult(true);
            }}
            content="Scramble"
          /> */}
        </div>
      </div>
    </div>
  );
}
function setLocalStorageState(values) {
  localStorage.setItem("questionIndex", values.questionIndexState);
  localStorage.setItem("resultState", values.resultState);
  localStorage.setItem("displayFirst", values.displayFirstState);
  localStorage.setItem("displaySecond", values.displaySecondState);
  localStorage.setItem("displayThird", values.displayThirdState);
  localStorage.setItem("quizRandom", values.quizRandomState);
}
export default App;
