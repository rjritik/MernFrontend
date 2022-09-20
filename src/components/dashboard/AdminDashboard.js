import React, { useState, useEffect } from 'react'
//import { Button } from "reactstrap";
import httpService from "../../services/http.service";

const AdminDashboard = () => {
    const [alldata, setAlldata] = useState([]);


    useEffect(() => {
        loadAlldata();
      }, []);


      const loadAlldata = async () => {        
        let alldataapi = await httpService
          .get("getalluserdataapi")
          .catch((err) => {
            console.log(err);
          });
        setAlldata(alldataapi.data);
      };

  return (
    <div>
    <div className="form-boxtopline5 mb-2 row">
          <div className="col-9">Super-Admin Control Panel</div>
        </div>
        <div className="row dataheading">
             <div className="col-2 channel ">
                <b>Client</b>
              </div>
              <div className="col-2 channel ">
                <b>Property Name</b>
              </div>
              <div className="col-2 channel ">
                <b>Channels</b>{" "}
                {/* <Button color="primary" >
                  <i className="plus square icon"></i>
                </Button>{" "} */}
              </div>
              <div className="col-2 ">
                <b>Channels Rules</b>
              </div>
              <div className="col-2 ">
                <b>Channel Statistics</b>
              </div>
              <div className="col-2 ">
                <b>Webcaster Management</b>
              </div>
              {/* <div className="col-2 ">
                <b>Delete Channel</b>
              </div> */}
         </div>
         {alldata
              .slice(0)
              .reverse()
              .map((e, id) => {
                return (
                  <div className="row datarow">
                    <div className="col-2 " >
                     <span  className="point"> {e.UserId}</span>
                    </div>
                    <div className="col-2 " >
                     <span  className="point"> {e.Name}</span>
                    </div>
                    <div
                      className="col-2 "
                    >
                     <span  className="point" 
                   
                       > {e.channelName}</span>
                    </div>
                    <div
                      className="col-2 ">
                     <span  className="point"> {e.ChannelRulesName}</span> 
                    </div>
                    <div className="col-2 ">
                    <span  className="point"  >channel Statistics</span>
                    </div>
                    <div className="col-2">
                    <span className="point">Webcaster Management</span>
                    </div>
                 
                  </div>
                );
              })}
    </div>
  )
}

export default AdminDashboard;