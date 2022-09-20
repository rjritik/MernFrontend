import React, { useState, useEffect } from "react";
//import { Button } from "reactstrap";
import httpService from "../../../services/http.service";
import "./adminApp.css";
import AdminDashboard from "./admincontent";
import AdminSidebar from "./sidebar";
import { Redirect, Route, Switch } from "react-router";
import Users from "../adminChange/users";
import Backup from "./backup";
import BackupLocation from "./backuplocation";
import Version from "../../navbar/versions/version";
import UsersForm from "../adminChange/usersform";
import ChangePassword from "../adminChange/changepassword";
import CloudCredentials from "./cloudcredentials";

const AdminApp = (props) => {
  const [allData, setAllData] = useState({});
  const [userList, setuserList] = useState([]);
  const [propertyList, setpropertyList] = useState([]);
  const [channelsList, setchannelsList] = useState([]);
  const [sidebarClassesUser, setsidebarClassesUser] = useState([]);
  const [sidebarClassesProperty, setsidebarClassesProperty] = useState([]);
  const [sidebarClassesChannel, setsidebarClassesChannel] = useState([]);
  const [userButtons, setuserButtons] = useState([]);
  const [propertyButtons, setpropertyButtons] = useState([]);
  const [channelsButtons, setchannelsButtons] = useState([]);
  const [backupLocation, setBackupLocation] = useState({});
  const [saved, setSaved] = useState(false);
  const [AdminData, setAdminData] = useState({});

  const getAllPropertyData = async () => {
    let allProperty = await httpService
      .getAll("getallAdminData")
      .catch((err) => {
        console.log(err);
      });
    setuserList(allProperty.data.users);
    setpropertyList(allProperty.data.property);
    setchannelsList(allProperty.data.channels);
    setAllData(allProperty.data);
    let obj = allProperty.data.users.find(o => o.customerId === 'Admin');
    setAdminData(obj);
  };

  useEffect(async () => {
    getAllPropertyData();
  }, []);
  
  useEffect(() => {
    const getBackupLocation = async () => {
      let data = { user: localStorage.getItem("Username") };
      let res = await httpService
        .getLocation("getbackupLocation", data)
        .then((res) => res.data)
        .catch((err) => null);
      if (res) {
        setBackupLocation(res);
      }
    };
    getBackupLocation();
  }, [saved]);

  useEffect(() => {
    let userClasses = [...sidebarClassesUser];
    let propertyClasses = [...sidebarClassesProperty];
    let channelsClasses = [...sidebarClassesChannel];
    let userButtonsTemp = [...userButtons];
    let propertyButtonsTemp = [...propertyButtons];
    let channelsButtonsTemp = [...channelsButtons];
    if (localStorage.getItem("userClasses"))
      userClasses = localStorage.getItem("userClasses").split(",");
    if (localStorage.getItem("propertyClasses"))
      propertyClasses = localStorage.getItem("propertyClasses").split(",");
    if (localStorage.getItem("channelsClasses"))
      channelsClasses = localStorage.getItem("channelsClasses").split(",");
    if (localStorage.getItem("userButtons"))
      userButtonsTemp = localStorage.getItem("userButtons").split(",");
    if (localStorage.getItem("propertyButtons"))
      propertyButtonsTemp = localStorage.getItem("propertyButtons").split(",");
    if (localStorage.getItem("channelsButtons"))
      channelsButtonsTemp = localStorage.getItem("channelsButtons").split(",");

    for (let i = 0; i < userList.length; i++) {
      if (i >= userClasses.length) {
        userClasses.push("0");
        userButtonsTemp.push("fa-plus-circle");
      }
    }

    for (let i = 0; i < propertyList.length; i++) {
      if (i >= propertyClasses.length) {
        propertyClasses.push("0");
        propertyButtonsTemp.push("fa-plus-circle");
      }
    }

    for (let i = 0; i < channelsList.length; i++) {
      if (i >= channelsClasses.length) {
        channelsClasses.push("0");
        channelsButtonsTemp.push("fa-plus-circle");
      }
    }

    setuserButtons(userButtonsTemp);
    setpropertyButtons(propertyButtonsTemp);
    setchannelsButtons(channelsButtonsTemp);

    setsidebarClassesUser(userClasses);
    setsidebarClassesProperty(propertyClasses);
    setsidebarClassesChannel(channelsClasses);
    localStorage.setItem("userClasses", userClasses);
    localStorage.setItem("propertyClasses", propertyClasses);
    localStorage.setItem("channelsClasses", channelsClasses);
    localStorage.setItem("userButtons", userButtonsTemp);
    localStorage.setItem("propertyButtons", propertyButtonsTemp);
    localStorage.setItem("channelsButtons", channelsButtonsTemp);
  }, [allData]);

  const loadAllData = async () => {
    let allProperty = await httpService
      .getAll("getallAdminData")
      .catch((err) => {
        console.log(err);
      });
    setuserList(allProperty.data.users);
    setpropertyList(allProperty.data.property);
    setchannelsList(allProperty.data.channels);
    setAllData(allProperty.data);
    let obj = allProperty.data.users.find(o => o.customerId === 'Admin');
    setAdminData(obj);
  };

  return (
    <div className="row">
      <div className=" left-sidefixed-outer">
        <AdminSidebar
          allData={allData}
          setAllData={setAllData}
          sidebarClassesUser={sidebarClassesUser}
          setsidebarClassesUser={setsidebarClassesUser}
          sidebarClassesProperty={sidebarClassesProperty}
          setsidebarClassesProperty={setsidebarClassesProperty}
          sidebarClassesChannel={sidebarClassesChannel}
          setsidebarClassesChannel={setsidebarClassesChannel}
          userButtons={userButtons}
          setuserButtons={setuserButtons}
          propertyButtons={propertyButtons}
          setpropertyButtons={setpropertyButtons}
          channelsButtons={channelsButtons}
          setchannelsButtons={setchannelsButtons}
        />
      </div>
      <div className="mainDivDashboard">
        <Switch>
          <Route
            path="/admindashboard/settings/cloudcredentials"
            render={() => {
              return <CloudCredentials backupLocation={backupLocation}/>;
            }}
          />
          <Route
            path="/admindashboard/settings/backup"
            render={() => {
              return <Backup backupLocation={backupLocation} />;
            }}
          />

          <Route
            path="/admindashboard/settings/backuplocation"
            render={() => {
              return (
                <BackupLocation
                  setBackupLocation={setBackupLocation}
                  setSaved={setSaved}
                  backupLocation={backupLocation}
                  saved={saved}
                />
              );
            }}
          />
          <Route
            path="/admindashboard/settings/version"
            render={() => {
              return (
                <Version/>
              );
            }}
          />
          <Route
            path="/admindashboard/settings"
            render={() => {
              return <Backup backupLocation={backupLocation} />;
            }}
          />
          <Route
            path="/admindashboard/changepassword"
            render={() => {
              return <ChangePassword/>
            }}
          />
          <Route
            path="/admindashboard/users"
            render={() => {
              return <Users allData={allData} setAllData={setAllData} loadAllData={()=>loadAllData()} />;
            }}
          />
          <Route
            path="/admindashboard/configuration"
            render={() => {
              return (
                <AdminDashboard
                  allData={allData}
                  setAllData={setAllData}
                  sidebarClassesUser={sidebarClassesUser}
                  setsidebarClassesUser={setsidebarClassesUser}
                  sidebarClassesProperty={sidebarClassesProperty}
                  setsidebarClassesProperty={setsidebarClassesProperty}
                  sidebarClassesChannel={sidebarClassesChannel}
                  setsidebarClassesChannel={setsidebarClassesChannel}
                  userButtons={userButtons}
                  setuserButtons={setuserButtons}
                  propertyButtons={propertyButtons}
                  setpropertyButtons={setpropertyButtons}
                  channelsButtons={channelsButtons}
                  setchannelsButtons={setchannelsButtons}
                  getAllPropertyData = {getAllPropertyData}
                />
              );
            }}
          />
          <Route
            path="/admindashboard"
            render={() => {
              return (
                <AdminDashboard
                  allData={allData}
                  setAllData={setAllData}
                  sidebarClassesUser={sidebarClassesUser}
                  setsidebarClassesUser={setsidebarClassesUser}
                  sidebarClassesProperty={sidebarClassesProperty}
                  setsidebarClassesProperty={setsidebarClassesProperty}
                  sidebarClassesChannel={sidebarClassesChannel}
                  setsidebarClassesChannel={setsidebarClassesChannel}
                  userButtons={userButtons}
                  setuserButtons={setuserButtons}
                  propertyButtons={propertyButtons}
                  setpropertyButtons={setpropertyButtons}
                  channelsButtons={channelsButtons}
                  setchannelsButtons={setchannelsButtons}
                  getAllPropertyData = {getAllPropertyData}
                />
              );
            }}
          />
          <Redirect from="/" to={"/admindashboard"} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminApp;
