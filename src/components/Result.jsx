import React from "react";
import { answerLibrary } from "./contentLibraries/answerLibrary";
import "../css/Result.css";

function Result(props) {
  const resultTemplates = [
    "",
    "Your pet is ",
    ", likes to eat ",
    ", and prefers to ",
    " short distances.",
  ];
  //Get original answer
  const answerSentence = resultTemplates
    .map((e, i) => [e, props.content[i]])
    .flat();
  //Toggle component display
  if (props.display === false) {
    return <></>;
  }

  //Random feature
  if (props.random === true) {
    const randomAnswers = [""];

    for (let i = 1; i < answerLibrary.length; i++) {
      let answerLib = answerLibrary
        .filter((x) => x.AnswerIndex === i)
        .map((y) => y.Content);
      let r = Math.floor(Math.random() * answerLib[0].length);
      randomAnswers.push(answerLib[0][r]);
    }
    const randomAnswerSentence = resultTemplates
      .map((e, i) => [e, randomAnswers[i]])
      .flat();
    return <div className="result">{randomAnswerSentence}</div>;
  }

  // TODO: Scramble feature
  if (props.scramble === true) {
    return <div>{}</div>;
  }

  return <div>{answerSentence}</div>;
}

export default Result;
