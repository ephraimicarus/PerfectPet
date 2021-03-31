import React from "react";
import "../css/MyActionButton.css";

function MyActionButton(props) {
  //Toggle component display
  if (props.display === false) {
    return <></>;
  }
  return (
    <button className="action-button" onClick={props.handleClick}>
      {props.content}
    </button>
  );
}

export default MyActionButton;
