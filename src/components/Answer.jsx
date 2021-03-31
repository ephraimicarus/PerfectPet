import { answerLibrary } from "./contentLibraries/answerLibrary";
function Answer(props) {
  //Toggle component display
  if (props.display === false) {
    return <></>;
  }
  //Get answers from answerLibrary.jsx
  const a = answerLibrary
    .filter((x) => x.AnswerIndex === props.questionIndex)
    .map((y) => y.Content);
  const answerList = a[0].map((x, i) => (
    <div key={i} className="answer">
      <button key={i} onClick={props.handleClick}>
        {x}
      </button>
    </div>
  ));

  return answerList;
}

export default Answer;
