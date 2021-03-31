import { questionLibrary } from "./contentLibraries/questionLibrary";
import "../css/Question.css";
function Question(props) {
  //Toggle component display
  if (props.display === false) {
    return <></>;
  }
  //Get questions from questionLibrary.jsx
  const q = questionLibrary
    .filter((x) => x.QuestionIndex === props.questionIndex)
    .map((y) => y.Content);

  return <div className="question">{q}</div>;
}

export default Question;
