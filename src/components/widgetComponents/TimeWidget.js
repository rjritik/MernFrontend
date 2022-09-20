import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import "../rightcolumn/test.css";
import useFitText from "use-fit-text";

let TimeWidget = (props) => {
  let interval = setInterval(() => {}, 10);

  const { fontSize, ref } = useFitText({ maxFontSize: 500 });
  const [time, settime] = useState(new Date(
    new Date().getTime() - (3600000 * new Date().getTimezoneOffset()) / 60
  )
    .toUTCString()
    .substring(16, 25))
  const [timeDay, settimeDay] = useState(new Date(
    new Date().getTime() - (3600000 * new Date().getTimezoneOffset()) / 60
  )
    .toUTCString()
    .substring(4, 16))

    const updateClock = ()=>{
      // console.log(this.state.timezone);
      let timeData = new Date(
        parseInt(new Date().getTime()) +
          3600000 * parseInt(props.e.content[1] && props.e.content[1] != "" ? props.e.content[1] : new Date().getTimezoneOffset() / 60)
      )
        .toUTCString()
        .substring(17, 25);
      if(props.e.timeFormat == undefined || props.e.timeFormat == "" || props.e.timeFormat == "12h"){
        let first = timeData.substring(0,2);
        let second = timeData.substring(3,5);
        let firstInt = parseInt(first);
        let firstIntData = (firstInt -12).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
        if(firstInt >= 0 && firstInt < 12){
          settime(
            first + ":" + second + " AM"
          );
        }else{
          settime(
            firstIntData + ":" + second + " PM"
          );
        }
      }else{
        settime(timeData)
      }
        
      settimeDay(new Date(
          new Date().getTime() + 3600000 * parseInt(props.e.content[1] && props.e.content[1] != "" ? props.e.content[1] : new Date().getTimezoneOffset() / 60)
        )
          .toUTCString()
          .substring(4, 16),
      );
    }
    useEffect(() => {
      interval = setInterval(()=>{
          updateClock();
        },1000)
      return () => {
        clearInterval(interval);
      };
    }, []);
  return (
    <span className="row widgettext" style={{ width: "100%", height: "100%", padding:"6px"  }}>
    {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ?
      <div
        className="annContent"
        ref={ref}
        style={{
          fontSize,
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems : "center"
        }}
      >
        <div style={{display:"flex", flexWrap:"wrap",
        justifyContent: "center",
        alignItems : "center"}}>
        <div style= {{whiteSpace:"nowrap", marginRight:"15px"}} hidden={props.e.content[2] != undefined ? !(props.e.content[2]) : false}>{time}</div>
        <div style= {{whiteSpace:"nowrap"}} hidden = {props.e.content[3] != undefined ? !(props.e.content[3]) : false}>{timeDay}</div>
        </div>
      </div>: <div
      className="annContent"
      // ref={ref}
      style={{
        fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems : "center",
        width: "100%", overflow: "hidden"
      }}
    >
      <div style={{display:"flex", flexWrap:"wrap"}}>
        <div style= {{whiteSpace:"nowrap", marginRight:"15px"}} hidden={props.e.content[2] != undefined ? !(props.e.content[2]) : false}>{time}</div>
        <div style= {{whiteSpace:"nowrap"}} hidden = {props.e.content[3] != undefined ? !(props.e.content[3]) : false}>{timeDay}</div>
      </div>
    </div>
    }
    </span>
  );
};

export default TimeWidget;
