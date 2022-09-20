import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import httpService from "../../../services/http.service";
import { toast } from "react-toastify";
import Loader from "../../common/loader";
import "./settings.css";
import "../../navbar/adminNavbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const CloudCredentials = (props) => {
  const [activeTab, setActiveTab] = useState("cloudcredentials");

  const [save,setSave]=useState(true);
  const [clientModelId, setclientModelId] = useState('');
  const [onClickData, setOnclickData] = useState({});

  useEffect(() => {
    loadClientIdData();
    showIdfunction();
  }, []);
  const onInputChange = (e) => {
    setOnclickData({ ...onClickData, [e.target.name]: e.target.value });
  };


  
  const setClientIdForClient = async ()=>{
    let data = {
      data: onClickData, 
    };
    const res = await httpService
      .CreateUpdate("setClientIdApi", data)
      .catch((err) => {
        console.log(err);
      });
      setSave(false)
      loadClientIdData();
      
      if(res.data.message == "Successful"){
        toast.success("Client Id's has been Saved ", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       
      }

  }

  const updateClientIdForClient = async ()=>{
    let data = {
      id: clientModelId._id, 
      data:onClickData,
    };
    const res = await httpService
      .CreateUpdate("updateClientIdForClient", data)
      .catch((err) => {
        console.log(err);
      });
     
      
      if(res.data.message == "Successful"){
        toast.success("Client Id's has been Updated ", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       
      }

  }
  
  const showIdfunction = () => {
    if(clientModelId.GoogleDriveClientId || clientModelId.GoogleDriveKey|| clientModelId.DropboxKey || clientModelId.weatherApiKey){
      setSave(false);
    }
  };

  const setIdfunction = () => {
    
  };

  const  loadClientIdData = async () => {
    const res = await httpService
    .CreateUpdate("getClientIdData")
    .catch((err) => {
      console.log(err);
    });
    if(res.data[0])
   { setclientModelId(res.data[0])
    setOnclickData(res.data[0])}
  };

  return (
    <div style={{ margin: "15px" }}>
      <form>
        <nav className="navbar navbar-expand-lg navbar-light p-0 my-3">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav custom-tabs dashboard-navbar">
              <li className="nav-item">
                <Link
                  to="/admindashboard/settings/backup"
                  className={
                    "nav-link " + (activeTab === "backup" ? "active" : "")
                  }
                  aria-current="page"
                  href="#"
                >
                  <i className="fa fa-database"></i> BACKUPS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admindashboard/settings/backuplocation"
                  className={
                    "nav-link " +
                    (activeTab === "backupLocation" ? "active" : "")
                  }
                  aria-current="page"
                  href="#"
                >
                  <i className="fa fa-database"></i> REMOTE BACKUP LOC.
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admindashboard/settings/cloudcredentials"
                  className={
                    "nav-link " +
                    (activeTab === "cloudcredentials" ? "active" : "")
                  }
                  aria-current="page"
                  href="#"
                >
                  <i className="fa fa-dropbox"></i> Cloud Credentials
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </form>
      
        <div className="ui main">
          <form className="ui form ">
            <div className="field row">
              
              <div className="field  col-6">
              <label>Google Drive Client Id</label>
              <input
                type="text"
                className="form-control"
                name="GoogleDriveClientId"
                placeholder="Google Drive Client Id"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.GoogleDriveClientId}
              />
              {onClickData.GoogleDriveClientId?"":<span style={{ color: "red" }}>Please Enter the Google Drive Client Id for using Drive selection !</span>}

            </div>
            <div className="col-6"></div>

            <div className="field col-6">
              <label>Google Drive Key</label>
              <input
                type="text"
                className="form-control"
                name="GoogleDriveKey"
                placeholder="Google Drive Key"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.GoogleDriveKey}
              />
              {onClickData.GoogleDriveKey?"":<span style={{ color: "red" }}>Please Enter the Google Drive Key for using Drive selection !</span>}

            </div>
            <div className="col-6"></div>

            <div className="field col-6">
              <label>Dropbox Key</label>
              <input
                type="text"
                name="DropboxKey"
                className="form-control"
                placeholder="Dropbox Key"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.DropboxKey}
              />
              {onClickData.DropboxKey?"":<span style={{ color: "red" }}>Please Enter the Dropbox App Key for using Dropbox selection !</span>}
            </div>
            <div className="col-6"></div>

            <div className="field col-6">
              <label>Weather API Key</label>
              <input
                type="text"
                className="form-control"
                name="weatherApiKey"
                placeholder="Weather API Key"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.weatherApiKey}
              />
              {onClickData.weatherApiKey?"":<span style={{ color: "red" }}>Please Enter the weather Api Key for using weather widget !</span>}
            </div>
            </div>
            
          </form>
        </div>
         <div className="col-6"></div>
         <div className="text-end col-6" style = {{marginTop:"15px"}}>
            <Button
            color="success"
            style={{ marginRight: "5px"}}
           
            onClick={()=>{

              if(save){ setClientIdForClient();}
              else {
                updateClientIdForClient();
              }
             
             
            }}
          >
          {save? "save" : "update"}
          </Button>
          <Button
            color="danger"
            onClick={() => {

              setIdfunction();

              
            }}
          >
            Cancel
          </Button>
          </div>
    </div>
  );
};

export default CloudCredentials;
