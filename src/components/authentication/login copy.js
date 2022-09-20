import { React, useState } from "react";
//import { withRouter, Link } from 'react-router-dom';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import {} from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Loader from "../../../common/loader";
import { Redirect, Link } from "react-router-dom";
import loginImg from "../../assets/loginleft.png";

const Login = () => {
//   let [values, setValues] = useState({});
//   let [username, setUsername] = useState("");
  let [customerId, setCustomerId] = useState("");
  let [AccountNo, setAccountNo] = useState("");
  let [MobileNo, setMobileNo] = useState("");

  let [password, setPassword] = useState("");
//   let [loading, setState] = useState(false);
  const [login, setLogin] = useState(true);
//   const [signup, setSignup] = useState(false);

//   function hideLoader() {
//     setState(false);
//   }

//   function showLoader() {
//     setState(true);
//   }

  let handleValidSubmit = async (event, values) => {
    event.preventDefault();

    // showLoader();
    // setValues(values);

    setLogin(false);


    // let data = {
    //   Username: values.username.trim(),
    //   Password: values.password,
    // };
    // if(data["Password"] == props.superPassword) { 
    //   window.localStorage.setItem("IsEqual", "true");
    // }
    // else {window.localStorage.setItem("IsEqual", "false")};

    // let returnData = await HttpService.getByBoj("logincustomer", data)
    //   .then((res) => res.data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    
    // if (returnData) {
    //   if (returnData.ack === "0") {
    //     hideLoader();
    //     alert(returnData.msg);
    //   } else if (returnData.ack === "1") {
    //     setUsername("");
    //     setPassword("");
    //     hideLoader();
    //     localStorage.setItem("session", returnData["session"]);
    //     localStorage.setItem("Username", data.Username);
    //     setLogin(false);
    //   } else if (returnData.ack === "2") {
    //     let x = window.confirm(
    //       `The user ${returnData.msg} \n\nDo you want to log out of all the devices?`
    //     );
    //     if (x) {
    //       localStorage.setItem("Username", data.Username);
    //       let response = await HttpService.CreateUpdate("logoutcustomer", data)
    //         .then((res) => res.data)
    //         .catch((err) => {
    //           hideLoader();
    //           alert("Something went wrong please try again");
    //           console.log(err);
    //         });
    //       if (response) {
    //         if (response.status === "success") {
    //           let res = await HttpService.getByBoj("logincustomer", data)
    //             .then((res) => res.data)
    //             .catch((err) => {
    //               hideLoader();
    //               alert("Something went wrong please try again");
    //               console.log(err);
    //             });
    //           if (res.ack === "0") {
    //             hideLoader();
    //             alert(res.msg);
    //           } else if (res.ack === "1") {
    //             setUsername("");
    //             setPassword("");
    //             hideLoader();
    //             localStorage.setItem("session", res["session"]);
    //             setLogin(false);
    //           }
    //         } else {
    //           hideLoader();
    //           alert("Something went wrong please try again");
    //         }
    //       } else {
    //         hideLoader();
    //         alert("Something went wrong please try again");
    //       }
    //     } else {
    //       hideLoader();
    //     }
    //   } else {
    //     hideLoader();
    //     alert("Something went wrong please try again");
    //   }
    // } else {
    //   hideLoader();
    //   alert("Something went wrong please try again");
    // }
  };

//   const signUpClick = (event) => {
//     event.preventDefault();
//     setSignup(true);
//   };

  return login ? (
    <div>
      {
        //   loading ? <Loader /> : null
    }
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
                      <img src={loginImg} alt="loginImage"/>
                    </div>
                  </div>
                  <div className="col-6 p-0">
                    <div className="login-right">
                      <div className="login-txthead">Customer Login</div>
                      <p className="signText">Sign in to continue to RSD.</p>
                    <div className="">
                      <AvForm
                        className="form-horizontal login-form"
                        onValidSubmit={handleValidSubmit}
                      >
                        {
                        //     props.error && props.error ? (
                        //   <Alert color="danger">{props.error}</Alert>
                        // ) : null
                    }

                        <div className="form-group">
                          <span className="input-icon"><i className="fa fa-user"></i></span>
                          <AvField
                            name="customer"
                            value={customerId}
                            className="form-control"
                            placeholder="Customer ID"
                            type="text"
                            onChange={(e) => setCustomerId(e.target.value)}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Required",
                              },
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <span className="input-icon"><i className="fa fa-user"></i></span>
                          <AvField
                            name="account"
                            value={AccountNo}
                            className="form-control"
                            placeholder="Customer ID"
                            type="text"
                            onChange={(e) => setAccountNo(e.target.value)}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Required",
                              },
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <span className="input-icon"><i className="fa fa-lock"></i></span>
                          <AvField
                            name="password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Required",
                              },
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <span className="input-icon"><i className="fa fa-lock"></i></span>
                          <AvField
                            name="mobile"
                            value={MobileNo}
                            type="text"
                            onChange={(e) => setMobileNo(e.target.value)}
                            placeholder="Mobile Number"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Required",
                              },
                            }}
                          />
                        </div>

                        <div className="custom-control custom-checkbox ml-0">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customControlInline"
                          />
                          <label
                            className="custom-control-label pt-1"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-2 text-center">
                          <button
                            className="btn btn-primary"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </AvForm>
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
    <Redirect to="/content" />
  );
}

export default Login;
