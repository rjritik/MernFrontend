import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import httpService from "../../../services/http.service";
import { toast } from "react-toastify";
import Loader from "../../common/loader";
import "./settings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const BackupLocation = (props) => {
  const [activeTab, setActiveTab] = useState("backupLocation");
  const [username, setusername] = useState("");
  const [pass, setPass] = useState("");
  const [location, setlocation] = useState("");
  const [port, setPort] = useState("");
  const [host, setHost] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

  const toggleUploadModal = () => {
    setUploadModal(!uploadModal);
  };

  const saveBackupLocation = async () => {
    let data = {
      host: host,
      username: username,
      user: localStorage.getItem("Username"),
      password: pass,
      location: location,
      port: port,
    };
    let res = await httpService
      .delete("savebackuplocation", data)
      .then((res) => res.data)
      .catch((err) => {
        toast.error("Could not update backup location", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    if (res) {
      toast.success(res.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.setSaved(!saved);
      props.setBackupLocation(res);
    }
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
      <div>
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Remote Backup Location</div>
            {Object.keys(props.backupLocation).length ? (
              <div>
                <div className="font-size-16 p-3">
                  <h5>Current Remote databse Backup Location:</h5>
                  <div className="font-size-16">
                    <ul>
                      <li style={{ color: "black" }}>
                        IP: {props.backupLocation.IP}
                      </li>
                      <li style={{ color: "black" }}>
                        Location on remote: {props.backupLocation.location}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" d-flex m-4 justify-content-center">
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#formModal"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="font-size-16 p-3">
                  You have not added any remote database backup location click
                  on the below button to add it now.
                </div>
                <div className="d-flex m-4 justify-content-center">
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#formModal"
                    onClick={toggleUploadModal}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <Modal isOpen={uploadModal} toggle={toggleUploadModal}>
              <ModalHeader toggle={toggleUploadModal}>
                Save database backup location
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveBackupLocation();
                  }}
                >
                  <div className="form-boxtopcont">
                    <div className="row">
                      <div className="col-sm-6" style={{ padding: "0 5px" }}>
                        <div className="form-group">
                          <label className="form-check-label">
                            IP : <i style={{ color: "red" }}>*</i>
                          </label>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="server_ip"
                            placeholder="IP"
                            value={host}
                            onChange={(e) => {
                              let string = e.target.value.split(":")[0];
                              if (string.match(/[^0-9.]/)) {
                                return;
                              }
                              let count = 0;
                              for (let i = 0; i < string.length; i++) {
                                if (string.charAt(i) === ".") {
                                  count++;
                                }
                              }
                              if (count > 3) {
                                return;
                              }
                              let x = string.split(".");
                              for (let i = 0; i < x.length; i++) {
                                if (x[i].length > 3) {
                                  return;
                                }
                                if (Number.parseInt(x[i]) > 255) {
                                  return;
                                }
                              }
                              setHost(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6" style={{ padding: "0 5px" }}>
                        <div className="form-group">
                          <label className="form-check-label">
                            Backup Location :<i style={{ color: "red" }}>*</i>
                          </label>
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="backup_location"
                            placeholder="/home/vcdms/backup"
                            value={location}
                            onChange={(e) => {
                              setlocation(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4" style={{ padding: "0 5px" }}>
                        <div className="form-group">
                          <label className="form-check-label">
                            Username : <i style={{ color: "red" }}>*</i>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="user"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                              setusername(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-4" style={{ padding: "0 5px" }}>
                        <div className="form-group">
                          <label className="form-check-label">
                            Password : <i style={{ color: "red" }}>*</i>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={pass}
                            required
                            onChange={(e) => {
                              setPass(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4" style={{ padding: "0 5px" }}>
                        <div className="form-group">
                          <label className="form-check-label">
                            Port : <i style={{ color: "red" }}>*</i>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="number"
                            placeholder="Port"
                            value={port}
                            required
                            onChange={(e) => {
                              if (
                                e.target.value.match(/[^0-9]/) === null &&
                                e.target.value.length <= 5
                              ) {
                                setPort(e.target.value);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => {
                        setHost("");
                        setPass("");
                        setlocation("");
                        setusername("");
                        setPort("");
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupLocation;
