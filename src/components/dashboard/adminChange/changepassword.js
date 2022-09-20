import { useEffect, useState } from "react";
import "./users.css";
import httpService from "../../../services/http.service";
import Loader from "../../common/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Redirect, Link, useHistory } from "react-router-dom";

const ChangePassword = (props) => {
  const history = useHistory();

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [oldpassword, setoldPassword] = useState("");
  let [ID, setID] = useState(null);
  let [loading, setState] = useState(false);

  useEffect(() => {
    setUsername("Admin");
    setID(localStorage.getItem("UserId"));
  }, []);

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  let handleValidSubmit = async () => {
    if (username === "") {
      toast.error("Please enter User name", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (password === "" || ID === null) {
      toast.error("Please enter Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (oldpassword === "" || ID === null) {
      toast.error("Please enter Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    showLoader();

    let data = {
      id: ID,
      UserName: username.trim(),
      Password: password,
      oldpassword: oldpassword,
      Phone: "",
      account: "",
      type: "admin",
      ActionType: "Update",
    };
    let returnData = await httpService
      .CreateUpdate("changePassword", data)
      .then((res) => res.data);

    hideLoader();
    if (returnData.ack === "1") {
      toast.success("User has been updated Successfully.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("dataFirst", false);

    } else {
      toast.error(returnData.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    history.push("/admindashboard");

    // props.loadAllData();
  };

  const cancelClickHandler = () => {
    history.push("/admindashboard");
  };

  return (
    <div className="pad-15" style={{padding:"15px"}}>
      <div className="form-boxdiv">
        <div className="form-boxtopline5">
          Change Password
        </div>
        <div className="form-boxtopcont user-form">
          {loading ? <Loader /> : null}
          <div className="row">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    User Name : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="user_name"
                    placeholder="Enter Username"
                    value={username}
                    disabled
                    onChange={(e) => {
                      if (e.target.value.match(/[^A-Za-z0-9\s]/gi, "")) {
                        return;
                      }
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Old Password : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    label="Password"
                    type="password"
                    value={oldpassword}
                    onChange={(e) => setoldPassword(e.target.value)}
                    placeholder="Enter Password"
                    validate={{
                      required: { value: true, errorMessage: "Required" },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    New Password : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    validate={{
                      required: { value: true, errorMessage: "Required" },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-danger marb-15 marl-15"
          onClick={() => cancelClickHandler()}
        >
          Cancel
        </button>
        <button
          className="btn btn-success marl-15 marb-15"
          onClick={() => handleValidSubmit()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
