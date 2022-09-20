import { useState, useEffect } from "react";
import "./rightcolumn.css";
import Layout from "./layout/layout";
import httpService from "../../services/http.service";
import Preview from "./preview/preview";

// import Settings from "./settings/settings";

let RightColumn = (props) => {

  
  console.log(props.selectedLayoutID);
  return (
    <div>
    {/*{props.layoutType =="3"?*/}
    <div>
      {props.rightContentType == "layout" ? (
        <div className="mainright">
          {props.rightContent == "layout" ? 
          <Layout
          rightContentType = {props.rightContentType}
          setrightContentType = {props.setrightContentType}
          selectedLayoutID = {props.selectedLayoutID}
          setselectedLayoutID = {props.setselectedLayoutID}
          preview = {false}
          view = {false}
          ></Layout> : ""}
        </div>
      ) : (
        <div>
          {props.rightContentType == "preview" ? (
            <div>
            <div className="previewLayoutMain">
            <Preview
            showProperty = {false}
            />
            </div>
            </div>
          ) : <div>
          {
          //   props.rightContentType == "slideshow" ? (
          //   <div>
          //     <Slideshow/>
          //   </div>
          // ) : ""
        }
            
          
          </div>}
        </div>
      )}
    </div> 
    {/*: 
    <div>
      {props.rightContentType == "layout" ? (
        <div className="mainright">
          {props.rightContent == "layout" ? <LayoutRec
          rightContentType = {props.rightContentType}
          setrightContentType = {props.setrightContentType}
          selectedLayoutID = {props.selectedLayoutID}
          setselectedLayoutID = {props.setselectedLayoutID}
          preview = {false}
          ></LayoutRec> : ""}
        </div>
      ) : (
        <div>
          {props.rightContentType == "preview" ? (
            <div>
            <Layout
              rightContentType = {props.rightContentType}
              setrightContentType = {props.setrightContentType}
              selectedLayoutID = {props.selectedLayoutID}
          setselectedLayoutID = {props.setselectedLayoutID}
              preview = {true}
              ></Layout>
            </div>
          ) : <div>
          </div>}
        </div>
      )}
    </div>
  }*/}
    </div>
  );
};

export default RightColumn;
