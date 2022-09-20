import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import "../rightcolumn/test.css";
import useFitText from "use-fit-text";

let CongratWidget = (props) => {
  const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 0 });
  return (
    <span className="congratwidgetsmain" style={{ height: "100%", width:"100%"}}>
      {props.e.content[1] == "1" ? (
        <div style={{ height: "100%", width:"100%" }}>
          <div className="gif1 gifcongrats">
            <img className="imagecongrats" src={props.gif1} alt="gifs"></img>
          </div>
          {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ?
          <div
            className="congratwidgets"
            ref={ref}
            style={{ fontSize, height: "100%", width: "100%", padding:"10px", display: "flex",
            justifyContent: "center",
            alignItems : "center" }}
          >
          <div>
            <div className="congratsdiv" style = {{display: "flex",
            justifyContent: "center",
            alignItems : "center"}}>CONGRATULATIONS</div>
            <div style = {{display: "flex",
            justifyContent: "center",
            alignItems : "center"}}>{props.e.content[0]}</div>
            </div>
          </div>: <div
          className="congratwidgets"
          // ref={ref}
          style={{ fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`, 
             height: "100%", width: "100%", padding:"10px", display: "flex",
             justifyContent: "center",
             alignItems : "center" }}
        >
        <div style = {{width: "100%", overflow: "hidden"}}>
          <div className="congratsdiv" style = {{display: "flex",
          justifyContent: "center",
          alignItems : "center"}}>CONGRATULATIONS</div>
          <div style = {{display: "flex",
          justifyContent: "center",
          alignItems : "center"}}>{props.e.content[0]}</div>
        </div>
        </div>
      }
        </div>
      ) : props.e.content[1] == "2" ? (
        <div style={{ height: "100%" }}>
          <div className="gif2 gifcongrats">
            <img className="imagecongrats" src={props.gif2} alt="gifs"></img>
          </div>
          {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ?
          <div
            className="congratwidgets"
            ref={ref}
            style={{ fontSize, height: "100%", width: "100%", padding:"10px", display: "flex",
            justifyContent: "center",
            alignItems : "center" }}
          >
          <div>
            <div className="congratsdiv" style = {{display: "flex",
            justifyContent: "center",
            alignItems : "center"}}>CONGRATULATIONS</div>
            <div style = {{display: "flex",
            justifyContent: "center",
            alignItems : "center"}}>{props.e.content[0]}</div>
            </div>
          </div>: <div
          className="congratwidgets"
          // ref={ref}
          style={{ fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`, 
             height: "100%", width: "100%", padding:"10px", display: "flex",
             justifyContent: "center",
             alignItems : "center" }}
        >
        <div style = {{width: "100%", overflow: "hidden"}}>
          <div className="congratsdiv" style = {{display: "flex",
          justifyContent: "center",
          alignItems : "center"}}>CONGRATULATIONS</div>
          <div style = {{display: "flex",
          justifyContent: "center",
          alignItems : "center"}}>{props.e.content[0]}</div>
        </div>
        </div>
      }
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          <div className="gif3 gifcongrats">
            <img className="imagecongrats" src={props.gif3} alt="gifs"></img>
          </div>
          {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ?
          <div
            className="congratwidgets"
            style={{ height: "100%" }}
            ref={ref}
            style={{ fontSize, height: "100%", width: "100%", padding:"10px", display: "flex",
            justifyContent: "center",
            alignItems : "center"}}
          >
          <div>
            <div className="congratsdiv" style = {{display: "flex",
            justifyContent: "center",
            alignItems : "center"}}>CONGRATULATIONS</div>
            <div style = {{display: "flex",
            justifyContent: "center",
            alignItems : "center"}}>{props.e.content[0]}</div>
            </div>
          </div>: <div
          className="congratwidgets"
          style={{ height: "100%" }}
          ref={ref}
          style={{ fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`, 
              width: "100%", padding:"10px", display: "flex",
             justifyContent: "center",
             alignItems : "center"}}
        >
        <div style = {{width: "100%", overflow: "hidden"}}>
          <div className="congratsdiv" style = {{display: "flex",
          justifyContent: "center",
          alignItems : "center"}}>CONGRATULATIONS</div>
          <p style = {{display: "flex",
          justifyContent: "center",
          alignItems : "center"}}>{props.e.content[0]}</p>
        </div>
        </div>
      }
        </div>
      )}
    </span>
  );
};

export default CongratWidget;
