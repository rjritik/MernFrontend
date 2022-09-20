import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { CardBody, Card, Table } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./admincontent.css";
import httpService from "../../../services/http.service";
import Select from "react-select";
import {
  faPlusSquare,
  faEdit,
  faArrowDown,
  faAngleDoubleDown,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import iconImage from "../../../assets/download.jpg";
import { ToastContainer, toast } from "react-toastify";
import validator from 'validator';
import { bitStreamtoNumber , CHECK_KEYLOK} from "../../../config";
import Loader  from "../../common/loader";
import Chart from "react-apexcharts";
import ChannelStats from "../channelstats";

const AdminDashboard = (props) => {
  const [propertyClasses, setPropertyClasses] = useState([]);
  const [ruleForProperty, setRuleForProperty] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [userClasses, setUserClasses] = useState([]);
  const [toggleUserDetail, settoggleUserDetail] = useState(false);
  const [arrowClasses, setArrowClasses] = useState([]);
  const [channelsClass, setChannelsClass] = useState([]);
  const [IPFormatDataValue, setIPFormatDataValue] = useState([]);
  const [IPFormatV, setIPFormatV] = useState([]);
  const [IPFormatVal, setIPFormatVal] = useState([]);
  const [IPFormatData, setIPFormatData] = useState([]);
  const [onClickDelete, setOnclickDelete] = useState('');
  const [toggleChannelDelete, settoggleChannelDelete] = useState(false);
  const [toggleChannelShow, settoggleChannelShow] = useState(false);
  const [ruleEditRulemodal, settoggleEditRuleModal] = useState(false);
  const [channelRuleExisting, setchannelRuleExisting] = useState("");
  const [channelIdforRule, setchannelIdforRule] = useState("");
  const [channelRuleName, setchannelRuleName] = useState("");
  const [onClickData, setOnclickData] = useState({});
  const [array2, setArray2] = useState([]);
  const [array1, setArray1] = useState([]);
  const [RuleDataArray, setRuleDataArray] = useState([]);
  const [delId, setDelId] = useState('');
  const [propDelId, setpropDelId] = useState('');
  const [save3, setSave3] = useState(false);
  const [save, setSave] = useState(false);
  const [save1, setSave1] = useState(false);
  const [dataStats, setdataStats] = useState({});
  const [onClickRuleData, setOnclickRuleData] = useState({});
  const [defaultVal, setDefaultVal] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [array3, setArray3] = useState([]);
  // const [propId, setPropId] = useState('');
  const [propertyVal, setPropertyVal] = useState([]);
  const [selectedPropertyValues, setSelectedPropertyValues] = useState([]);
  const [propertyeditmodal, setpropertyeditmodal] = useState(false);
  const [ruleEditmodal, setRuleEditmodal] = useState(false);
  const [onClickProperty, setOnclickProperty] = useState({});
  const [selectedRuleValues, setSelectedRuleValues] = useState([]);
  const [rulecount, setRuleCount] = useState(0);
  const [show2, setShow2] = useState(false);
  const[hide,sethide] = useState(false)
  const getLicensedRules = async () => {
    let stream = await httpService.get("getlicenses").catch(e => {
      setRuleCount(0)
    })
    console.log(stream.data)
    stream.data.output[15] == "1" ? sethide(false) : sethide(true)
    let licenseCount = bitStreamtoNumber(stream.data, "rule")
    setRuleCount(licenseCount)
  }
  useEffect(() => {
  if(CHECK_KEYLOK) getLicensedRules()
  },[])
  const toggleDeleteChannel = () =>
    settoggleChannelDelete((prevState) => !prevState);
  const toggleRuleEditModal= () =>
  settoggleEditRuleModal((prevState) => !prevState);
  const togglepropertyedit = () =>
    setpropertyeditmodal((prevState) => !prevState);
  const toggleShowChannel = () =>
  settoggleChannelShow((prevState) => !prevState);
  const toggleRuleEdit = () =>
    setRuleEditmodal((prevState) => !prevState);
    const toggleChannelStat = () =>
    setShow2((prevState) => !prevState);

    const [series, setSeries] = useState([
      {
        name: "Redirects",
        data: [2, 9, 3, 17, 6, 3, 7],
        color: "rgba(18,20,50,0.6)",
        backgroundColor: "rgba(18,20,50,0.2)",
      },
      {
        name: " Time Period",
        data: [2, 2, 5, 5, 2, 1, 10],
        color: "rgb(102, 102, 153)",
        backgroundColor: "rgb(102, 102, 153,0.1)",
      },
    ]);

    const [options, setOptions] = useState({
      chart: { 
        id: "apexchart-example",
        
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    });

  useEffect(() => {
    if (
      props.allData &&
      Object.keys(props.allData).length > 0 &&
      props.allData.users.length > 0
    ) {
      let classes = [...propertyClasses];
      if (localStorage.getItem("dashboardPropertyClasses"))
        classes = [
          ...localStorage.getItem("dashboardPropertyClasses").split(","),
        ];
      let userclasses = [...userClasses];
      if (localStorage.getItem("dashboardUserClasses"))
        userclasses = [
          ...localStorage.getItem("dashboardUserClasses").split(","),
        ];
      let arrowclasses = [...arrowClasses];
      if (localStorage.getItem("dashboardArrowClasses"))
        arrowclasses = [
          ...localStorage.getItem("dashboardArrowClasses").split(","),
        ];

      for (let i = 0; i < props.allData.users.length; i++) {
        if (i >= classes.length) {
          classes.push("none");
          userclasses.push("btn-100 btn btn-secondary");
          arrowclasses.push("faPlusCircle");
        }
      }
      setPropertyClasses(classes);
      setUserClasses(userclasses);
      setArrowClasses(arrowclasses);
      localStorage.setItem("dashboardPropertyClasses", classes);
      localStorage.setItem("dashboardUserClasses", userclasses);
      localStorage.setItem("dashboardArrowClasses", arrowclasses);
    }
  }, [props.allData.users]);

  useEffect(() => {
    let userClassesTemp = [...userClasses];
    let arrowClassesTemp = [...arrowClasses];
    let propertyClassesTemp = [...propertyClasses];
    let channelsClassesTemp = [...channelsClass];
    for (let i = 0; i < props.sidebarClassesUser.length; i++) {
      if (props.sidebarClassesUser[i] === "1") {
        arrowClassesTemp[i] = "faMinusCircle";
        userClassesTemp[i] = "btn-100-active btn btn-secondary";
        propertyClassesTemp[i] = "";
      } else {
        arrowClassesTemp[i] = "faPlusCircle";
        userClassesTemp[i] = "btn-100 btn btn-secondary";
        propertyClassesTemp[i] = "none";
      }
    }
    for (let i = 0; i < props.sidebarClassesProperty.length; i++) {
      if (props.sidebarClassesProperty[i] === "1") {
        channelsClassesTemp[i] = "";
      } else {
        channelsClassesTemp[i] = "not-visible";
      }
    }
    setChannelsClass(channelsClassesTemp);
    setUserClasses(userClassesTemp);
    setArrowClasses(arrowClassesTemp);
    setPropertyClasses(propertyClassesTemp);
    localStorage.setItem("dashboardUserClasses", userClassesTemp);
    localStorage.setItem("dashboardArrowClasses", arrowClassesTemp);
    localStorage.setItem("dashboardPropertyClasses", propertyClassesTemp);
    localStorage.setItem("dashboardChannelClasses", channelsClassesTemp);
  }, [
    props.sidebarClassesChannel,
    props.sidebarClassesUser,
    props.sidebarClassesProperty,
  ]);

  useEffect(() => {
    if (props.allData && Object.keys(props.allData).length > 0) {
      let classes = [...channelsClass];
      if (localStorage.getItem("dashboardChannelClasses"))
        classes = [
          ...localStorage.getItem("dashboardChannelClasses").split(","),
        ];
      for (let i = 0; i < props.allData.property.length; i++) {
        if (i >= channelsClass.length) {
          classes.push("not-visible");
        }
      }

      setChannelsClass(classes);
      localStorage.setItem("dashboardChannelClasses", classes);
    }
  }, [props.allData.property]);

  const channelUpdatefun = (e) => {
    showLoader();
    setSave(false);
    settoggleChannelShow(true);
    PropertyArray(e);

    if (e.PropertyType) {
      let selectedKeys = e.PropertyType;
      let arr = [];
      for (let i = 0; i < selectedKeys.length; i++) {
        let obj = {
          value: selectedKeys[i].value,
          label: selectedKeys[i].label,
        };

        
        arr.push(obj);
      }
      setSelectedPropertyValues(arr);
      setPropertyVal(arr);
    }
    setOnclickData(e);
    hideLoader();
  };

  const ruleUpdatefun = (e,propertyData) => {
    toggleRuleEditModal();
    setRuleForProperty(propertyData._id);
    ruleArr(e);
    setchannelRuleExisting(e.ChannelRulesId ? e.ChannelRulesId : "");
    setchannelIdforRule(e._id)
    // setchannelRuleName(e.ChannelRulesName);
    for( let i=0 ;i<e.PropertyType.length;i++){
      if(e.PropertyType[i].PropertyId){
        if(e.PropertyType[i].PropertyId==propertyData._id){
          setchannelRuleName(e.PropertyType[i].ChannelRulesName);
           setOnclickDelete(e.PropertyType[i].ChannelRulesName);
          break;
        }
      }
     }
    setOnclickData(e);
  };

  let gridOptions = {};
  let onGridReady = {};
  const defaultColDef = {
    sortable: false,
    editable: false,
    flex: 1,
    filter: false,
  };

  const loadSidebar = async (event, RegionID, SystemID, index) => {
    showLoader();
    event.preventDefault();
    let classes = [...channelsClass];
    let y = [...props.propertyButtons];
    for (let i = 0; i < classes.length; i++) {
      if (i !== index) {
        classes[i] = "not-visible";
        y[i] = "fa-plus-circle";
      }
    }
    y[index] =
      classes[index] === "not-visible" ? "fa-minus-circle" : "fa-plus-circle";
    classes[index] = classes[index] === "not-visible" ? "" : "not-visible";
    if (classes[index] === "not-visible") {
      let x = [...props.sidebarClassesProperty];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      props.setsidebarClassesProperty(x);
      localStorage.setItem("propertyClasses", x);
    } else {
      let x = [...props.sidebarClassesProperty];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      x[index] = "1";
      props.setsidebarClassesProperty(x);
      localStorage.setItem("propertyClasses", x);
    }

    setChannelsClass(classes);
    props.setpropertyButtons(y);
    localStorage.setItem("propertyButtons", y);
    localStorage.setItem("dashboardChannelClasses", classes);
    hideLoader();
  };
  const checkProperty= (propArray, id)=>{
    return propArray.some((el) =>{
      return el.PropertyId === id;
    });
  }
  const handlePropertySelect = (selectedValue) => {
  
    setSelectedPropertyValues(selectedValue);

    let  arrSelect=[];
    for(let i=0;i<selectedValue.length;i++){
      for(let j=0;j<array2.length;j++){
        if(selectedValue[i].value==array2[j].value){
        let obj = {
          value: `${array2[j].value}`,
          label: `${array2[j].label}`,
          PropertyId: `${array2[j].PropertyId}`,
        };
        arrSelect.push(obj);}
      }
    }
    let ChannelData = { ...onClickData };
    ChannelData.PropertyType = arrSelect;
    setOnclickData(ChannelData);
    console.log(propertyVal);
    console.log(array2);
  };
  const PropertyArray= (e)=>{
    const arr2 = [];
    for (let i = 0; i < props.allData.property.length; i++) {
      let obj = {
        value: `${props.allData.property[i].Name}`,
        label: `${props.allData.property[i].Name}`,
        PropertyId: `${props.allData.property[i]._id}`,
      };
      if (props.allData.property[i].UserId===e.UserId ||props.allData.property[i].UserId===e._id) {
        arr2.push(obj);
      }
    }
    setArray2(arr2);


    const arr1 = [];
    for (let i = 0; i <props.allData.layouts.length; i++) {
      let obj = {
        value: `${window.location.origin}/view/${props.allData.layouts[i]._id}`,
        label: `${props.allData.layouts[i].name} (${window.location.origin}/view/${props.allData.layouts[i]._id})`,
      };
      if (props.allData.layouts[i].checked) {
        {
          arr1.push(obj);
        }
      }
    }
    setArray1(arr1);
  }
  const showLoader=()=>{
    setLoading(true);
  }
  const hideLoader=()=>{
    setLoading(false);
   
  }

  const ruleArr= (e)=>{
    const arr3 = [];
    for (let i = 0; i < props.allData.ruleData.length; i++) {
      let obj = {
        value: `${props.allData.ruleData[i]._id}`,
        label: `${props.allData.ruleData[i].ChannelRulesName}`,
        id: `${props.allData.ruleData[i]._id}`,
        data: props.allData.ruleData[i],
      };
      if (
        props.allData.ruleData[i].UserId==e.UserId ) {
        {
          arr3.push(obj);
        }
      }
    }
    setArray3(arr3);
  }

  const SaveProperty = async () => {
    showLoader();
    // let UserId = `${localStorage.getItem("UserId")}`;
    let data = {
      userId: onClickProperty.userId,
      user: onClickProperty,
    };
    let data1 = data.user.Name.trim()
      .split("  ")
      .filter((word) => word !== "");
    data.user.ChannelRulesName = data1.join(" ");

    if (data.user.Name === "") {
      hideLoader();
      toast.warn("please Enter property  Name", {
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
    if (data.user.PhoneNumber.length<10 || data.user.PhoneNumber.length>10 && data.user.PhoneNumber.length>0) {
      hideLoader();
      toast.warn("please Enter Valid phone Number", {
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
   
    console.log(data);
    const res = await httpService
      .CreateUpdate("SaveProperty", data)
      .catch((err) => {
        console.log(err);
      });
      togglepropertyedit();
      props.getAllPropertyData();
      if(res.data.message == "Successful"){
        toast.success("Property Added Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return;
      }
      
  };

  const UpdateChannelruleForChannel = async (e,ruleDelete)=>{
    e.preventDefault();
    showLoader();
    let data = {
      id: channelIdforRule,
      ruleid: channelRuleExisting,
      ChannelRulesName:channelRuleName,
      ruleForProperty:ruleForProperty,
      ruleDelete:ruleDelete,
    };
    const res = await httpService
      .CreateUpdate("UpdateChannelRuleforChannel", data)
      .catch((err) => {
        console.log(err);
      });
      setchannelIdforRule("");
      setchannelRuleExisting("");
      toggleRuleEditModal();
      props.getAllPropertyData();
      if(res.data.message == "Successful"){
        toast.success("Selected Rule Updated ", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return;
      }
      
  }
  let dlvalue=true;
  const toggleChannel = async (event, index) => {
    event.preventDefault();
    let classes = [...props.sidebarClassesChannel];
    let y = [...props.channelsButtons];
    if (classes[index] === "1") {
      for (let i = 0; i < classes.length; i++) {
        classes[i] = "0";
        y[i] = "fa-plus-circle";
      }
    } else {
      for (let i = 0; i < classes.length; i++) {
        classes[i] = "0";
        y[i] = "fa-plus-circle";
      }
      classes[index] = "1";
      y[index] = "fa-minus-circle";
    }
    props.setsidebarClassesChannel(classes);
    props.setchannelsButtons(y);
    localStorage.setItem("channelsButtons", y);
    localStorage.setItem("channelsClasses", classes);
  };

  const toggleRow = (event, index) => {
    event.preventDefault();
    let classes = [...propertyClasses];
    let y = [...props.userButtons];
    for (let i = 0; i < classes.length; i++) {
      if (i !== index) {
        classes[i] = "none";
        y[i] = "fa-plus-circle";
      }
    }
    y[index] = classes[index] === "none" ? "fa-minus-circle" : "fa-plus-circle";
    classes[index] = classes[index] === "none" ? "" : "none";
    if (classes[index] === "none") {
      let x = [...props.sidebarClassesUser];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      props.setsidebarClassesUser(x);
      localStorage.setItem("userClasses", x);
    } else {
      let x = [...props.sidebarClassesUser];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      x[index] = "1";
      props.setsidebarClassesUser(x);
      localStorage.setItem("userClasses", x);
    }

    let arrowclasses = [...arrowClasses];
    for (let i = 0; i < arrowclasses.length; i++) {
      if (i !== index) {
        arrowclasses[i] = "faPlusCircle";
      }
    }
    arrowclasses[index] =
      classes[index] === "none" ? "faPlusCircle" : "faMinusCircle";

    let userclasses = [...userClasses];
    for (let i = 0; i < userClasses.length; i++) {
      if (i !== index) {
        userClasses[i] = "btn-100 btn btn-secondary";
      }
    }
    userclasses[index] =
      classes[index] === "none"
        ? "btn-100 btn btn-secondary"
        : "btn-100-active btn btn-secondary";
    setUserClasses(userclasses);
    setArrowClasses(arrowclasses);
    setPropertyClasses(classes);
    props.setuserButtons(y);
    localStorage.setItem("userButtons", y);
    localStorage.setItem("dashboardUserClasses", userclasses);
    localStorage.setItem("dashboardArrowClasses", arrowclasses);
    localStorage.setItem("dashboardPropertyClasses", classes);
  };



  const onInputChange1 = (e) => {
    setOnclickData({ ...onClickData, [e.target.name]: e.target.value });
  };
  
  const addClickHandler1 = (e) => {
   setSave3(true);
    setOnclickProperty({
      Name: "",
      Address1: "",
      Address2: "",
      Country: "",
      State: "",
      City: "",
      Zip: "",
      PhoneNumber: "",
      Email: "",
      ContactName: "",
      userId:e._id,
    });
    togglepropertyedit();
    
  };
  const addClickHandler = (e) => {
    setPropertyVal([]);
    setSave(true);
    settoggleChannelShow(true);
    setDefaultVal([]);
    PropertyArray(e);
    setOnclickData({
      channelName: "",
      channelDescription: "",
      channel_category: "",
      channel_language: "",
      programIcon: "",
      videoSource: [],
      program: [],
      RuleType: [],
      PropertyType: [],
      userId:e._id,
    });
    
  };

  const handleStartTime = (e, i) => {
    if (e) {
      let ChannelData = { ...onClickData };
      ChannelData.program[i].startTime = e.substring(0, 5);
      setOnclickData(ChannelData);
      if (ChannelData.program[i].endTime) {
        let startTime = e;
        let startHour =
          parseInt(startTime.split(":")[0]) +
          parseInt(startTime.split(":")[1]) / 60;
        let endTime = ChannelData.program[i].endTime;
        let endHour =
          parseInt(endTime.split(":")[0]) +
          parseInt(endTime.split(":")[1]) / 60;
        if (endHour >= startHour) {
          let duration = Math.round((endHour - startHour) * 60);
          ChannelData.program[i].duration = duration;
        } else {
          let duration = Math.round((endHour - startHour + 24) * 60);
          ChannelData.program[i].duration = duration;
        }
      }
    }
  };
  const onInputChange = (e) => {
    setSelectedValue(e.target.value);
    setOnclickData({ ...onClickData, [e.target.name]: e.target.value });
  };
  var rulearray = ["IpAddress", "MacAddress", "AccountNumber", "Geo_Location"];

  const ruleSelectValues = [
    { value: "IpAddress", label: "IP Address" },
    { value: "MacAddress", label: "Mac Address" },
    { value: "AccountNumber", label: "Account Number" },
    { value: "Geo_Location", label: "Geo Location" },
  ];

  const handleEndTime = (e, i) => {
    if (e) {
      let ChannelData = { ...onClickData };
      ChannelData.program[i].endTime = e.substring(0, 5);
      setOnclickData(ChannelData);
      if (ChannelData.program[i].startTime) {
        let endTime = e;
        let startTime = ChannelData.program[i].startTime;

        let startHour =
          parseInt(startTime.split(":")[0]) +
          parseInt(startTime.split(":")[1]) / 60;
        let endHour =
          parseInt(endTime.split(":")[0]) +
          parseInt(endTime.split(":")[1]) / 60;
        if (endHour >= startHour) {
          let duration = Math.round((endHour - startHour) * 60);
          ChannelData.program[i].duration = duration;
        } else {
          let duration = Math.round((endHour - startHour + 24) * 60);
          ChannelData.program[i].duration = duration;
        }
      }
    }
  };
  const toggleUserDetailsModal = (event, details) => {
    event.preventDefault();
    setDetails(details);
    settoggleUserDetail(!toggleUserDetail);
  };

  const toggleChannelDeleteModal = (event, details) => {
    event.preventDefault();
    settoggleChannelDelete(!toggleChannelDelete);
  };
  const addprogram = async () => {
    let ChannelData = { ...onClickData };
    ChannelData.program.push({
      title: "",
      language: "",
      duration: 0,
      startTime: "00:00",
      endTime: "00:00",
      description: "",
    });
    setOnclickData(ChannelData);
  };
  const handleChangeProgram = (e, i, name) => {
    let ChannelData = { ...onClickData };
    ChannelData.program[i][`${name}`] = e;
    setOnclickData(ChannelData);
  };
  const ischecked = (event) => {
    if (event.target.value == "billboard") {
      let ChannelData = { ...onClickData };
      ChannelData.videoSource[0] = event.target.value;
      ChannelData.videoSource[1] = "";
      setOnclickData(ChannelData);
    }
    if (event.target.value == "url") {
      let ChannelData = { ...onClickData };
      ChannelData.videoSource[0] = event.target.value;
      ChannelData.videoSource[1] = "";
      setOnclickData(ChannelData);
    }
    if (event.target.value == "encoder") {
      let ChannelData = { ...onClickData };
      ChannelData.videoSource[0] = event.target.value;
      ChannelData.videoSource[1] = "";
      setOnclickData(ChannelData);
    }
  };
  const handleC = (e) => {
    let ChannelData = { ...onClickData };
    ChannelData.channel_category = e.target.value;
    setOnclickData(ChannelData);
  };
  const handleC1 = (e) => {
    let ChannelData = { ...onClickData };
    ChannelData.channel_language = e.target.value;
    setOnclickData(ChannelData);
  };
  const DeleteChannelRow = async (event) => {
    showLoader();
    let data = {
      id1:delId,
      propertyId : propDelId
    };
    if(delId){
      const res = await httpService
      .CreateUpdate("DeleteChannelRow", data)
      .catch((err) => {
        console.log(err);
      });
      props.getAllPropertyData();
      settoggleChannelDelete(false);
      if(res.data.message == "Successful"){
        toast.success("Channel Deleted Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return;
      }
    }
  
      setDelId('');
     
      
  };

  const columns = [
    {
      headerName: "Rule Name",
      field: "ChannelRulesName",
     
    },
    {
      headerName: "Account Number",
      field: "RuleType.AccountNumber",
     
    },
    {
      headerName: "Mac-Address",
      field: "RuleType.MacAddress",
     
    },
    {
      headerName: "Ip Address",
      field: "IpAddressMax",
     
    },
    {
      headerName: "Geo-Location",
      field: "RuleType.Geo_Location",
     
    },
    {
      headerName: "Edit ",
      field: "Edit",
      cellRenderer: (params) => {
        let span = document.createElement("div");
         span.className = " deleteUser";
        let img = document.createElement("i");
        img.className = "fa fa-edit";
        
         img.onclick = (event) => addClickHandler4(event, params.data);

        span.appendChild(img);
        return span;
      },
    },
 
    {
      headerName: "Delete",
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        let span = document.createElement("div");
        span.className = "spanname deleteUser";
        let img = document.createElement("i");
        img.className = "fa fa-trash delete-icon";
       
         img.onclick = (event) => DeleteRule(event, params.data);

        span.appendChild(img);
        return span;
      },
     
      maxWidth: 100,
    },
   
  ];


  let baseImage = "";
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const UpdateChannelinfo = async () => {
    showLoader();
    let data = {
      id1: onClickData._id,
      program: onClickData,
    };
    let data1 = data.program.channelName
      .trim()
      .split("  ")
      .filter((word) => word !== "");
    data.program.channelName = data1.join(" ");

    if (!data.program.channelName) {
      hideLoader();
      toast.warn("please Enter Channel Name", {
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
    if(data.program.videoSource[0]=="encoder" || data.program.videoSource[0]=="url"){
      hideLoader();
      if (!validator.isURL(data.program.videoSource[1])) {
        toast.warn("Please enter a  valid Url !", {
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
    }else{
      console.log("error");
    }
    const res = await httpService
      .CreateUpdate("UpdateChannelRow", data)
      .catch((err) => {
        console.log(err);
      });
      props.getAllPropertyData();
      settoggleChannelShow(false);
      if(res.data.message == "Successful"){
        toast.success("Channel Updated ", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return;
      }
   
  };


  const DeleteRule = async (event, e) => {
    showLoader();
    let data = {
      id1: e._id,
    };
    const res = await httpService
      .CreateUpdate("DeleteRule", data)
      .catch((err) => {
        console.log(err);
      });
      props.getAllPropertyData();
      if(res.data.message == "Successful"){
        toast.success("Channel Rule Deleted Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return;
      }
     
  };
  const getFile = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      await getBase64(file)
        .then((result) => {
          baseImage = result;
          let data = { ...onClickData };
          data.programIcon = baseImage;
          setOnclickData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const DeleteProperty = async (e) => {
   
    let data = {
      id1: e,
    };
    let r = window.confirm("Are you sure you want to delete this property!");
    if (r === false) {
      return;
    }
    showLoader();
    const res = await httpService
      .CreateUpdate("DeleteProperty", data)
      .catch((err) => {
        console.log(err);
      });
      if(res.data.message == "Successful"){
        props.getAllPropertyData();
        toast.success("Property Deleted Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      hideLoader();
  };
  const IPformatFun=(e)=>{
    let ChannelData = { ...onClickRuleData };
     ChannelData.RuleType["IpAddress"] = {};
    { IPFormatVal? ChannelData.RuleType["IpAddress"][e.target.value] =IPFormatVal:  ChannelData.RuleType["IpAddress"][e.target.value]="";}      // setOnclickRuleData(ChannelData); 
    setIPFormatData(e.target.value);
     setIPFormatV(e.target.value);
}
const setIPvalue=(e,IPFormatData)=>{
  let ChannelData = { ...onClickRuleData };
   ChannelData.RuleType["IpAddress"] = {};
   ChannelData.RuleType["IpAddress"][IPFormatData] = e.target.value;   
  setOnclickRuleData(ChannelData); 
  setIPFormatVal(e.target.value)
}
  const handleShow3 = (e, item) => {
    setSave3(false);
    setOnclickProperty(item);
    togglepropertyedit();
  };
  const onInputChange3 = (e) => {
    setOnclickProperty({ ...onClickProperty, [e.target.name]: e.target.value });
  };

  // const UpdateChannelrule = async () => {
  //   let data = {
  //     id: onClickData._id,
  //     user: onClickData,
  //   };
  //   let data1 = data.user.ChannelRulesName.trim()
  //     .split("  ")
  //     .filter((word) => word !== "");
  //   data.user.ChannelRulesName = data1.join(" ");

  //   if (data.user.ChannelRulesName === "") {
  //     toast.warn("please Enter Channel Rules Name", {
  //       position: "bottom-left",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     return;
  //   }
  //   const res = await httpService
  //     .CreateUpdate("getruleapi", data)
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   if(res.data.message == "Channel rule name already exists"){
  //     toast.warn("Channel rule name already exists", {
  //       position: "bottom-left",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     return;
  //   }else{
  //     toast.success("Channel rule Updated", {
  //       position: "bottom-left",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  //   setSelectedRuleValues([]);
  //   setDefaultVal([]);
  // }
  
  ;

  const addClickHandler2 = (e) => {
    
    setDefaultVal([]);
    setIPFormatDataValue([]);
    setIPFormatV([]);
    setIPFormatVal([])
    setOnclickRuleData({
      ChannelRulesName:"",
      RuleType:{},
      UserId: e._id
    });
    setSave1(true);
    toggleRuleEdit();
};
 const addClickHandler4=(e,data)=>{

  // console.log(props.allData);
  //  setOnclickRuleData({ ...onClickRuleData, [onClickRuleData.channelRuleName]:[data.ChannelRulesName], [onClickRuleData.RuleType]:[data.RuleType] });
  // let obj = {
  //   channelRuleName: data.channelRulesName,
  //   RuleType: data.RuleType
  // }
  // setOnclickRuleData(obj);
  // onClickRuleData.channelRuleName=data.ChannelRulesName;
  // onClickRuleData.RuleType=data.RuleType;

  if(data.RuleType.IpAddress){
    let IPValidValue=Object.entries(data.RuleType.IpAddress);
  setIPFormatDataValue(IPValidValue);
  setIPFormatV(IPValidValue[0][0]);
  setIPFormatVal(IPValidValue[0][1])
}else {
  setIPFormatDataValue([]);
  setIPFormatV([]);
  setIPFormatVal([])
}

  if (data.RuleType) {
    let selectedKeys = Object.keys(data.RuleType);
    let arr = [];
    for (let i = 0; i < selectedKeys.length; i++) {
      let obj = {
        value: selectedKeys[i],
        label: selectedKeys[i],
      };

      let ChannelData = { ...onClickRuleData };
      ChannelData[selectedKeys[i]] = data.RuleType[selectedKeys[i]];
      setOnclickRuleData(ChannelData);
      arr.push(obj);
    }
    setSelectedRuleValues(arr);
    setDefaultVal(arr);
  }


  
   setOnclickRuleData(data);
   if (!data.RuleType) {
    let ChannelData = { ...data };
    ChannelData["RuleType"] = {};
    setOnclickRuleData(ChannelData);
  }
  toggleRuleEdit();
 }


const UpdateChannelrule = async () => {
  showLoader();
  // let UserId = `${localStorage.getItem("UserId")}`;
  let data = {
    userId: onClickRuleData.userId,
    user: onClickRuleData,
  };
  let data1 = data.user.ChannelRulesName.trim()
    .split("  ")
    .filter((word) => word !== "");
  data.user.ChannelRulesName = data1.join(" ");

  if (data.user.ChannelRulesName === "") {
    hideLoader();
    toast.warn("please Enter Channel Rules Name", {
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
  if(onClickRuleData.RuleType && onClickRuleData.RuleType.Geo_Location && onClickRuleData.RuleType.Geo_Location.trim().split(" ").length != 2){
    hideLoader();
    toast.warn("Enter Geo Location in proper format", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }else if(onClickRuleData.RuleType && onClickRuleData.RuleType.Geo_Location && onClickRuleData.RuleType.Geo_Location.trim().split(" ").length == 2){
    onClickRuleData.RuleType["Geo_Location_Original"] = {
      longitude_Maxm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[0]) + parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
      longitude_Minm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[0]) - parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
      latitude_Minm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[1]) - parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
      latitude_Maxm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[1]) + parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
    }
  }
  const res = await httpService
    .CreateUpdate("getruleapi", data)
    .catch((err) => {
      console.log(err);
    });
  if(res.data.message == "Channel rule name already exists"){
    hideLoader();
    toast.warn("Channel rule name already exists", {
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
    toast.success("Channel rule Updated", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    hideLoader();
  }
  
  toggleRuleEdit();
  props.getAllPropertyData();

  setSelectedRuleValues([]);
  setDefaultVal([]);
  setIPFormatV([]);
  setIPFormatVal([]);
};
  const saveProgram = async () => {
    showLoader();
    // let UserId = `${localStorage.getItem("UserId")}`;
    let data = {
      data: onClickData,
      UserId: onClickData.userId,
    };

    let data1 = data.data.channelName
      .trim()
      .split("  ")
      .filter((word) => word !== "");
    data.data.channelName = data1.join(" ");

    if (!data.data.channelName) {
      hideLoader();
      toast.warn("please Enter Channel Name", {
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
    if(data.data.videoSource[0]=="encoder" || data.data.videoSource[0]=="url"){
      hideLoader();
      if (!validator.isURL(data.data.videoSource[1])) {
        toast.warn("Please enter a  valid Url !", {
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
    }else{
      console.log("error");
    }
    const returndata = await httpService
      .CreateUpdate("getInfoapi", data)
      .catch((err) => {
        console.log(err);
      });

      settoggleChannelShow(false);
       props.getAllPropertyData();
       if(returndata.data.message == "Successful"){
        toast.success("Channel Added Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
        return;
      }
    
    
  };
  const Updateproperty = async () => {
    showLoader();
    let data = {
      id: onClickProperty._id,
      user: onClickProperty,
    };
    let data1 = data.user.Name.trim()
      .split("  ")
      .filter((word) => word !== "");
    data.user.Name = data1.join(" ");
    if (data.user.Name === "") {
      hideLoader();
      toast.warn("please Enter Property Name", {
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

    if (data.user.PhoneNumber.length<10|| data.user.PhoneNumber.length>10) {
      hideLoader();
      toast.warn("please Enter Valid phone Number", {
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
    const res = await httpService
      .CreateUpdate("UpdateProperty", data)
      .catch((err) => {
        console.log(err);
      });
    
    props.getAllPropertyData();
    togglepropertyedit();
    if(res.data.message == "Successful"){
      toast.success("Property Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      hideLoader();
      return;
    }
   
  };
  const handleRuleSelect = (selectedValue) => {
    setSelectedRuleValues(selectedValue);
    let dataArrr = [];
    for (let j = 0; j < selectedValue.length; j++) {
      dataArrr.push(selectedValue[j]);
    }
    for (let i = 0; i < 4; i++) {
      if (onClickRuleData.RuleType[rulearray[i]]) {
        let flag = true;
        for (let j = 0; j < selectedValue.length; j++) {
          if (selectedValue[j].value === rulearray[i]) {
            flag = false;
          }
          // dataArrr.push(selectedValue[j]);
        }
        if (flag) {
          delete onClickRuleData.RuleType[rulearray[i]];
        }
      }
    }
    setDefaultVal(dataArrr);
  };

  const saveChannelRule = async () => {
    showLoader();
    let UserId = onClickRuleData.UserId;

    let data = {
      userId: UserId,
      user: onClickRuleData,
    };
    console.log(data);
    if(onClickRuleData.RuleType && onClickRuleData.RuleType.Geo_Location && onClickRuleData.RuleType.Geo_Location.trim().split(" ").length != 2){
      hideLoader();
      toast.warn("Enter Geo Location in proper format", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }else if(onClickRuleData.RuleType && onClickRuleData.RuleType.Geo_Location && onClickRuleData.RuleType.Geo_Location.trim().split(" ").length == 2){
      onClickRuleData.RuleType["Geo_Location_Original"] = {
        longitude_Maxm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[0]) + parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
        longitude_Minm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[0]) - parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
        latitude_Minm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[1]) - parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
        latitude_Maxm : parseFloat(onClickRuleData.RuleType.Geo_Location.split(" ")[1]) + parseFloat(onClickRuleData.RuleType.Deviation ? parseFloat(onClickRuleData.RuleType.Deviation)*0.0166667 : 0.0333333),
      }
    }
    const res = await httpService
      .CreateUpdate("SaveChannelRule", data)
      .catch((err) => {
        console.log(err);
      });
      if(res.data.message == "Channel rule name already exists"){
        hideLoader();
        toast.warn("Channel rule name already exists", {
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
        toast.success("Channel rule Saved", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hideLoader();
      }
      toggleRuleEdit();
      setSave1(false);
      props.getAllPropertyData();
   
      setSelectedRuleValues([]);
      setDefaultVal([]);
      setIPFormatV([]);
      setIPFormatVal([]);
  };

  const onInputRuleChange = (e) => {
    setSelectedValue(e.target.value);
    setOnclickRuleData({ ...onClickRuleData, [e.target.name]: e.target.value });
  };
  const handlec2 = (e) => {
    if (e.target.name == "IpAddress") {
      let ChannelData = { ...onClickRuleData };
      ChannelData.RuleType["IpAddress"] = e.target.value;
      setOnclickRuleData(ChannelData);
    }
    if (e.target.name == "MacAddress") {
      let ChannelData = { ...onClickRuleData };
      ChannelData.RuleType["MacAddress"] = e.target.value;
      setOnclickRuleData(ChannelData);
    }
    if (e.target.name == "AccountNumber") {
      let ChannelData = { ...onClickRuleData };
      ChannelData.RuleType["AccountNumber"] = e.target.value;
      setOnclickRuleData(ChannelData);
    }
    if (e.target.name == "Geo_Location") {
      let ChannelData = { ...onClickRuleData };
      ChannelData.RuleType["Geo_Location"] = e.target.value;
      setOnclickRuleData(ChannelData);
    }
    if (e.target.name == "Deviation") {
      let ChannelData = { ...onClickRuleData };
      ChannelData.RuleType["Deviation"] = e.target.value;
      setOnclickRuleData(ChannelData);
    }
  };

  return (
    <div className={"pad-15 mainDiv"}>
     {loading ? <Loader/> : null}
      <div className="boxplate " style={{ margin: "15px" }}>
        <div className="boxplate-heading" style={{ fontSize: "large" }}>
          Super Admin
        </div>
        <div className="pad-new">
          {props.allData &&
            Object.keys(props.allData).length > 0 &&
            props.allData.users.map((value, index) => {
              return (
                <div hidden={value.type == "admin" || value.customerId=="Admin"}>    
                  <div class="col-sm-12">
                    <div className="posrel">
                      <button
                        key={index}
                        className={userClasses[index]}
                        onClick = {()=>{}}
                        style={{display:"flex"}}
                      >
                        <div onClick={(event) => toggleRow(event, index)} style={{flexGrow:"1"}}>
                          {value.customerId.length < 30
                            ? value.customerId
                            : value.customerId.substring(0, 30) + "...."}
                        </div>
                        <div
                          className="text-end"
                          style={{ position: "relative", float: "right" }}
                        >
                          <div
                            style={{ display: "inline", marginRight: "15px" }}
                          >
                            <button
                              className="btn btn-sm buttonAdmin"
                              onClick={(val) => {
                                addClickHandler1(value);
                              }}
                            >
                              Add Property
                            </button>
                            <button
                              className="btn btn-sm buttonAdmin ms-2"
                              onClick={(val) => {addClickHandler(value)}}
                            >
                              Add Channel
                            </button>
                            <button
                              className="btn btn-sm buttonAdmin ms-2"
                              onClick={() => {
                                if(CHECK_KEYLOK){
                                  if(rulecount <= value.count) return
                                  addClickHandler2(value)
                                }else{
                                  addClickHandler2(value)
                                }
                              }}
                              hidden={()=>{
                                if(CHECK_KEYLOK){
                                  return  rulecount <= value.count
                                } else
                                return false
                              }}
                             
                            >
                              Add Rule
                            </button>
                          </div>
                          <div style={{ display: "inline" }} onClick={(event) => toggleRow(event, index)}>
                            <FontAwesomeIcon
                              style={{ display: "inline" }}
                              className="faviconright font-centered"
                              icon={
                                arrowClasses[index] === "faPlusCircle"
                                  ? faPlusCircle
                                  : faMinusCircle
                              }
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                    <div
                      key={"property" + index}
                      style={{ display: propertyClasses[index] }}
                    >
                      <Card className="card-this" style={{ padding: "0 20px" }}>
                        <CardBody>
                          {/*<div className="d-flex align-items-center justify-content-between mb-4">
                              <button
                                className="btn btn-view-region"
                                onClick={(event) =>
                                  toggleUserDetailsModal(event, value)
                                }
                              >
                                View User
                              </button>
                              </div>*/}
                          <div className="table-responsive border">       
                            <Table className="table-inner">
                              <thead className="bg-header">        
                                <tr>
                                  <th>Property</th>
                                  <th>Country</th>
                                  <th>ZIP</th>
                                  <th>Contact No.</th>
                                  <th className="color-red">Email</th>
                                  <th>Edit</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <div></div>
                              <tbody className="font12">
                                {props.allData.property.map((val, i) => {
                                  if (val.UserId === value._id) {
                                    return (
                                      <> 
                                        <tr
                                          key={i.toString() + index.toString()}
                                          // onClick={(event) =>
                                          //   loadSidebar(
                                          //     event,
                                          //     val.UserId,
                                          //     val._id,
                                          //     i
                                          //   )
                                          // }
                                          className="pointer"
                                        >                         
                                          <td onClick={(event) =>
                                            loadSidebar(
                                              event,
                                              val.UserId,
                                              val._id,
                                              i
                                            )
                                          }>{val.Name}</td>
                                          <td onClick={(event) =>
                                            loadSidebar(
                                              event,
                                              val.UserId,
                                              val._id,
                                              i
                                            )
                                          }>
                                            {val.Country ? val.Country : ""}
                                          </td>
                                          <td onClick={(event) =>
                                            loadSidebar(
                                              event,
                                              val.UserId,
                                              val._id,
                                              i
                                            )
                                          }>
                                            {val["Zip"] ? val["Zip"] : ""}
                                          </td>
                                          <td onClick={(event) =>
                                            loadSidebar(
                                              event,
                                              val.UserId,
                                              val._id,
                                              i
                                            )
                                          }>
                                            {val.PhoneNumber
                                              ? val.PhoneNumber
                                              : ""}
                                          </td>
                                          <td onClick={(event) =>
                                            loadSidebar(
                                              event,
                                              val.UserId,
                                              val._id,
                                              i
                                            )
                                          }>{val.Email ? val.Email : ""}</td>
                                          <td>
                                            <button
                                              className="btn btn-sm btn-secondary"
                                              style={{
                                                transform: "scale(0.8)",
                                              }}
                                              onClick={(event) =>
                                                handleShow3(event, val)
                                              }
                                            >
                                              <i className="edit icon me-0"></i>
                                            </button>
                                          </td>
                                          <td>
                                            <button
                                              style={{
                                                transform: "scale(0.8)",
                                              }}
                                              className="btn btn-sm btn-danger"
                                              onClick={(event) => {
                                                DeleteProperty(val._id);
                                                // setPropId(val._id);
                                              }}
                                            >
                                              <i className="trash icon me-0"></i>
                                            </button>{" "}
                                          </td>
                                        </tr>  
                                        <tr
                                          className={
                                            channelsClass[i] + " cluster-view"
                                          }
                                        >
                                          <td
                                            colSpan="9"
                                            className="form-boxtable-pad-15"
                                          >
                                            <div className="table-responsive border">
                                              <Table className="cluster-table">
                                                <thead className="bg-header">
                                                  <tr>
                                                    <th>Channel</th>
                                                    <th>Category</th>
                                                    <th>Language</th>
                                                    <th>Channel Description</th>
                                                    <th>Rules</th>
                                                    <th>Channel Statistics</th>
                                                    <th>Delete</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {props.allData.channels.map(
                                                    (v, idx) => {
                                                      if (
                                                        v.UserId ===
                                                          val.UserId &&
                                                        checkProperty(
                                                          v.PropertyType,
                                                          val._id
                                                        )
                                                      ) {
                                                        return (
                                                          <tr
                                                            onClick={(event) =>
                                                              toggleChannel(
                                                                event,
                                                                idx
                                                              )
                                                            }
                                                          >
                                                            <td
                                                              style={{
                                                                color: "blue",
                                                              }}
                                                              onClick={() => {
                                                                channelUpdatefun(
                                                                  v
                                                                );
                                                              }}
                                                            >
                                                              {v.channelName}
                                                            </td>
                                                            <td>
                                                              {v.channel_category
                                                                ? v.channel_category
                                                                : ""}
                                                            </td>
                                                            <td>
                                                              {v.channel_language
                                                                ? v.channel_language
                                                                : ""}
                                                            </td>
                                                            <td>
                                                              {v.channelDescription
                                                                ? v
                                                                    .channelDescription
                                                                    .length > 30
                                                                  ? v.channelDescription.substring(
                                                                      0,
                                                                      30
                                                                    ) + "..."
                                                                  : v.channelDescription
                                                                : ""}
                                                            </td>
                                                            <td
                                                              style={{
                                                                color: "blue",
                                                              }}
                                                              onClick={() => {
                                                                ruleUpdatefun(
                                                                  v,val
                                                                );
                                                              }}
                                                            >
                                                              {/* {v.ChannelRulesName
                                                                ? v.ChannelRulesName
                                                                : "Add rules"} */}

                                                                {
                                        v.PropertyType.find(obj => val._id === obj.PropertyId).ChannelRulesName
                                        ?v.PropertyType.find(obj => val._id === obj.PropertyId).ChannelRulesName
                                        :"Add Rule"
                                                                      }
                                                            </td>
                                                            <td onClick={(event) => {
                                                              toggleChannelStat(event)
                                                              setdataStats(v)
                                                            }}
                                    >
                                      Channel Statistics
                                                            </td>
                                                             <td>
                                                              <button
                                                                style={{
                                                                  transform:
                                                                    "scale(0.8)"
                                                                }}
                                                                className="btn btn-sm btn-danger"
                                                                onClick={(
                                                                  event
                                                                ) => {
                                                                  settoggleChannelDelete(
                                                                    true
                                                                  );
                                                                  setDelId(
                                                                    v._id
                                                                  );
                                                                  setpropDelId(
                                                                    val._id
                                                                  );
                                                                }}
                                                              >
                                                                <i className="trash icon me-0"></i>
                                                              </button>{" "}
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    }
                                                  )}                
                                                </tbody>                 
                                              </Table>                                 
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  } else return <div></div>;
                                })}
                              </tbody>
                 </Table>
                          </div>
                          <div
                            className="form-boxdiv"
                            style={{ marginTop: "15px" }}
                          >
                            <div className="form-boxtopline5">Channel Rule</div>
                            <div className="form-boxtopcont user-formAdmin">
                              <div
                                className="ag-theme-alpine"
                                style={{ height: "calc(50vh - 150px)" }}
                              >
                                <AgGridReact
                                  pagination={true}
                                  paginationPageSize={5}
                                  columnDefs={columns}
                                  defaultColDef={defaultColDef}
                                  enableBrowserTooltips={true}
                                  tooltipShowDelay={{ tooltipShowDelay: 0 }}
                                  rowData={props.allData.ruleData.filter(
                                    (obj) => {
                                      return obj.UserId == value._id;
                                    }
                                  )}
                                  gridOptions={gridOptions}
                                  gridReady={onGridReady}
                                  // onCellValueChanged={function(params){
                                  //   return params.api.refreshCells({
                                  //     force:true
                                  //   })
                                  // }}
                                ></AgGridReact>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Modal
        isOpen={toggleUserDetail}
        toggle={() => settoggleUserDetail(!toggleUserDetail)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ borderRadius: "5px" }}
      >
        <ModalHeader
          toggle={() => settoggleUserDetail(!toggleUserDetail)}
          id="contained-modal-title-vcenter"
        >
          User Detail
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              padding: "15px",
              borderLeft: "8px solid #002c42cb",
              borderRadius: "10px",
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
              borderRight: "1px solid gray",
            }}
          >
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="form-check-label font-weight-600">
                    User :{" "}
                  </label>
                  <span> {"cehjecdhj"}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="form-check-label font-weight-600">
                    Phone No.{" "}
                  </label>
                  <span> {"ghcdvcd"}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="form-check-label font-weight-600">
                    User Details :{" "}
                  </label>
                  <span
                    // onClick={() => setEmailToggle(!emailToggle)}
                    className="pointer link"
                  >
                    {"hjcj"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal 
        isOpen={show2}
        toggle={toggleChannelStat}
        size="xl"
        centered={true}
      >
        <ModalHeader   className="model-title" size="xl"  toggle={toggleChannelStat}>Channel Statistics</ModalHeader>
        <ModalBody  className="model-content"  >
        <div className="ui main">
          {
            Object.keys(dataStats).length > 0 ? <ChannelStats e = {dataStats}/> :<div></div>
          }
        </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={toggleChannelDelete}
        toggle={toggleDeleteChannel}
        size="sm"
        centered={true}
      >
        <ModalHeader  toggle={toggleDeleteChannel}>Confirmation</ModalHeader>
        <ModalBody>
          <div>
            <div style={{ marginBottom: "20px" }}>
              {" "}
              <b> Are you sure you want to Delete? </b>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="danger"
                style={{ marginRight: "10px" }}
                onClick={()=>{
                  DeleteChannelRow();
                }}
              >
                Delete
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  settoggleChannelDelete(false);
                  setDelId('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={toggleChannelShow}
        toggle={toggleShowChannel}
         size="lg"
        centered={true}
      >
        <ModalHeader  toggle={toggleShowChannel}>Edit Channel</ModalHeader>
        <ModalBody>
        <div className="ui main">
          <form className="ui form row">
            <div className="field">
            <label style={{ fontSize: "14px" }}>Property</label>
            <Select
                isMulti
                name="Property"
                options={array2}
                 defaultValue={propertyVal}
                 onChange={handlePropertySelect}
                className="basic-multi-select"
                classNamePrefix="select"
              />
             </div>
             <div className="field">
              <label style={{ fontSize: "14px" }}>Channel Name</label>
              <input
                type="text"
                name="channelName"
                placeholder="Channel Name"
                onChange={(e) => onInputChange1(e)}
                value={onClickData.channelName}
              />
            </div>
            <div className="field col-6" style={{ paddingRight: "3px" }}>
              <label>Channel Language</label>
              <select
                className="form-control"
                 value={onClickData.channel_language}
                name="channel_language"
                 onChange={(event) => handleC1(event)}
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="French">French</option>
                <option value="Dutch">Dutch</option>
              </select>
            </div>
            <div className="field col-6" style={{ paddingLeft: "3px" }}>
              <label>Channel Category</label>
              <select
                className="form-control"
                 value={onClickData.channel_category}
                name="channel_category"
                 onChange={(event) => handleC(event)}
              >
                <option value="">Select Category</option>
                <option hidden={hide} value="Bulletin Board">Bulletin Board</option>
                <option value="Live">Live</option>
                <option value="Security">Security</option>
                <option value="VOD">VOD</option>
                <option value="Schedules">Schedules</option>
                <option value="Activities">Activities</option>
              </select>
            </div>
            <div className="field">
              <label style={{ fontSize: "14px" }}>Channel Description </label>
              <textarea
                type="text"
                name="channelDescription"
                placeholder="Channel Description"
                onChange={(e) => onInputChange1(e)}
                value={onClickData.channelDescription}
              />
            </div>
         <div className="field col-6">
              <label style={{ fontSize: "14px" }}>Icon</label>

              <div class="input-group row">
                <div classNmae="input-group-prepend"></div>
                <div className="custom-file col-8">

                    <input type="file" id="myfile" name="myfile"
                     onChange={(e) => getFile(e)}

                    ></input>


                </div>
                <div className="col-4">
                  {onClickData.programIcon != "" ? (
                    <img
                      src={onClickData.programIcon}
                      style={{ height: "auto", width: "60%" }}
                      alt="image"
                    />
                  ) : (
                    <img
                       src={iconImage}
                      style={{ height: "auto", width: "60%" }}
                      alt="image"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="field col-6">
              <label style={{ fontSize: "14px" }}>Video Source</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="1"
                  value="billboard"
                  name="videoSource"
                  onChange={(event) => ischecked(event)}
                  checked={
                    onClickData.videoSource &&
                    onClickData.videoSource[0] == "billboard"
                      ? true
                      : false
                  }
                />
                <label className="form-check-label">Billboard</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="2"
                  value="encoder"
                  name="videoSource"
                  onChange={(e) => ischecked(e)}
                  checked={
                    onClickData.videoSource &&
                    onClickData.videoSource[0] == "encoder"
                      ? true
                      : false
                  }
                />
                <label className="form-check-label">Encoder</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="3"
                  value="url"
                  name="videoSource"
                  onChange={(e) => ischecked(e)}
                  checked={
                    onClickData.videoSource &&
                    onClickData.videoSource[0] == "url"
                      ? true
                      : false
                  }
                />
                <label
                  className="form-check-label"
                  style={{ paddingBottom: "15px" }}
                >
                  URL
                </label>
              </div>
              {onClickData.videoSource &&
              onClickData.videoSource[0] == "billboard" ? (
                <div>
                  <Select
                     options={array1}
                    placeholder="Choose Layout"
                    defaultValue={{label:onClickData.videoSource[1] , value: onClickData.videoSource[0]}}
                    onChange={(event) => {
                      let ChannelData = { ...onClickData };
                      ChannelData.videoSource[1] = event.value;
                      setOnclickData(ChannelData);
                    }}
                  />
                </div>
              ) : (
                " "
              )}
              {onClickData.videoSource &&
              onClickData.videoSource[0] == "encoder" ? (
                <div>
                  <input
                    type="text"
                    name="encoder"
                    value={onClickData.videoSource[1]}
                    placeholder="Encoder"
                    onChange={(event) => {
                      let ChannelData = { ...onClickData };
                      ChannelData.videoSource[1] = event.target.value;
                      setOnclickData(ChannelData);
                    }}
                  ></input>
                </div>
              ) : (
                " "
              )}
              {onClickData.videoSource &&
              onClickData.videoSource[0] == "url" ? (
                <div className="dropdown">
                  <input
                    type="text"
                    placeholder="Url"
                    name="url"
                    value={onClickData.videoSource[1]}
                    onChange={(event) => {
                      let ChannelData = { ...onClickData };
                      ChannelData.videoSource[1] = event.target.value;
                      setOnclickData(ChannelData);
                    }}
                  ></input>
                </div>
              ) : (
                " "
              )}
            </div>
            <div
              hidden={
                onClickData.videoSource &&
                onClickData.videoSource[0] == "billboard"
              }
              className="row"
              style={{ marginTop: "25px", marginBottom: "10px" }}
            >
              <div className="col-10 program-header">
                <b>Programs</b>
              </div>
              <div
                className="col-2 text-right"
                onClick={() => {
                   addprogram();
                }}
                style={{
                  color: "#337ab7",
                  fontSize: "large",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  cursor: "pointer",       
                }}
              >
                Add{" "}
                <FontAwesomeIcon
                  className="icon"
                  icon={faPlusSquare}
                  style={{ paddingleft: "5px" }}
                />
              </div>
            
              {onClickData &&
                onClickData.program &&
                onClickData.program.map((elem, i) => {
                  return (        
                    <div
                      className="row"
                      style={{ backgroundColor: "#f2f2f2", padding: "15px" }}
                    >
                         <div className="col-4" style={{ padding: "5px"  }}>
                        <label>
                          <b>Title</b>
                        </label>
                        <input
                          name={`title_${i}`}
                          className="form-control"
                          placeholder="Title of Program"
                          onChange={(event) =>
                            handleChangeProgram(event.target.value, i, "title")
                          }
                          value={elem.title}
                        />
                      </div>

                      <div className="col-4" style={{ padding: "5px" }}>
                        <label>
                          <b>Language</b>
                        </label>
                        <select
                          className="form-control"
                          value={elem.language}
                          name={`programLanguage_${i}`}
                          onChange={(event) =>
                            handleChangeProgram(
                              event.target.value,
                              i,
                              "language"
                            )
                          }
                        >
                          <option value="">Select Language</option>
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="Portuguese">Portuguese</option>
                          <option value="French">French</option>
                          <option value="Dutch">Dutch</option>
                        </select>
                      </div>

                      <div className="col-4" style={{ padding: "5px" }}>
                        <label>
                          <b>Duration</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name={`duration_${i}`}
                          placeholder="Duration"
                          value={elem.duration}
                          readOnly
                        />
                      </div>

                      <div className="col-2" style={{ padding: "5px" }}>
                        <label>
                          <b>Starts At</b>
                        </label>
                        <input
                          type="time"
                          format="HH:mm"
                          name="ProgramSchedule"
                          onChange={(event) =>
                            handleStartTime(event.target.value, i)
                          }
                          value={elem.startTime}
                        />
                      </div>

                      <div className="col-2" style={{ padding: "5px" }}>
                        <label>
                          <b>Ends At</b>
                        </label>
                        <input
                          type="time"
                          format="HH:mm"
                          name="ProgramSchedule"
                          onChange={(event) =>
                            handleEndTime(event.target.value, i)
                          }
                          value={elem.endTime}
                        />
                      </div>

                      <div className="col-8" style={{ padding: "5px" }}>
                        <label>
                          <b>Description</b>
                        </label>
                        <input
                          name={`programDescription_${i}`}
                          placeholder="Description"
                          onChange={(event) =>
                            handleChangeProgram(
                              event.target.value,
                              i,
                              "description"
                            )
                          }
                          value={elem.description}
                        />
                      </div>       
                    </div>    
                  );
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "end"}}>
                    <Button
                color="success"
                style={{ marginRight: "10px" }}
                onClick={()=>{
                  if (save) {
                saveProgram();
                setSelectedRuleValues([]);
                setPropertyVal([]);
              } else {
                UpdateChannelinfo();
                 setSelectedRuleValues([]);
                setPropertyVal([]);
              }
                }}
              >
               {save ? "save" : "update"}
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  settoggleChannelShow(false);}}
              >
                Cancel
              </Button>
            </div>
            </form>
         </div>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={propertyeditmodal}
        toggle={togglepropertyedit}
        // size="sm"
        centered={true}
      >
        <ModalHeader  toggle={togglepropertyedit}>{"Edit Property" }</ModalHeader>
        <ModalBody>
          <div className="ui main">
          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Name"
                onChange={(e) => onInputChange3(e)}
                value={onClickProperty.Name}
              />
            </div>
            <div className="field">
              <label>Address1</label>
              <input
                type="text"
                name="Address1"
                placeholder="Address1"
                onChange={(e) => onInputChange3(e)}
                value={onClickProperty.Address1}
              />
            </div>
            <div className="field">
              <label>Address2</label>
              <input
                type="text"
                name="Address2"
                placeholder="Address2"
                onChange={(e) => onInputChange3(e)}
                value={onClickProperty.Address2}
              />
            </div>
            <div className="row">
              <div className="field col-6" style={{ paddingRight: "3px" }}>
                <label>Country</label>
                <input
                  type="text"
                  name="Country"
                  placeholder="Country"
                  onChange={(e) => onInputChange3(e)}
                  value={onClickProperty.Country}
                />
              </div>
              <div className="field col-6" style={{ paddingLeft: "3px" }}>
                <label>State</label>
                <input
                  type="text"
                  name="State"
                  placeholder="State"
                  onChange={(e) => onInputChange3(e)}
                  value={onClickProperty.State}
                />
              </div>
              <div className="field col-6" style={{ paddingRight: "3px" }}>
                <label>City</label>
                <input
                  type="text"
                  name="City"
                  placeholder="City"
                  onChange={(e) => onInputChange3(e)}
                  value={onClickProperty.City}
                />
              </div>
              <div className="field col-6" style={{ paddingLeft: "3px" }}>
                <label>Zip</label>
                <input
                  type="text"
                  name="Zip"
                  placeholder="Zip"
                  onChange={(e) => onInputChange3(e)}
                  value={onClickProperty.Zip}
                />
              </div>
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="PhoneNumber"
                placeholder="Phone Number"
                onChange={(e) => onInputChange3(e)}
                value={onClickProperty.PhoneNumber}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="Email"
                placeholder="Email"
                onChange={(e) => onInputChange3(e)}
                value={onClickProperty.Email}
              />
            </div>
            <div className="field">
              <label>Contact Name</label>
              <input
                type="text"
                name="ContactName"
                placeholder="Contact Name"
                onChange={(e) => onInputChange3(e)}
                value={onClickProperty.ContactName}
              />
            </div>
            <div className="text-end col-12">
            <Button
            color="success"
            style={{marginRight:"5px"}}
            onClick={() => {
              // UpdateChannelrule();
              if (save3) {
                SaveProperty();
              } else {
                Updateproperty();
              }
            }}
          >
            {save3 ? "save" : "Update"}
          </Button>
          <Button
            color="danger"
            onClick={() => {
              togglepropertyedit();
              setOnclickProperty({});
             
            }}
          >
            Cancel
          </Button>
          </div>
          </form>
        </div>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={ruleEditmodal}
        toggle={toggleRuleEdit}
        // size="sm"
        centered={true}
      >
        <ModalHeader  toggle={toggleRuleEdit}>{"Edit Rules" }</ModalHeader>
        <ModalBody>
        <div className="ui main">
          <form className="ui form">
            <div className="field">
              <label>Channel Rules Name</label>
              <input
                type="text"
                name="ChannelRulesName"
                placeholder="Channel Rules Name "
                onChange={(e) => onInputRuleChange(e)}
                value={onClickRuleData.ChannelRulesName}
              />
            </div>

            <div className="field" style={{ padding: "10px", border:"1px solid #53535369" }}>
              <label>Rule Type</label>
              <Select
                isMulti
                name="colors"
                options={ruleSelectValues}
                value={defaultVal}
                onChange={handleRuleSelect}
                className="basic-multi-select"
                classNamePrefix="select"
              />
             {onClickRuleData.RuleType && selectedRuleValues.length > 0
                ? selectedRuleValues.map((elm, index) => {
                    return (
                      <>
                        {" "}
                        {
                          elm.value != "Deviation" && elm.value != "Geo_Location_Original" ? <div> 
                        <label
                          style={{ marginRight: "3px", fontWeight: "bold" }}
                        >
                          {elm.value}
                        </label>
                        {elm.value=="IpAddress" ? 
                        <div className="row">
                        <div className="col-4">
                        <select
                        className="form-control"
                         name="IpFormat"
                        onChange={(event) => IPformatFun(event)}
                        value={IPFormatV?IPFormatV:""}
                       > 
                         <option >Select IP Format</option>
                         <option value="SingleIpAddress">single IP address</option>
                         <option value="IpAddressRange"> Ip address range</option>
                         <option value="IpAddressAndSubnet">ip address and subnet </option>
                       </select>
                       </div>
                       {onClickRuleData.RuleType && onClickRuleData.RuleType.IpAddress?
                        <div className="col-8">
                         <input
                           type="text"
                           className=""
                           style={{ marginLeft:"5px", paddingRight:"5px"  }}
                            // placeholder={IPFormatV}
                           onChange={(event) => {
                             setIPvalue(event,IPFormatV);
                           }}
                            value={IPFormatVal?IPFormatVal:""}
                         ></input> </div>:""
                       }
                        </div>
                        : <input
                           type="text"
                           style={{ marginTop: "3px" }}
                           name={elm.value}
                           value={
                             onClickRuleData.RuleType
                               ? onClickRuleData.RuleType[elm.value]
                               : onClickRuleData.elm.value
                           }
                           placeholder={elm.value}
                           onChange={(event) => {
                             handlec2(event);
                           }}
                         ></input>}
                        </div> : ""
                        }
                        
                         {elm.value == "Geo_Location" ? <div>
                         <label
                         style={{ marginRight: "3px", fontWeight: "bold" }}
                       >
                        Deviation (in mins)
                       </label> 
                       <input
                          type="text"
                          style={{ marginTop: "3px", marginBottom:"5px" }}
                          name="Deviation"
                          value={
                            onClickRuleData.RuleType
                              ? onClickRuleData.RuleType["Deviation"] ? onClickRuleData.RuleType["Deviation"] : ""
                              : ""
                          }
                          placeholder={"Deviation"}
                          onChange={(event) => {
                            handlec2(event);
                          }}
                        ></input>
                       </div> : ""
                      }
                      </>
                    );
                  })
                : ""}
            </div>
          </form>
        </div>
         <div className="text-end col-12">
            <Button
            color="success"
            style={{ marginRight: "5px"}}
            // onClick={() => {
            //   UpdateChannelrule();
            // }}
            onClick={()=>{
             if(save1){ saveChannelRule();
              }
              else {UpdateChannelrule();}
            }}
          >
            {save1? "save" : "update"}
          </Button>
          <Button
            color="danger"
            onClick={() => {
             toggleRuleEdit();
              setSelectedRuleValues([]);
              setDefaultVal([]);
              setIPFormatV([]);
              setIPFormatVal([]);
            }}
          >
            Cancel
          </Button>
          </div>

        </ModalBody>
      </Modal>


      <Modal
        isOpen={ruleEditRulemodal}
        toggle={toggleRuleEditModal}
        // size="sm"
        centered={true}
      >
        <ModalHeader  toggle={toggleRuleEditModal}>{"Edit Rules" }</ModalHeader>
        <ModalBody>

        <div className="ui main">
          <form className="ui form">
            <div className="field">
              <label>Select Channel Rule</label>
              <Select
                options={array3}
                placeholder="Choose Rule"
                defaultValue={{label:channelRuleName , value:channelRuleName}}
                onChange={(event) => {
                   setchannelRuleExisting(event.value);
                  setchannelRuleName(event.label);
                }}
              />
            </div>
            { onClickDelete ?  <button
             style={{marginTop:"5px"}}
             className="btn btn-sm btn-outline-danger"
            color="primary"
            onClick={(e)=>{
              UpdateChannelruleForChannel(e,dlvalue);
            }}
          >
           Clear Selection
          </button>:""} 
            
          </form>
        </div>
         <div className="text-end col-12">
            <Button
            color="success"
            style={{ marginRight: "5px"}}
           
            onClick={(e)=>{
              UpdateChannelruleForChannel(e);
              setchannelRuleName('');
            }}
          >
            Update
          </Button>
          <Button
            color="danger"
            onClick={() => {
              toggleRuleEditModal(); 
              setchannelRuleName('');
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

export default AdminDashboard;
