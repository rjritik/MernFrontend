import React from "react";
import { useState, useEffect } from "react";
import vcdms from "../../../assets/rcc-version-logo.png";
import { useHistory } from "react-router-dom";
import "../versions/version.css";
import packageVersion from "../../../../package.json";
import httpService from "../../../services/http.service";
import {bitStreamtoNumber} from "../../../config"

const Version = (props) => {
  const [backendVersion, setbackendVersion] = useState("");
  const [users,setusers] = useState("")
  const [rules,setRules] = useState("")
  const [boardStatus,setboardStatus] = useState("")
  // let [loading, setState] = useState(false);
  useEffect( async () => {
    let returndata = await httpService.get("getbackendversion").then(
      (res) => res.data
    );
    let license =  await httpService.get('getlicenses').then(res => res.data)
    let u = bitStreamtoNumber(license,'user')
    setusers(u)
    let r = bitStreamtoNumber(license, 'rule')
    setRules(r)
    setboardStatus(license.output[15])
    setbackendVersion(returndata);
  }, []);

  return (
    <div>
      <div className="pad-15"  style={{margin:"20px"}}>
        <div className="form-boxdiv">
          <div className="form-boxtopline5">About</div>
          <div className="form-boxtopcont">
            <div className="form-boxdiv-gray">
              <div className="form-boxtopcont user-form">
                <div className=" panel-default">
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-sm-2">
                        <figure className="rcc-version-logo">
                          <img src={vcdms} />
                        </figure>                          
                       <div className="text-center rcc-version">

                          <h5 style={{fontSize:"15px"}}>Radiant RSD Portal </h5>
                          <h5 style={{fontSize:"15px"}}>UI/UX Version <span>{packageVersion.version}</span></h5>
                          <h5 style={{fontSize:"15px"}}>Backend Version <span>{backendVersion}</span></h5>
                          <h5 style={{fontSize:"14px"}}>No. of Licensed Users <span>{users}</span></h5>
                          <h5 style={{fontSize:"14px"}}>No. of rules per user <span>{rules}</span></h5>
                          <h5 style={{fontSize:"14px"}}>Bulletin Board: <span>{boardStatus == 1 ? "Enabled":"Disabled"}</span></h5>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Version;
