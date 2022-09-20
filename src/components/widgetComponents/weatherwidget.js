import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import "../rightcolumn/test.css";
import useFitText from "use-fit-text";
import httpService from "./../../services/http.service";

let WeatherWidget = (props) => {
  const { fontSize, ref } = useFitText({ maxFontSize: 900 });
  const [weatherData, setWeatherData] = useState(props.e.content[0]);

//   const { fontSize, ref } = useFitText({ maxFontSize: 500 });
  useEffect(() => {}, [props.e.fontSizeType]);
  useEffect(() => {
    refreshWeatherData();
  }, [props.e.content[1]]);


  const refreshWeatherData = async () => {
        if (props.e.type == "weather") {
          let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?zip=${props.e.content[1]},us&appid=${props.weatherApiKey}`
          ).then(async (response) => {
            if (response.status == 404) {
              console.log(response);
              return;
            } else {
              console.log(response);
              const dataRec = await response.json();
              let DataDB = props.e.content;
              DataDB[0] = dataRec;
              let data = {
                type: "weather",
                id: props.e._id,
                content: DataDB,
              };
              let widgetdata = await httpService
                .CreateUpdate("updateWidgetApi", data)
                .catch((err) => {
                  console.log(err);
                });
              if (widgetdata.data.ack == "1") {
                setWeatherData(dataRec);
              }
            }
          });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshWeatherData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="row weathermainDiv" style = {{width: "100%", height : "100%"}}>
      {props.e.fontSizeType == undefined || props.e.fontSizeType == "" || props.e.fontSizeType == "auto" ? <span className="row weathermainDiv" style = {{width: "100%", height : "100%"}}>
      <div
        className="col-lg-6 col-sm-6 placeCityWeather SubHeadingWeatherCity"
        ref={ref}
        style={{fontSize : `${parseInt(fontSize.split("%")[0])/2}%`, whiteSpace: "nowrap"}}
      >
        <div style={{ paddingLeft: "3%", paddingRight:"3%"}}>{weatherData.name}</div>
      </div>
      <div
        className="col-lg-3 col-sm-3 align-self-center"
        style={{
          fontSize : `${parseInt(fontSize.split("%")[0])/3}%`, whiteSpace: "nowrap", paddingLeft: "3%", paddingRight:"3%"
          }}
      >
        {props.e.content[3] == undefined || props.e.content[3] == "F" ? (
          <div className="SubHeadingWeather">
            {" "}{parseInt(parseInt(weatherData.main.temp - 273) * 1.8 + 32)}{""}
            F{" "}
          </div>
        ) : (
          <div className="SubHeadingWeather">
            {" "}{parseInt(weatherData.main.temp) - 273}C{" "}
          </div>
        )}
      </div>
      <div
        className="col-lg-3 col-sm-3 placeCityWeather"
        style={{ paddingLeft: "3%", paddingRight:"3%"}}
      >
        <img src ={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
        style={{float:"center"}}
         width="80%" height = "80%"
         alt="wthr img" />
      </div>
    </span> : <span className="row weathermainDiv" style = {{width: "100%", height : "100%"}}>
    <div
      className="col-lg-6 col-sm-6 placeCityWeather SubHeadingWeatherCity"
      ref={ref}
      style={{fontSize : `${props.e.fontsize ? props.e.fontsize : "small"}`, whiteSpace: "nowrap"}}
    >
      <div style={{ paddingLeft: "3%", paddingRight:"3%"}}>{weatherData.name}</div>
    </div>
    <div
      className="col-lg-3 col-sm-3 align-self-center"
      style={{ paddingLeft: "25px" }}
      style={{
        fontSize : `${props.e.fontsize ? props.e.fontsize : "small"}`, whiteSpace: "nowrap", paddingLeft: "3%", paddingRight:"3%"
        }}
    >
      {props.e.content[3] == undefined || props.e.content[3] == "F" ? (
        <div className="SubHeadingWeather">
          {" "}{parseInt(parseInt(weatherData.main.temp - 273) * 1.8 + 32)}{""}
          F{" "}
        </div>
      ) : (
        <div className="SubHeadingWeather">
          {" "}{parseInt(weatherData.main.temp) - 273}C{" "}
        </div>
      )}
    </div>
    <div
      className="col-lg-3 col-sm-3 placeCityWeather"
      style={{ paddingLeft: "10px", paddingRight:"25px"}}
    >
      <img src ={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
      style={{float:"center"}}
       width="80%" height = "80%"
       alt="wthr img" />
    </div>
  </span>
}
      </div>
    
  );
};

export default WeatherWidget;
