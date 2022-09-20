import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import "../rightcolumn/test.css";
import useFitText from "use-fit-text";
// import { useSpring, animated } from "react-spring";

let ListTest = (props) => {
  const { fontSize, ref } = useFitText({ maxFontSize: 500 });
  const [key, setKey] = useState(1);
  const [dataArray, setDataArray] = useState([]);
  
  // useEffect(()=>{
  //   let data = [...props.e.content];
  //   var sortedArray = data.sort(function(a, b) {
  //     return b[5] - a[5];
  //   });
  //   setDataArray(sortedArray);
  // },[props.e])
  const compare = (b,c)=>{
    let datenew = new Date().getTime();
    if(datenew > b && datenew < c){
      return "active";
    }else{
      return "";
    }
  }
  const getiteminformat = (timeData)=>{
    let returnData = "";
    let first = timeData.substring(0,2);
        let second = timeData.substring(3,5);
        let firstInt = parseInt(first);
        let firstIntData = (firstInt -12).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
        if(firstInt >= 0 && firstInt < 12){
          returnData = first + ":" + second + " AM"
        }else{
          returnData = firstIntData + ":" + second + " PM"
        }
        return returnData;
  }
  return (
    <div className="row annHead" style={{ width: "100%", height: "100%", overflow:"auto" }}>

    {props.e.content.map((item, i) => {
        return (
          <div>
          {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ?
          <div>
          {compare(item[5], item[6]) == "active" ? 
          <div className={"listcontent activeDIv"} style={{background: `linear-gradient(to bottom left,${props.e.bcolor ? props.e.bcolor + "aa" : "#def"} 0%, ${props.e.bcolor ? props.e.bcolor + "ff" : "#def"} 100%)`}}>
            {
              <div className="row">
              {/*<div className="col-6">{item[0]} </div>*/}
              <div className = "col-12" width="100%" height="100%">
                <div>{item[0]}</div>
              </div>
              <div className="col-6" hidden = {!props.e.listshow}>
                <span>{item[1]}</span>{" "}
                <span>{"("}{item[3]}{")"}</span>
               
              </div>
              <div className="col-6" hidden ={!props.e.listshow}>
              <span>{item[2]}</span>{" "}
                <span>{"("}{item[4]}{")"}</span>
              </div>
              {
                // (item[1] < item[2] && new Date().toUTCString().substring(16, 25) > item[1] && new Date().toUTCString().substring(16, 25) < item[2]) || (item[1] > item[2] && new Date().toUTCString().substring(16, 25) < item[1] && new Date().toUTCString().substring(16, 25) > item[2]) ? <div className="col-6">{item[1]} - {item[2]} </div> : <div className="col-6">{item[1]} - {item[2]} </div>
              }
            
            </div>
          }
          </div> : <div className={"listcontent"} style={{background: `linear-gradient(to bottom left,${props.e.bcolor ? props.e.bcolor + "aa" : "#def"} 0%, ${props.e.bcolor ? props.e.bcolor + "ff" : "#def"} 100%)`}}>
          {
            <div className="row">
            {/*<div className="col-6">{item[0]} </div>*/}
            <div className = "col-12" width="100%" height="100%">
            
              <div>{item[0]}</div>
            
            </div>
            <div className="col-6" hidden ={!props.e.listshow}>
              <span>{props.e.timeFormat == undefined && props.e.timeFormat == "" || props.e.timeFormat == "24h" ? item[1] : getiteminformat(item[1])}</span>{" "}
              <span>{"("}{item[3]}{")"}</span>
             
            </div>
            <div className="col-6" hidden ={!props.e.listshow}>
            <span>{props.e.timeFormat == undefined && props.e.timeFormat == "" || props.e.timeFormat == "24h" ? item[2] : getiteminformat(item[2])}</span>{" "}
              <span>{"("}{item[4]}{")"}</span>
            </div>
            {
              // (item[1] < item[2] && new Date().toUTCString().substring(16, 25) > item[1] && new Date().toUTCString().substring(16, 25) < item[2]) || (item[1] > item[2] && new Date().toUTCString().substring(16, 25) < item[1] && new Date().toUTCString().substring(16, 25) > item[2]) ? <div className="col-6">{item[1]} - {item[2]} </div> : <div className="col-6">{item[1]} - {item[2]} </div>
            }
          
          </div>
        }
        </div>
    }
          </div> : <div>
          {compare(item[5], item[6]) == "active" ? 
          <div className={"listcontent activeDIv"} style={{fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`,background: `linear-gradient(to bottom left,${props.e.bcolor ? props.e.bcolor + "aa" : "#def"} 0%, ${props.e.bcolor ? props.e.bcolor + "ff" : "#def"} 100%)`}}>
            {
              <div className="row">
              {/*<div className="col-6">{item[0]} </div>*/}
              <div className = "col-12" width="100%" height="100%">
              
                <div>{item[0]}</div>
              
              </div>
              <div className="col-6" hidden ={!props.e.listshow}>
                <span>{item[1]}</span>{" "}
                <span>{"("}{item[3]}{")"}</span>
               
              </div>
              <div className="col-6" hidden ={!props.e.listshow}>
              <span>{item[2]}</span>{" "}
                <span>{"("}{item[4]}{")"}</span>
              </div>
              {
                // (item[1] < item[2] && new Date().toUTCString().substring(16, 25) > item[1] && new Date().toUTCString().substring(16, 25) < item[2]) || (item[1] > item[2] && new Date().toUTCString().substring(16, 25) < item[1] && new Date().toUTCString().substring(16, 25) > item[2]) ? <div className="col-6">{item[1]} - {item[2]} </div> : <div className="col-6">{item[1]} - {item[2]} </div>
              }
            
            </div>
          }
          </div> : <div className={"listcontent"} style={{fontSize: `${props.e.fontsize ? props.e.fontsize : "small"}`,background: `linear-gradient(to bottom left,${props.e.bcolor ? props.e.bcolor + "aa" : "#def"} 0%, ${props.e.bcolor ? props.e.bcolor + "ff" : "#def"} 100%)`}}>
          {
            <div className="row">
            {/*<div className="col-6">{item[0]} </div>*/}
            <div className = "col-12" width="100%" height="100%">
            
              <div>{item[0]}</div>
            
            </div>
            <div className="col-6" hidden ={!props.e.listshow}>
              <span>{props.e.timeFormat == undefined && props.e.timeFormat == "" || props.e.timeFormat == "24h" ? item[1] : getiteminformat(item[1])}</span>{" "}
              <span>{"("}{item[3]}{")"}</span>
             
            </div>
            <div className="col-6" hidden ={!props.e.listshow}>
            <span>{props.e.timeFormat == undefined && props.e.timeFormat == "" || props.e.timeFormat == "24h" ? item[2] : getiteminformat(item[2])}</span>{" "}
              <span>{"("}{item[4]}{")"}</span>
            </div>
            {
              // (item[1] < item[2] && new Date().toUTCString().substring(16, 25) > item[1] && new Date().toUTCString().substring(16, 25) < item[2]) || (item[1] > item[2] && new Date().toUTCString().substring(16, 25) < item[1] && new Date().toUTCString().substring(16, 25) > item[2]) ? <div className="col-6">{item[1]} - {item[2]} </div> : <div className="col-6">{item[1]} - {item[2]} </div>
            }
          
          </div>
        }
        </div>
    }
          </div>
  }
          </div>
        );
      })}
    </div>
  );
};

export default ListTest;
