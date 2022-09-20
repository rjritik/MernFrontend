import { useState, useEffect } from "react";
import "../navbar/adminNavbar.css";
import React from "react";
import _ from "lodash";
import logoUrl from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faCog } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import httpService from "../../services/http.service";

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
import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

let AdminNavbar = (props) => {
  const history = useHistory();

  const [idmodal, settoggleIdModal] = useState(false);
  const [save,setSave]=useState(true);
  const [clientModelId, setclientModelId] = useState('');
  const [onClickData, setOnclickData] = useState({});
  const toggleSetIdModal= () =>
  settoggleIdModal((prevState) => !prevState);

  useEffect(() => {
    loadClientIdData();
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
      toggleSetIdModal();
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
      toggleSetIdModal();
     
      
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
    toggleSetIdModal();
  };

  const setIdfunction = () => {
    
    toggleSetIdModal();
    console.log(onClickData);
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
    <div className="row">
      {/*<div className="">
      <div className="row navbarmain">
        <div className="col-3 navbarlogo">
          <img className="imagelogo" src={logoUrl} alt="Logo"></img>
        </div>
        <div
          className="col-6 navbartextA"
          style={{ borderLeft: "1.5px solid white" }}
        >
          <Dropdown style={{ display: "inline-block" }}>
            <Dropdown.Toggle variant="" id="" className="menuDropdown">
              <FontAwesomeIcon className="iconLayoutBars" icon={faBars} />{" "}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/admindashboard" className="dropdown-item1">
                <Dropdown.Item href="#/action-1"><i className="fa fa-home font-size-16 align-middle mr-1" style={{color:"#006699"}}></i>{"  "} Home</Dropdown.Item>
              </Link>
              <Link to="/admindashboard/users" className="dropdown-item1">
                <Dropdown.Item href="#/action-1"><i className="fa fa-user font-size-16 align-middle mr-1" style={{color:"#006699"}}></i>{"  "} Users</Dropdown.Item>
              </Link>
              <Link to="/admindashboard/configuration" className="dropdown-item1">
              
              <Dropdown.Item href="#/action-1"><i className="fa fa-cog font-size-16 align-middle mr-1" style={{color:"#006699"}}></i>{"  "} Configuration</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ display: "inline-block" }}>Radiant RSD Portal</div>
        </div>
        <div className="col-3 headerLayoutlogout" style={{marginTop:"13px"}}> 
        <Link to="/admindashboard/settings/backup" className="dropdown-item1">
          <div
            style={{ display: "inline-block", paddingTop: "10px", verticalAlign: "middle", paddingBottom:"10px", margin:"0 5px", cursor:"pointer" }}
          >
            <FontAwesomeIcon
              className="iconsetting"
              icon={faCog}
              style={{ color: "whitesmoke" }}
              
            />{" "}
          </div>
          </Link>
          <Dropdown style={{ display: "inline-block" }}>
            <Dropdown.Toggle variant="" id="" className="menuDropdown" style={{ color: "#002c42ea", fontWeight: "bold" }}>
                <FontAwesomeIcon className="iconLayoutUser" icon={faUser}/>{" "}
                <u>{localStorage.getItem("customerId")}</u>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {
                localStorage.setItem("isSession", false);
                localStorage.removeItem("customerId");
                localStorage.removeItem("UserId");
                history.push("/login");
              }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            
        </div>
      </div>
            </div>*/}
      <div className="logo-sidebar col-3 left-sidefixed-outer">
        <img src={logoUrl} />
      </div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="navbar-pos col-9"
      >
        <Nav.Link className="nav-link-left">
          <Dropdown className="btn-icons">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-menu-align-left "
              className="dropdown-menu-left toggle btn-icons"
            >
              <button
                aria-controls="responsive-navbar-nav"
                type="button"
                aria-label=""
                className="navbar-toggler-web collapsed"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/admindashboard" className="dropdown-item1">
                <Dropdown.Item href="#/action-1">
                  <i
                    className="fa fa-home font-size-16 align-middle mr-1"
                    style={{ color: "#006699" }}
                  ></i>
                  {"  "} Home
                </Dropdown.Item>
              </Link>
              <Link to="/admindashboard/users" className="dropdown-item1">
                <Dropdown.Item href="#/action-1">
                  <i
                    className="fa fa-user font-size-16 align-middle mr-1"
                    style={{ color: "#006699" }}
                  ></i>
                  {"  "} Users
                </Dropdown.Item>
              </Link>
              {/*<Link
                to="/admindashboard/configuration"
                className="dropdown-item1"
              >
                <Dropdown.Item href="#/action-1">
                  <i
                    className="fa fa-cog font-size-16 align-middle mr-1"
                    style={{ color: "#006699" }}
                  ></i>
                  {"  "} Configuration
                </Dropdown.Item>
              </Link>*/}
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Link>
        <Nav className="mr-auto">
          <span className="navbar-title">Radiant RSD Portal</span>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="align-items-end align-items-lg-center">
            <div className="nav-seperator">
              <Nav.Link>
                <NavLink to="/admindashboard/settings/backup">
                  <div className="setting-ico"></div>
                </NavLink>
              </Nav.Link>
              {/*<Button className="" color = "link"  hidden = {localStorage.getItem("customerId") != "Admin"}
              onClick={()=>{
                showIdfunction();
              }}>
              <div className="drive-ico"></div>
            </Button>*/}
              <Nav.Link>
                <NavLink to="/admindashboard/settings/version">
                  <div className="quation-mark-ico"></div>
                </NavLink>
              </Nav.Link>
            </div>
            <Nav.Link className="pr-0 pl-3">
              <Dropdown className="btn-icons">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-menu-align-right"
                  className="user-dropdown toggle btn-icons"
                >
                  <div className="user-ico"></div>
                  {localStorage.getItem("customerId")}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-get">
                  <strong className="model-head">
                    {localStorage.getItem("customerId")}
                  </strong>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.setItem("isSession", false);
                      localStorage.removeItem("customerId");
                      localStorage.removeItem("UserId");
                      localStorage.removeItem("userType");
                      localStorage.removeItem("dataFirst");
                      history.push("/adminlogin");
                    }}
                  >
                    <i className="fa fa-power-off font-size-16 align-middle mr-1 text-danger"></i>
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>




      <Modal
        isOpen={idmodal}
        toggle={toggleSetIdModal}
        // size="sm"
        centered={true}
      >
        <ModalHeader  toggle={toggleSetIdModal}>{"Enter Client Id's" }</ModalHeader>
        <ModalBody>

        <div className="ui main">
          <form className="ui form">
            <div className="field">
              
              <div className="field">
              <label>Google Drive Client Id</label>
              <input
                type="text"
                name="GoogleDriveClientId"
                placeholder="Google Drive Client Id"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.GoogleDriveClientId}
              />
              {onClickData.GoogleDriveClientId?"":<span style={{ color: "red" }}>Please Enter the Google Drive Client Id for using Drive selection !</span>}

            </div>
            <div className="field">
              <label>Google Drive Key</label>
              <input
                type="text"
                name="GoogleDriveKey"
                placeholder="Google Drive Key"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.GoogleDriveKey}
              />
              {onClickData.GoogleDriveKey?"":<span style={{ color: "red" }}>Please Enter the Google Drive Key for using Drive selection !</span>}

            </div>
            <div className="field">
              <label>Dropbox Key</label>
              <input
                type="text"
                name="DropboxKey"
                placeholder="Dropbox Key"
                onChange={(e) => onInputChange(e)}
                 value={onClickData.DropboxKey}
              />
              {onClickData.DropboxKey?"":<span style={{ color: "red" }}>Please Enter the Dropbox App Key for using Dropbox selection !</span>}
            </div>
            <div className="field">
              <label>Weather API Key</label>
              <input
                type="text"
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
         <div className="text-end col-12">
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
        
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AdminNavbar;
