import { useEffect, useState } from "react";
import "./users.css";
import httpService from "../../../services/http.service";
import Loader from "../../common/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const UsersForm = (props) => {
  let [phone, setPhone] = useState("");
  let [username, setUsername] = useState("");
  let [account, setAccount] = useState("");
  let [password, setPassword] = useState("");
  let [type, setType] = useState("");
  let [ID, setID] = useState(null);
  let [loading, setState] = useState(false);

  useEffect(() => {
    if (props.data) {
      setUsername(
        props.data.customerId
          ? props.data.customerId
          : // : localStorage.getItem("Username")
            // ? localStorage.getItem("Username")
            ""
      );
      if((props.data.type == undefined || props.data.type == "" || props.data.type == "normal") && props.data.customerId != "Admin"){
        setAccount(props.data.accountNo);
        setPhone(props.data.mobileNo);
      }
      setType((props.data.type == undefined || props.data.type == "" || props.data.type == "normal") && props.data.customerId != "Admin" ? "normal" : "admin");
      setID(props.data._id);
    }
  }, [props.data]);

  if (props.data) {
  }

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
    if (password === "" && ID === null) {
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
    if(type !="admin"){
    if (account === "" || account === "-1") {
      toast.error("Please Enter the account number", {
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
    if (phone === "") {
      toast.error("Please enter Phone Number", {
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
    if (phone.toString().length !== 10) {
      toast.error("Please enter valid Phone Number", {
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
  }
    showLoader();
    
    let data = {
      id: ID,
      UserName: username.trim(),
      Password: password,
      Phone: phone,
      account: account,
      type : type,
      ActionType: ID ? "Update" : "Add",
    };
    let returnData = await httpService
      .CreateUpdate("SaveUpdateUser", data)
      .then((res) => res.data);
      
      
    if (data.ActionType == "Add") {
      if(returnData.ack === "1"){
        setUsername("");
        setPassword("");
        setPhone("");
        setAccount("");
        hideLoader();
        toast.success("User has been created Successfully.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
      }else{
        toast.error(returnData.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return
      }
      
    } else {
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
      } else {
        toast.error(returnData, {
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
    }
    
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
    props.loadAllData();
  };

  const cancelClickHandler = () => {
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
  };

  return (
    <>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            {props.data ? "Edit user" : "Add user"}
          </div>
          <div className="form-boxtopcont user-form">
            {loading ? <Loader /> : null}
            <div className="row">
            {
              props.data && props.data.customerId && props.data.customerId == "Admin" ? "" : 
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    User Type : <i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    name="role"
                    id="role"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="-1">--Select--</option>
                    <option value="admin">Admin</option>
                    <option value="normal">
                      Normal User
                    </option>
                  </select>
                </div>
              </div> }
            </div>
            {
              type == "admin" || type == "normal" ? 
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
                    disabled = {props.data && props.data.customerId == "Admin"}
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
                    Password : <i style={{ color: "red" }}>*</i>
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
            </div> : ""

            
          }
          {
            type == "normal" ? 
          <div className="row">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Account Numer : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="text"
                    label="account"
                    value={account}
                    placeholder="Enter account number"
                    type="text"
                    onChange={(e) => {
                      // if (e.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {return;}
                      setAccount(e.target.value);
                    }}
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
                    Phone : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="phone"
                    label="Phone"
                    value={phone}
                    placeholder="Enter Phone Number"
                    type="text"
                    onChange={(e) => {
                      if (e.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      setPhone(e.target.value);
                    }}
                    validate={{
                      required: { value: true, errorMessage: "Required" },
                    }}
                  />
                </div>
              </div>
            </div>
            </div> : ""
                  }
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default UsersForm;
