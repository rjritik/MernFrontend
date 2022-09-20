import { React, useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import {} from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, Link, useHistory } from "react-router-dom";
import httpService from "../../services/http.service";
import loginImg from "../../assets/loginleft.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../common/loader"

let Login = (props) => {
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const customerID  = localStorage.getItem("customerId")
    const type = localStorage.getItem("userType");
    const dataFirst = localStorage.getItem("dataFirst");

    if(customerID == 'Admin' || type == "admin" ){
      if(customerID == 'Admin' && dataFirst == true){
        history.push("/admindashboard/changepassword")
      }else{
      history.push("/admindashboard");
      }
    }else if(localStorage.getItem("UserId")) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  });

  useEffect(()=>{
    getCookies();

  },[rememberMe])
    const getCookies=()=>{
    let UCustomerId = getCookie("UsercustomerId");
    let UAccountNumber = getCookie("UserAccountNo");
    let UPassword = getCookie("Userpassword");
    let UMobileNumber = getCookie("UserMobileNo");
    if(UCustomerId && UAccountNumber && UPassword && UMobileNumber ){
     let user={
      customerId:UCustomerId,
      AccountNo:UAccountNumber,
      password:UPassword,
      MobileNo:UMobileNumber
     }
     setData(user);
     setRememberMe(true);
    };
  
  }

  const setCookies = (event)=>{

    if (event.target.checked) 
    {let time = new Date();
      time.setTime(time.getTime()+24*60*60);
      let c = `UsercustomerId=${data.customerId};expires=${time.toUTCString()};`
      let d = `UserAccountNo=${data.AccountNo};expires=${time.toUTCString()};`
      let e = `Userpassword=${data.password};expires=${time.toUTCString()};`
      let f = `UserMobileNo=${data.MobileNo};expires=${time.toUTCString()};`
      document.cookie = c;
      document.cookie = d;
      document.cookie = e;
      document.cookie = f;
      setRememberMe(true);
      
    } else {
      clearListCookies();
      getCookies();
      setRememberMe(false);
  }
    
    
  }


  function clearListCookies()
  {   
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++)
      {   
          var spcook =  cookies[i].split("=");
          deleteCookie(spcook[0]);
      }
      getCookies();
      // window.location = ""; // TO REFRESH THE PAGE
  }

  function deleteCookie(cookiename)
      {
          var d = new Date();
          d.setDate(d.getDate() - 1);
          var expires = ";expires="+d;
          var name=cookiename;
          var value="";
          document.cookie = name + "=" + value + expires + ";";                    
      }

  const getCookie = (cname)=> {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  let handleValidSubmit = async (event, values) => {
    event.preventDefault();
  };

  const [data, setData] = useState({
    customerId: "",
    AccountNo: "",
    password: "",
    MobileNo: "",
  });
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const loginSave = async () => {
     showLoader();
    if(data.customerId == "Admin"){
      hideLoader();
      toast.error("Super-Admin login is not allowed here", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }else{
      let res = await httpService
      .CreateUpdate("getloginapi", data)
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      // console.log(res.data);
      // alert(res.data.message);

      //  history.push("/dashboard")
      if(res.data && res.data.data && res.data.data.type && res.data.data.type == "admin"){
        hideLoader();
        toast.error("Super-Admin login is not allowed here ", {
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
      if (res.data && res.data.message == "login seccessfull") {
        toast.success("Login Successfull ", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("isSession", true);
        localStorage.setItem("customerId", data.customerId);

        localStorage.setItem("UserId", res.data.data._id);
        // localStorage.setItem("password",data.password);
        // localStorage.setItem("MobileNo",data.MobileNo);
        const dataFirst = localStorage.getItem("dataFirst");

        if(data.customerId == 'Admin'){
          if(data.customerID == 'Admin' && dataFirst == true){
            history.push("/admindashboard/changepassword")
          }else{
          history.push("/admindashboard");
          }
        }else{
          history.push({
            pathname: "/dashboard",
            // search: "?query=abc",
            state: { detail: res.data.data },
          });
        }
      } else {
        toast.error(res.data && res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("isSession", false);
        history.push("/login");
        
      }

    }
    }
     hideLoader();
  };
  const showLoader=()=>{
    setLoading(true);
  }
  const hideLoader=()=>{
    setLoading(false);
   
  }
  return (
    <div>
   {loading ? <Loader/> : null}

      {login ? (
        <div>
          <div className="home-btn d-none d-sm-block">
            <i className="bx bx-home h2"></i>
          </div>
          <div className="account-pages">
            <Container>
              <Row className="justify-content-center">
                <Col md={12} lg={11} xl={8}>
                  <Card className="overflow-hidden login-wrapper">
                    <CardBody className="row">
                      <div className="col-6 p-0">
                        <div className="login-img">
                          <img src={loginImg} alt="LoginImage" />
                        </div>
                      </div>
                      <div className="col-6 p-0">
                        <div className="login-right">
                          <div className="login-txthead">Customer Login</div>
                          <p className="signText">
                            Sign in to continue to RSD.
                          </p>
                          <div className="">
                            <form
                              className="form-horizontal login-form"
                              onSubmit={handleValidSubmit}
                            >
                              <div className="form-group">
                                <span className="input-icon">
                                  <i className="fa fa-user"></i>
                                </span>
                                <input
                                  name="customerId"
                                  value={data.customerId}
                                  className="form-control formInput"
                                  placeholder="Customer ID"
                                  type="text"
                                  onChange={(e) => onInputChange(e)}
                                  // validate={{
                                  //   required: {
                                  //     value: true,
                                  //     errorMessage: "Required",
                                  //   },
                                  // }}
                                />
                              </div>
                              <div className="form-group">
                                <span className="input-icon">
                                  <i className="fa fa-user"></i>
                                </span>
                                <input
                                  name="AccountNo"
                                  value={data.AccountNo}
                                  className="form-control formInput"
                                  placeholder="Account Number"
                                  type="text"
                                  onChange={(e) => onInputChange(e)}
                                  // validate={{
                                  // required: {
                                  // value: true,
                                  // errorMessage: "Required",
                                  // },
                                  // }}
                                />
                              </div>
                              <div className="form-group">
                                <span className="input-icon">
                                  <i className="fa fa-lock"></i>
                                </span>
                                <input
                                  name="password"
                                  value={data.password}
                                  type="password"
                                  className="form-control formInput"
                                  onChange={(e) => onInputChange(e)}
                                  placeholder="Password"
                                  // validate={{
                                  //   required: {
                                  //     value: true,
                                  //     errorMessage: "Required",
                                  //   },
                                  // }}
                                />
                              </div>
                              <div className="form-group">
                                <span className="input-icon">
                                  <i className="fa fa-lock"></i>
                                </span>
                                <input
                                  name="MobileNo"
                                  value={data.MobileNo}
                                  className="form-control formInput"
                                  type="text"
                                  onChange={(e) => onInputChange(e)}
                                  placeholder="Mobile Number"
                                  // validate={{
                                  //   required: {
                                  //     value: true,
                                  //     errorMessage: "Required",
                                  //   },
                                  // }}
                                />
                              </div>

                              <div className="custom-control custom-checkbox ml-0">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customControlInline"
                                   checked={rememberMe}
                                  onChange={(e)=>{
                                    setCookies(e);
                                  }}
                                />
                                <label
                                  className="custom-control-label pt-1"
                                  htmlFor="customControlInline"
                                >
                                  {" "}
                                  Remember me
                                </label>
                              </div>

                              <div className="mt-2 text-center">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                  onClick={() => loginSave()}
                                >
                                  Log In
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </div>
  );
};

export default Login;
