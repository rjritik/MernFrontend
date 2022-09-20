import { useState, useEffect } from "react";
import LeftColumn from "./components/leftColumn/leftcolumn";
import RightColumn from "./components/rightcolumn/rightcolumn";
import "./main.css";
import Navbar from "./components/navbar/navbar";
import Login from "./components/authentication/login";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Layout from "./components/rightcolumn/layout/layout";
import LayoutSelection from "./layoutselection";
import httpService from "./services/http.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CHECK_KEYLOK } from './config';
import Faq from "./components/FAQ/faq";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminApp from "./components/dashboard/adminDashboard/adminApp";
import AdminNavbar from "./components/navbar/adminNavbar";
import Preview from "./components/rightcolumn/preview/preview";
import AdminLogin from "./components/authentication/adminlogin";
import LicenseError from "./components/licenseError/licenseerror";
let interval = setInterval(() => { }, 60000);

function App(props) {
  const [rightContentType, setrightContentType] = useState("preview");
  const [layoutCheck, setlayoutCheck] = useState(false);
  const [layoutType, setlayoutType] = useState("3");
  const [borderColorProp, setborderColorProp] = useState("");
  const [borderWidthProp, setborderWidthProp] = useState("");
  const [selectedLayoutID, setselectedLayoutID] = useState("");
  const [errorPage, setErrorPage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [license, setLicense] = useState({})
  const checkkeylok = async () => {
    if (!CHECK_KEYLOK) return
    Checkkeylok_validation();
    interval = setInterval(() => {
      if (!CHECK_KEYLOK) return
      Checkkeylok_validation();
    }, 60000);
  };
  const Checkkeylok_validation = async () => {
    let res = await httpService.get("checkkeylok")
      .then((res) => res.data)
      .catch((err) => {
        setErrorMessage("Can not validate keylok due to bad network");
        setErrorPage(true);
        localStorage.removeItem("Username")
        sessionStorage.removeItem("session")
      });
    if (res === undefined || res === null) return;
    setLicense(res);
    if (res['output'] === '' || res['output'] === '0') {
      if (res['output'] === '') {
        setErrorMessage('License file not found or No keylok dongle is attached to the server.');
      }
      else setErrorMessage('Please contact your vendor to renew your license.');
      localStorage.removeItem("Username");
      sessionStorage.removeItem("session");
      setErrorPage(true);
    }
    else {
      setErrorPage(false);
    }
  }
  useEffect(() => {
    if (!CHECK_KEYLOK) return;
    else {
      checkkeylok();
      return () => {
        clearInterval(interval);
      };
    }
  }, [])

  useEffect(async () => {
    let dataUserPost = { userID: localStorage.getItem("UserId") };

    let SelectedLayoutdata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });
    if (window.location.href.split("/view/").length > 1) {
      let dataProp = {
        id: window.location.href.split("/view/")[1].split("/")[0],
      };
      let SelectedLayoutdataProp = await httpService
        .CreateUpdate("getSelectedLayoutById", dataProp)
        .catch((err) => {
          console.log(err);
        });
      let getData = SelectedLayoutdataProp.data.data[0];
      setborderColorProp(getData.color);
      setborderWidthProp(getData.width);
    }

    if (SelectedLayoutdata.data.data.length > 0) {
      let data = SelectedLayoutdata.data.data[0].selectedLayout;
      if (selectedLayoutID == "") {
        setselectedLayoutID(SelectedLayoutdata.data.data[0]._id);
      }
      setlayoutType(data);
      setlayoutCheck(true);
    }
  }, []);
  useEffect(() => {}, [rightContentType, layoutCheck, selectedLayoutID]);
  return (
    <Router>
      <div className="App">
      {errorPage ? (
        <div><LicenseError license={license} erroeMessage={errorMessage}></LicenseError></div>
      ) :
        (
        <Switch>
          <Route path="/content/:id">
            <div>
              <Navbar className="navbarmain"></Navbar>
              <Preview
                id={
                  window.location.href.split("/content/").length > 1
                    ? window.location.href.split("/content/")[1].split("/")[0]
                    : ""
                }
                showProperty={true}
              />
            </div>
          </Route>
          <Route path="/content">
            <div>
              <Navbar className="navbarmain"></Navbar>
              {layoutCheck ? (
                <div className="row othercomponent">
                  <div className="col-2">
                    <LeftColumn
                      rightContentType={rightContentType}
                      setrightContentType={setrightContentType}
                    ></LeftColumn>
                  </div>
                  <div className="col-10 mainright">
                    <RightColumn
                      rightContent="layout"
                      rightContentType={rightContentType}
                      setrightContentType={setrightContentType}
                      layoutType={layoutType}
                      setlayoutType={setlayoutType}
                      selectedLayoutID={selectedLayoutID}
                      setselectedLayoutID={setselectedLayoutID}
                    ></RightColumn>
                  </div>
                </div>
              ) : (
                <div className="row othercomponentLayoutSelect">
                  <LayoutSelection
                    setlayoutCheck={setlayoutCheck}
                  ></LayoutSelection>
                </div>
              )}
            </div>
          </Route>
          <Route path="/view/:id">
            <Layout
              rightContentType={"layout"}
              setrightContentType={setrightContentType}
              selectedLayoutID={
                window.location.href.split("/view/").length > 1
                  ? window.location.href.split("/view/")[1].split("/")[0]
                  : ""
              }
              setselectedLayoutID={setselectedLayoutID}
              view={true}
              preview={true}
              borderColor={borderColorProp}
              borderWidth={borderWidthProp}
            ></Layout>
          </Route>
          <Route path="/faq">
            <div>
              <Navbar></Navbar>
              <Faq></Faq>
            </div>
          </Route>
          <Route path="/dashboard">
            <div>
              <Navbar></Navbar>
              <div className="othercomponentnavbar">
                <Dashboard />
              </div>
            </div>
          </Route>
          <Route path="/admindashboard">
            <div>
              <AdminNavbar></AdminNavbar>
              <div className="">
                <AdminApp />
              </div>
            </div>
          </Route>
          
          <Route path="/adminlogin">
            <AdminLogin/>
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
        )}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
