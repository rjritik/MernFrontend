import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import useFitText from "use-fit-text";
import Chart from "react-apexcharts";
import httpService from "../../services/http.service";

let ChannelStats = (props) => {
    const [optionsstate, setoptionsstate] = useState([]);
    const [seriesState, setseriesState] = useState([]);
    // const [options, setOptions] = useState({
    //   chart: {
    //     id: "apexchart-example",
    //   },
    //   xaxis: {
    //     categories: [
    //     ],
    //   },
    // });


    // const [series, setSeries] = useState([
    //   {
    //     name: "Redirects",
    //     data: [],
    //     color: "rgba(18,20,50,0.6)",
    //     backgroundColor: "rgba(18,20,50,0.2)",
    //   }
    // ]);
    const configureData = (dataf)=>{
      let dataGot = dataf.data.data;
      let categories  = [];
      let seriesData = [];
      for(let i=0; i<dataGot.length; i++){
        let minutes = new Date(dataGot[i].createdAt).getMinutes().toString().padStart(2,0);
        let hours = new Date(dataGot[i].createdAt).getHours().toString().padStart(2,0);
        let datacat = [...categories];
        datacat.push(hours + ":" + minutes);
        categories = [...datacat];
        // setcotegories(categories => [...categories, hours + ":" + minutes])
        // setseriesData(seriesData => [...seriesData, e.viewCountArray[0]])

        let seriesda = [...seriesData];
        seriesda.push(dataGot[i].viewCountArray[0]);
        seriesData = [...seriesda];
      }
      setseriesState(seriesData);
      setoptionsstate(categories);
        console.log(categories, seriesData)
    }
    useEffect(async ()=>{
        let data = await httpService
      .CreateUpdate("getviewData", {
          id: props.e._id
      })
      .catch((err) => {
        console.log(err);
      });
      await configureData(data)
    },[])

    // useEffect(()=>{
    //   setOptions({
    //     chart: {
    //         id: "apexchart-example",
    //       },
    //       xaxis: {
    //         categories: categories
    //       },
    // })
    // setSeries([
    //     {
    //       name: "Redirects",
    //       data: seriesData,
    //       color: "rgba(18,20,50,0.6)",
    //       backgroundColor: "rgba(18,20,50,0.2)",
    //     }
    //   ])
    // }, [categories, seriesData])
    
    
  return (
    <div className="ui main">
          <form className="ui form">
            <div className="field">
              <label>Current </label>
              <input type="text" name="current" value={props.e.channelName} disabled/>
            </div>
            <div className="field">
              <label>Utilization Graph</label>
              <Chart
              style={{width:"100%"}}
                options={{
                  chart: {
                      id: "apexchart-example",
                    },
                    xaxis: {
                      categories: optionsstate
                    },
              }}
                series={[
                  {
                    name: "Redirects",
                    data: seriesState,
                    color: "rgba(18,20,50,0.6)",
                    backgroundColor: "rgba(18,20,50,0.2)",
                  }
                ]}
                type="area"
                width={"100%"}
                // height={}
              />
            </div>
          </form>
        </div>
  );
};

export default ChannelStats;
