import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import "../rightcolumn/test.css";
import useFitText from "use-fit-text";

let AnnouncementWidget = (props) => {
  const { fontSize, ref } = useFitText({ minFontSize: 0, maxFontSize: 500 });
  useEffect(()=>{
  },[props.e.fontSizeType])

  return (
    <span className="row annHead"  style={{fontSize,  width: "100%", height: "100%", padding:"10px" }} ref = {ref}>
      {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ? <div
        className="annContent"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems : "center",
          whiteSpace: "pre-wrap"
        }}
      >
        <p>{props.e.content[0]}</p>
      </div>: <div
      className="annContent"
      style={{
        fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems : "center", width: "100%", overflow: "hidden"
      }}
    >
      <p>{props.e.content[0]}</p>
    </div>}
    </span>
  );
};

export default AnnouncementWidget;
