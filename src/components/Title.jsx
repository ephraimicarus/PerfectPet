import React from "react";
import "../css/Title.css";

function Title(props) {
  return (
    <div className="title-main-wrapper">
      <div className="title-main">{props.content}</div>
    </div>
  );
}

export default Title;
