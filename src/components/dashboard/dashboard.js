import { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./dashboard.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "react-apexcharts";
import httpService from "../../services/http.service";
import { Button, Table, UncontrolledCollapse } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Layout from "../rightcolumn/layout/layout";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../common/loader";
import {
  faPlusSquare,
  faEdit,
  faArrowDown,
  faAngleDoubleDown,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import iconImage from "../../assets/download.jpg";
import { ToastContainer, toast } from "react-toastify";
import Collapsible from "react-collapsible";
import validator from 'validator';
import {bitStreamtoNumber} from "./../../config"
import ChannelStats from "./channelstats";

let Dashboard = () => {
  const [alldata, setAlldata] = useState([]);
  const [allRuledata, setAllRuledata] = useState([]);
  const [allProperty, setAllProperty] = useState([]);
  const [LayoutArray, setlayoutArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [save, setSave] = useState(false);
  const [save1, setSave1] = useState(false);
  const [save3, setSave3] = useState(false);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [array3, setArray3] = useState([]);
  const [propertyToggle, setpropertyToggle] = useState({});
  const [show1, setShow1] = useState(false);
  const [onClickData, setOnclickData] = useState({});
  const [IPFormatDataValue, setIPFormatDataValue] = useState([]);
  const [IPFormatV, setIPFormatV] = useState([]);
  const [IPFormatVal, setIPFormatVal] = useState([]);
  const [IPFormatData, setIPFormatData] = useState([]);
  const [onClickDelete, setOnclickDelete] = useState('');
  const [onClickRuleData, setOnclickRuleData] = useState({});
  const [onClickProperty, setOnclickProperty] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [allDataArr, setAllDataArr] = useState({});
  const [dataStats, setdataStats] = useState({});
  const [PropertyDataObject, setPropertyDataObject] = useState({});
  const [dummyPropertyDataObject, setdummyPropertyDataObject] = useState({});
  const [ruleDelete, setRuleDelete] = useState(false);
  //const [BillboardIdList , setBillboardIdList]=useState([]);
  const [activeClass, setActiveClass] = useState("");
  const [channelRuleExisting, setchannelRuleExisting] = useState("");
  const [ruleForProperty, setRuleForProperty] = useState("");
  const [channelIdforRule, setchannelIdforRule] = useState("");
  const [channelRuleName, setchannelRuleName] = useState("");
  const[hideRule, setHideRule]  = useState(true)
  const[hide,sethide] = useState(true)
  const getLicensedRules = async () => {
    let stream = await httpService.get("getlicenses").catch(e => {
      setHideRule(true)
    })
    stream.data.output[15] == "1" ? sethide(false) : sethide(true)
    let licenseCount = bitStreamtoNumber(stream.data, "rule")
    if(licenseCount - allRuledata.length < 0) setHideRule(true)
    else setHideRule(false)
  }
  let BillboardIdList = [];
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
  var rulearray = ["IpAddress", "MacAddress", "AccountNumber", "Geo_Location"];
  const ruleSelectValues = [
    { value: "IpAddress", label: "IP Address" },
    { value: "MacAddress", label: "Mac Address" },
    { value: "AccountNumber", label: "Account Number" },
    { value: "Geo_Location", label: "Geo Location" },
  ];
  let gridOptions = {};
  let onGridReady = {};
  const defaultColDef = {
    sortable: false,
    editable: false,
    flex: 1,
    filter: false,
  };
  const [defaultVal, setDefaultVal] = useState([]);
  const [selectedPropertyValues, setSelectedPropertyValues] = useState([]);
  const [propertyVal, setPropertyVal] = useState([]);

  const [selectedRuleValues, setSelectedRuleValues] = useState([]);
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
    console.log(onClickData);
  };
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
  const history = useHistory();
  const handleShow = (e, item) => {
    setSave1(false)
    if(item.RuleType.IpAddress){
      let IPValidValue=Object.entries(item.RuleType.IpAddress);
    setIPFormatDataValue(IPValidValue);
    setIPFormatV(IPValidValue[0][0]);
    setIPFormatVal(IPValidValue[0][1])
  }
    if (item.RuleType) {
      let selectedKeys = Object.keys(item.RuleType);
      let arr = [];
      for (let i = 0; i < selectedKeys.length; i++) {
        let obj = {
          value: selectedKeys[i],
          label: selectedKeys[i],
        };
        if(selectedKeys[i] != "Deviation"){
          let ChannelData = { ...onClickRuleData };
          ChannelData[selectedKeys[i]] = item.RuleType[selectedKeys[i]];
          setOnclickData(ChannelData);
          arr.push(obj);
        }
      }
      setSelectedRuleValues(arr);
      setDefaultVal(arr);
    }

    setOnclickRuleData(item);
    if (!item.RuleType) {
      let ChannelData = { ...item };
      ChannelData["RuleType"] = {};
      setOnclickRuleData(ChannelData);
    }
    
    setShow(true);
  };
  const handleShow1 = (e, item,event) => {
    setSave(false);
    if (item.PropertyType) {
      let selectedKeys = item.PropertyType;
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
    setOnclickData(item);
    loadProperty();
    console.log(alldata);

  for(let i=0;i<alldata.length;i++){
    if(item._id==alldata[i]._id){
      let ChannelData = { ...item };
      ChannelData.videoSource[0] = alldata[i].videoSource[0];
      ChannelData.videoSource[1] = alldata[i].videoSource[1];
      setOnclickData(ChannelData);
      console.log(onClickData);
    }
  }
    
    setShow1(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedRuleValues([]);
    setDefaultVal([]);
    setIPFormatV([]);
    setIPFormatVal([]);
  };
  const handleCloseRule = () => {
    setShowRule(false);
    setchannelRuleName('');
  };

  const handleClose3 = () => {
    setShow3(false);
    setSave3(false);
  };

  const handleShow3 = (e, item) => {
    setSave3(false);
    setShow3(true);
    setOnclickProperty(item);
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (event, e) => {
    setShow2(true)
    setdataStats(e)
  };

  const handleShowRule = (event, e,propertyData) => {
    setRuleForProperty(propertyData.property._id);
    setchannelRuleExisting(e.ChannelRulesId ? e.ChannelRulesId : "");
     setchannelIdforRule(e._id);
   for( let i=0 ;i<e.PropertyType.length;i++){
    if(e.PropertyType[i].PropertyId){
      if(e.PropertyType[i].PropertyId==propertyData.property._id){
        setchannelRuleName(e.PropertyType[i].ChannelRulesName);
        setOnclickDelete(e.PropertyType[i].ChannelRulesName);
        break;
      }
    }
   }
   setShowRule(true);
  }

  const handleClose1 = () => {
    setSave1(false);
    setShow1(false);
    setPropertyVal([]);
    loadAlldata();
  };

  useEffect(() => {
    showLoader();
    loadAlldata();
    loadProperty();
    allLayout();
    getLicensedRules();
    hideLoader();
  }, []);
  useEffect(() => {}, [LayoutArray]);

  useEffect(async () => {
    showLoader();
    let dataUserPost = { userID: localStorage.getItem("UserId") };
    let LayoutArraydata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });
    let propertyToggleData = localStorage.getItem("propertyToggleData") ? JSON.parse(localStorage.getItem("propertyToggleData")) : {};
    setpropertyToggle(propertyToggleData);
    setlayoutArray(LayoutArraydata.data.data);
    hideLoader();
  }, []);

  const columns = [
   
    {
      headerName: "Rule Name",
      field: "ChannelRulesName",
      sortable: "true"
     
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

         img.onclick = (event) => handleShow(event, params.data);

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




  const loadAlldata = async () => {
    loadProperty();

  };
  const sortProperty = () => {
    if (localStorage.getItem("PropertySort") == "yes") {
      let DataObject = { ...PropertyDataObject };
      //DataObject = Object.keys(DataObject)
      //.sort()
      //.reduce((r, k) => ((r[k] = DataObject[k]), r), {});
      DataObject = Object.entries(DataObject)
      .sort(([,a],[,b]) => a.property.Name-b.property.Name)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
      setPropertyDataObject(DataObject);
    } else {
      setPropertyDataObject(dummyPropertyDataObject);
    }
  };

  const loadProperty = async () => {
    const UserId = localStorage.getItem("UserId");
    let req = {
      UserId: JSON.stringify(UserId),
    };
    let allProperty = await httpService
      .CreateUpdate("getallProperty", req)
      .catch((err) => {
        console.log(err);
      });
    setAllProperty(allProperty.data);

    const UserIdData = localStorage.getItem("UserId");
    let reqAllData = {
      UserId: UserIdData,
    };

    let alldataapi = await httpService
      .CreateUpdate("getalldataapi", reqAllData)
      .catch((err) => {
        console.log(err);
      });

    setAlldata(alldataapi.data.channelInfodata);
    setAllDataArr(alldataapi.data.propertyData);
    setAllRuledata(alldataapi.data.channelRuledata);
    let dataUserPost = { userID: localStorage.getItem("UserId") };

    let LayoutArraydata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });

    let DataObject = {};
    for (let i = 0; i < allProperty.data.length; i++) {
      DataObject[`${allProperty.data[i]._id}`] = {
        property: allProperty.data[i],
        channels: [],
        billboards: [],
      };
    }
    let dataChannels = alldataapi.data.channelInfodata;
    for (let i = 0; i < dataChannels.length; i++) {
      for (let j = 0; j < dataChannels[i].PropertyType.length; j++) {
       if(dataChannels[i].PropertyType[j].PropertyId){ let val = `${dataChannels[i].PropertyType[j].PropertyId}`;
         dataChannels[i]["RuleKey"] = dataChannels[i].PropertyType[j].ChannelRulesName;
         DataObject[val].channels.push(dataChannels[i]);
        }
      }
    }
    if (
      localStorage.getItem("channelSort") == undefined ||
      localStorage.getItem("channelSort") == "" ||
      localStorage.getItem("channelSort") == "channelName"
    ) {
      Object.entries(DataObject).map((elem, ind) => {
        elem[1].channels.sort((a, b) =>
          a.channelName > b.channelName
            ? 1
            : b.channelName > a.channelName
            ? -1
            : 0
        );
      });
    } else if (localStorage.getItem("channelSort") == "channelRule") {
      Object.entries(DataObject).map((elem, ind) => {
        elem[1].channels.sort((a, b) =>
          a.RuleKey > b.RuleKey
            ? 1
            : b.RuleKey > a.RuleKey
            ? -1
            : 0
        );
      });
    }
    if (localStorage.getItem("PropertySort") == "yes") {
      sortProperty();
    }

    let dataLayouts = LayoutArraydata.data.data;
    for (let i = 0; i < dataLayouts.length; i++) {
      if (dataLayouts[i].PropertyId != undefined) {
        if(DataObject[`${dataLayouts[i].PropertyId}`] && DataObject[`${dataLayouts[i].PropertyId}`]["billboards"]){
          DataObject[`${dataLayouts[i].PropertyId}`]["billboards"].push(
            dataLayouts[i]
          );
        }
      }
    }

    setPropertyDataObject(DataObject);
    setdummyPropertyDataObject(DataObject);

    const arr2 = [];
    for (let i = 0; i < allProperty.data.length; i++) {
      let obj = {
        value: `${allProperty.data[i].Name}`,
        label: `${allProperty.data[i].Name}`,
        PropertyId: `${allProperty.data[i]._id}`,
      };
      if (allProperty.data[i]) {
        {
          arr2.push(obj);
        }
      }
    }
    setArray2(arr2);
    const arr3 = [];
    for (let i = 0; i < alldataapi.data.channelRuledata.length; i++) {
      let obj = {
        value: `${alldataapi.data.channelRuledata[i]._id}`,
        label: `${alldataapi.data.channelRuledata[i].ChannelRulesName}`,
        id: `${alldataapi.data.channelRuledata[i]._id}`,
        data: alldataapi.data.channelRuledata[i],
      };
      if (
        alldataapi.data.channelRuledata[i].ChannelRulesName != undefined &&
        alldataapi.data.channelRuledata[i].ChannelRulesName != ""
      ){
        {
          arr3.push(obj);
        }
      }
    }
    setArray3(arr3);
  };
  const sortchannels = () => {
    let dataObj = { ...PropertyDataObject };
    if (
      localStorage.getItem("channelSort") == undefined ||
      localStorage.getItem("channelSort") == "" ||
      localStorage.getItem("channelSort") == "channelName"
    ) {
      Object.entries(dataObj).map((elem, ind) => {
        elem[1].channels.sort((a, b) =>
          a.channelName > b.channelName
            ? 1
            : b.channelName > a.channelName
            ? -1
            : 0
        );
      });
    } else if (localStorage.getItem("channelSort") == "channelRule") {
      Object.entries(dataObj).map((elem, ind) => {
        elem[1].channels.sort((a, b) =>
          a.RuleKey > b.RuleKey
            ? 1
            : b.RuleKey > a.RuleKey
            ? -1
            : 0
        );
      });
    }
    setPropertyDataObject(dataObj);
  };

  const allLayout = async () => {
    let dataUserPost = { userID: localStorage.getItem("UserId") };
    let LayoutArraydata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });
    const arr1 = [];
    for (let i = 0; i < LayoutArraydata.data.data.length; i++) {
      let obj = {
        value: `${window.location.origin}/customer-portal/#/view/${LayoutArraydata.data.data[i]._id}`,
        label: `${LayoutArraydata.data.data[i].name} (${window.location.origin}/customer-portal/#/view/${LayoutArraydata.data.data[i]._id})`,
      };
      if (LayoutArraydata.data.data[i].checked) {
        {
          arr1.push(obj);
        }
      }
    }
    setArray1(arr1);
  };

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
  const saveProgram = async () => {
    showLoader();
   let UserId = `${localStorage.getItem("UserId")}`;
    let data = {
      data: onClickData,
      UserId: UserId,
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
      if (!validator.isURL(data.data.videoSource[1])) {
        hideLoader();
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
      if (data.data.videoSource[1].substring(0,7) != "http://" && data.data.videoSource[1].substring(0,8) != "https://") {
        hideLoader();
        toast.warn("Please enter a valid Url with proper http or https header!", {

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

    setShow1(false);
    loadAlldata();
    hideLoader();
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
      return;
    }
  };
  const showLoader=()=>{
    setLoading(true);
  }
  const hideLoader=()=>{
    setLoading(false);
  }


  const DeleteChannelRow = async (event, e, property) => {
    showLoader();
    let propertyId = property.property._id ? property.property._id : "";

    let data = {
      id1: e._id,
      propertyId : propertyId
    };
    const res = await httpService
      .CreateUpdate("DeleteChannelRow", data)
      .catch((err) => {
        console.log(err);
      });
    loadAlldata();
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
  
    loadAlldata();
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

  const DeleteProperty = async (event, e) => {
    showLoader();
    let data = {
      id1: e._id,
    };
    const res = await httpService
      .CreateUpdate("DeleteProperty", data)
      .catch((err) => {
        console.log(err);
      });
    loadProperty();
    loadAlldata();
    if(res.data.message == "Successful"){
      toast.success("Property Deleted Successfully", {
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
      if (!validator.isURL(data.program.videoSource[1])) {
        hideLoader();
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
      if (data.program.videoSource[1].substring(0,7) != "http://" && data.program.videoSource[1].substring(0,8) != "https://") {
        hideLoader();
        toast.warn("Please enter a valid Url with proper http or https header!", {
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
      showLoader();
    setShow1(false);
    loadAlldata();
    if(res.data.message == "Successful"){
      toast.success("Channel  Updated ", {
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
    showLoader();
    const res = await httpService
      .CreateUpdate("UpdateProperty", data)
      .catch((err) => {
        console.log(err);
      });
     
      loadProperty();
      loadAlldata();
    setShow3(false);
    if(res.data.message == "Successful"){
      toast.success("Property Updated", {
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

  const UpdateChannelrule = async () => {
    showLoader();
    let UserId = `${localStorage.getItem("UserId")}`;
    let data = {
      userId: UserId,
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
    }
    
    setShow(false);
    loadAlldata();
    hideLoader();
    setSelectedRuleValues([]);
    setDefaultVal([]);
    setIPFormatV([]);
    setIPFormatVal([]);
  };

  const SaveProperty = async () => {
  
    let UserId = `${localStorage.getItem("UserId")}`;

    let data = {
      userId: UserId,
      user: onClickProperty,
    };
    let data1 = data.user.Name.trim()
      .split("  ")
      .filter((word) => word !== "");
    data.user.ChannelRulesName = data1.join(" ");

    if (data.user.Name === "") {
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
    if (data.user.Name === "") {
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
   


    showLoader();
    console.log(data);
    const res = await httpService
      .CreateUpdate("SaveProperty", data)
      .catch((err) => {
        console.log(err);
      });
    
    // console.log(res);
    setShow3(false);
    loadProperty();
    loadAlldata();
  
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
  const saveChannelRule = async () => {
    showLoader();
     let UserId = `${localStorage.getItem("UserId")}`;
    let data = {
      userId: UserId,
      user: onClickRuleData
    };
    // let data1 = data.user.Name.trim()
    //   .split("  ")
    //   .filter((word) => word !== "");
    // data.user.ChannelRulesName = data1.join(" ");

    // if (data.user.Name === "") {
    //   toast.warn("please Enter property  Name", {
    //     position: "bottom-left",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }
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
     
      toast.success("Channel rule Added Successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    } 
      setSelectedRuleValues([]);
      setDefaultVal([]);
      loadProperty();
      loadAlldata();
      setShow(false);
      setIPFormatV([]);
      setIPFormatVal([]);
      hideLoader();
  };
  const UpdateChannelruleForChannel = async (e, ruleDelete)=>{
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
      loadProperty();
      loadAlldata();
      setShowRule(false);
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

  const onInputChange = (e) => {
    setSelectedValue(e.target.value);
    setOnclickData({ ...onClickData, [e.target.name]: e.target.value });
  };

  const onInputRuleChange = (e) => {
    setSelectedValue(e.target.value);
    setOnclickRuleData({ ...onClickRuleData, [e.target.name]: e.target.value });
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

  const handleChangeProgram = (e, i, name) => {
    let ChannelData = { ...onClickData };
    ChannelData.program[i][`${name}`] = e;
    setOnclickData(ChannelData);
  };

  const onInputChange1 = (e) => {
    setOnclickData({ ...onClickData, [e.target.name]: e.target.value });
  };

  const onInputChange3 = (e) => {
    setOnclickProperty({ ...onClickProperty, [e.target.name]: e.target.value });
  };
 

  const addClickHandler = () => {
    setOnclickData({
      channelName: "",
      channelDescription: "",
      channel_category: "",
      channel_language: "",
      programIcon: "",
      videoSource: [],
      program: [],
      PropertyType: [],
    });
    setShow1(true);
    setSave(true);
  };
  let dlvalue=true;
  const addClickHandler2 = () => {
    setDefaultVal([]);
    setOnclickRuleData({
      ChannelRulesName:"",
      RuleType:{}
    });
    setShow(true);
    setSave1(true);
  
  };

  const addClickHandler1 = () => {
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
    });
    setShow3(true);
    setSave3(true);
  };

  return (
    <div classname="mainClass">
    {loading ? <Loader/> : null}
    
   
      <div
        className="form-boxdiv"
        style={{ marginBottom: "20px", marginTop: "90px" }}
      >
        <div className="form-boxtopline5 mb-2 row">
          <div className="col-9">Billboards</div>
          <div className="col-3 editBillboard">
            <Button
              color="primary"
              className="form-control"
              onClick={() => {
                history.push("/content");
              }}
            >
              Edit Billboard
            </Button>
          </div>
        </div>

        <div className="custom-control custom-checkbox">
          <div>
            <div className="row">
              {allProperty.map((e, i) => {
                return (
                  <div
                    className="col-3 billBoard-thumbnail"
                    style={{ paddingLeft: "10px" }}
                  >
                    <div
                      className="billboardImage"
                      style={{
                        border: "1px solid gray",
                        borderRadius: "3px",
                        paddingRight: "10px",
                      }}
                    >
                      <div
                        className="text-center layoutName row"
                        style={{ marginTop: "5px" }}
                      >
                        <b className="col-9">{e.Name}</b>
                        <div
                          className="col-3"
                          style={{ color: "white" }}
                          onClick={() => {
                            history.push(`/content/${e._id}`);
                          }}>
                        
                          <Button color="secondary" className="form-control" >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/*<div className="row">
              {LayoutArray.map((e, i) => {
                if (e.checked) {
                  return (
                    <div
                      className="col-3 billBoard-thumbnail"
                      style={{ paddingLeft: "10px" }}
                    >
                      <div
                        className="billboardImage"
                        style={{
                          border: "1px solid gray",
                          borderRadius: "3px",
                          paddingRight: "10px",
                        }}
                      >
                        <div
                          className="text-center layoutName row"
                          style={{ marginTop: "5px" }}
                        >
                          <b className="col-9">{e.name}</b>
                          <Button color="secondary" className="col-3">
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              to={`/view/${e._id}`}
                              style={{ color: "white" }}
                            >
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>*/}
          </div>
        </div>
      </div>


{/* 
      <div
        className="form-boxdiv"
        style={{ marginBottom: "15px", marginTop: "15px" }}
      >
        <div className="form-boxtopline5 mb-2 row">
          <div className="col-9">Channel Rules</div>
          
        </div>

        <div className="custom-control custom-checkbox">
          <div>
            <div className="row">
              {allProperty.map((e, i) => {
                return (
                  <div
                    className="col-3 billBoard-thumbnail"
                    style={{ paddingLeft: "10px" }}
                  >
                    <div
                      className="billboardImage"
                      style={{
                        border: "1px solid gray",
                        borderRadius: "3px",
                        paddingRight: "10px",
                      }}
                    >
                      <div
                        className="text-center layoutName row"
                        style={{ marginTop: "5px" }}
                      >
                        <b className="col-9">{e.Name}</b>
                        <div
                          className="col-3"
                          style={{ color: "white" }}
                          onClick={() => {
                            history.push(`/content/${e._id}`);
                          }}>
                        
                          <Button color="secondary" className="form-control" >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </div> */}

      

      <div className="form-boxdiv">
        <div className="form-boxtopline5 mb-2 row">
          <div
            className="col-7"
            // style={{display:"inline-block", marginRight:"20px"}}
          >
            Channels
          </div>

          <div className="text-end col-5">
            {/*<button
              color="primary"
              className="btn btn-sm btn-primary"
              style={{
                marginRight: "7px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
              onClick={() => {
                history.push("/content");
              }}
            >
              Edit Billboard
            </button>*/}
            <button
              className="btn btn-sm btn-primary"
              onClick={addClickHandler1}
            >
              Add Property
            </button>
            <button
              className="btn btn-sm btn-primary ms-2"
              onClick={addClickHandler}
            >
              Add Channel
            </button>
            <button
              className="btn btn-sm btn-primary ms-2"
              hidden={hideRule}
              onClick={addClickHandler2}
            >
              Add Rule
            </button>
          </div>
        </div>

        <div className="p-3">
          {/* <div className="text-end mb-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={addClickHandler1}
            >
              Add Property
            </button>
            <button
              className="btn btn-sm btn-secondary ms-2"
              onClick={addClickHandler}
            >
              Add Channel
            </button>
          </div> */}

          <Table hover className="channelsTable border">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    if (localStorage.getItem("PropertySort") == "yes") {
                      localStorage.setItem("PropertySort", "no");
                      sortProperty();
                    } else {
                      localStorage.setItem("PropertySort", "yes");
                      sortProperty();
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Property{" "}
                  {localStorage.getItem("PropertySort") == "yes" ? (
                    <FontAwesomeIcon
                      className="icon"
                      icon={faAngleDoubleDown}
                      style={{ paddingleft: "15px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="icon"
                      icon={faAngleDown}
                      style={{ paddingleft: "15px" }}
                    />
                  )}
                </th>
                <th className="text-end">Delete</th>
              </tr>
            </thead>
            <tbody>
            { (localStorage.getItem("PropertySort")==="yes" ? Object.entries(PropertyDataObject).slice().sort(function(a, b){return a[1].property.Name < b[1].property.Name ? -1 : a[1].property.Name > b[1].property.Name ? 1:0 })
            : Object.entries(PropertyDataObject)).map((item, index) => {
                return (
                  <>
                    <tr style={{ borderTop: "1px solid gray" }}>
                      <td
                        
                      >
                        <span onClick={() =>{
                          activeClass
                            ? setActiveClass("")
                            : setActiveClass(index);
                          let propertyToggleData = localStorage.getItem("propertyToggleData") ? JSON.parse(localStorage.getItem("propertyToggleData")) : {};
                          if(propertyToggleData[`${item[1].property._id}`] && propertyToggleData[`${item[1].property._id}`] == true) {
                            propertyToggleData[`${item[1].property._id}`] = false
                          } 
                          else {
                            propertyToggleData[`${item[1].property._id}`] = true
                          };
                          localStorage.setItem("propertyToggleData", JSON.stringify(propertyToggleData));
                          setpropertyToggle(propertyToggleData);
                          }
                        }
                        // onClick={(event) => handleShow3(event, e1)}
                        id={"toggler" + index}> {item[1].property.Name} </span>
                        <button
                          className="btn btn-sm btn-secondary"
                          style={{ marginLeft: "10px" }}
                          onClick={(event) =>
                            handleShow3(event, item[1].property)
                          }
                        >
                          <i className="edit icon me-0"></i>
                        </button>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(event) => {
                            DeleteProperty(event, item[1].property);
                          }}
                        >
                          <i className="trash icon me-0"></i>
                        </button>{" "}
                      </td>
                    </tr>
                    {/* {allDataArr[e1.Name].length > 0 ? (
                        <>
                          
                          <tr className="no-hover-bg ">
                            <td colSpan={2} className="p-3">
                              <Table
                                striped
                                bordered
                                hover
                                size="sm"
                                className="mb-0"
                              >
                                <thead>
                                  <tr>
                                    <th>Channels</th>
                                    <th>Channel Rules</th>
                                    <th>Channel Statistics</th>
                                    <th>Webcaster Management</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {alldata
                                    .slice(0)
                                    .reverse()
                                    .map((e, id) => {
                                      return e.PropertyName === e1.Name ? (
                                        <tr>
                                          <td
                                            onClick={(event) =>
                                              handleShow1(event, e)
                                            }
                                          >
                                            {e.channelName == undefined ||
                                            e.channelName == ""
                                              ? "Add Channel"
                                              : e.channelName}{" "}
                                          </td>
                                          <td
                                            onClick={(event) =>
                                              handleShow(event, e)
                                            }
                                          >
                                            {" "}
                                            {e.ChannelRulesName == undefined ||
                                            e.ChannelRulesName == ""
                                              ? "Add Rule"
                                              : e.ChannelRulesName}
                                          </td>
                                          <td
                                            onClick={(event) =>
                                              handleShow2(event, e)
                                            }
                                          >
                                            channel Statistics
                                          </td>
                                          <td> Webcaster Management</td>
                                          <td>
                                            <button
                                              className="btn btn-sm btn-outline-danger"
                                              onClick={(event) => {
                                                DeleteChannelRow(event, e);
                                              }}
                                            >
                                              <i className="trash icon me-0"></i>
                                            </button>{" "}
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </td>
                          </tr>
                        </>
                      ) : (
                        ""
                      )}  */}
                    <div
                      hidden = {!(propertyToggle[`${item[1].property._id}`] != undefined && propertyToggle[`${item[1].property._id}`])
                      }
                      width="100%"
                    >
                      <div
                        style={{
                          borderBottom: "1px solid rgb(186 186 186 / 48%)",
                          paddingBottom: "10px",
                        }}
                        width="100%"
                      >
                        <Table
                          striped
                          bordered
                          hover
                          size=""
                          style={{
                            marginLeft: "7%",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                          className="mb-0"
                        >
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  localStorage.setItem(
                                    "channelSort",
                                    "channelName"
                                  );
                                  sortchannels();
                                }}
                                style={{ cursor: "pointer" }}
                                className="dasboardTH"
                              >
                                <div
                                  style={
                                    localStorage.getItem("channelSort") ==
                                      undefined ||
                                    localStorage.getItem("channelSort") == "" ||
                                    localStorage.getItem("channelSort") ==
                                      "channelName"
                                      ? {
                                          borderBottom: "3px solid white",
                                          paddingBottom: "8px",
                                        }
                                      : {
                                          borderBottom: "0px solid white",
                                          paddingBottom: "8px",
                                        }
                                  }
                                >
                                  <div>Channels</div>
                                </div>
                              </th>
                              <th
                                className="dasboardTH"
                                onClick={() => {
                                  localStorage.setItem(
                                    "channelSort",
                                    "channelRule"
                                  );
                                  sortchannels();
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <div
                                  style={
                                    localStorage.getItem("channelSort") ==
                                    "channelRule"
                                      ? {
                                          borderBottom: "3px solid white",
                                          paddingBottom: "8px",
                                        }
                                      : {
                                          borderBottom: "0px solid white",
                                          paddingBottom: "8px",
                                        }
                                  }
                                >
                                  <div>Channel Rules</div>
                                </div>
                              </th>
                              <th className="dasboardTH">Channel Statistics</th>
                              <th className="dasboardTH">
                                Webcaster Management
                              </th>
                              <th className="dasboardTH">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item[1].channels
                              .slice(0)
                              .reverse()
                              .map((e, id) => {
                                return (
                                  <tr>
                                    <td
                                      onClick={(event) => handleShow1(event, e,item[1].channels)}
                                    >
                                      {e.channelName == undefined ||
                                      e.channelName == ""
                                        ? "Add Channel"
                                        : e.channelName}{" "}
                                    </td>
                                    <td
                                      onClick={(event) => handleShowRule(event, e,item[1])}
                                    >
                                      {" "}
                                      {
                                        e.PropertyType.find(obj => item[1].property._id === obj.PropertyId).ChannelRulesName
                                        ?e.PropertyType.find(obj => item[1].property._id === obj.PropertyId).ChannelRulesName
                                        :"Add Rule"
                                                                      }
                                    </td>
                                    <td
                                      onClick={(event) => handleShow2(event, e)}
                                    >
                                      channel Statistics
                                    </td>
                                    
                                    {(e.videoSource? (e.videoSource[0] ? (e.videoSource[0] == "url" || e.videoSource[0] == "billboard") : true) : true) == true ? <td></td> : <td onClick={()=> window.open(e.videoSource[1], "_blank")}> Webcaster Management</td>}
                                    <td>
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={(event) => {
                                          DeleteChannelRow(event, e, item[1]);
                                        }}
                                      >
                                        <i className="trash icon me-0"></i>
                                      </button>{" "}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                        {/*<Table
                          striped
                          bordered
                          hover
                          size=""
                          style={{
                            marginLeft: "7%",
                            // marginRight: "2%",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                          className="mb-0"
                        >
                          <thead>
                            <tr>
                              <th>Billboard Name</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item[1].billboards
                              .slice(0)
                              .reverse()
                              .map((e, id) => {
                                return (
                                  <tr>
                                    <td>{e.name}</td>
                                    <td>
                                      <Button
                                        color="secondary"
                                        className="col-3"
                                      >
                                        <Link
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          to={`/view/${e._id}`}
                                          style={{ color: "white" }}
                                        >
                                          View
                                        </Link>
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                            </Table>*/}
                      </div>
                    </div>
                  </>
                );
              })}

              {/* </>
                  ); 
                })} */}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="form-boxdiv" style={{marginTop:"15px"}}>
            <div className="form-boxtopline5">Channel Rule</div>
            <div className="form-boxtopcont user-form">
              <div
                className="ag-theme-alpine"
                style={{ height: "calc(70vh - 150px)" }}
              >
                <AgGridReact
                  pagination={true}
                  paginationPageSize={20}
                  columnDefs={columns}
                  defaultColDef={defaultColDef}
                  enableBrowserTooltips={true}
                  tooltipShowDelay={{ tooltipShowDelay: 0 }}
                  rowData={allRuledata}
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
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>
            {onClickProperty.Name ? "Edit Property" : "Add Property"}
          </Modal.Title>
        </Modal.Header>
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
                type="number"
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
          </form>
        </div>
        <Modal.Footer>
          <Button
            color="success"
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
              setShow3(false);
              setSave3(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {onClickData.ChannelRulesName ? "Edit Rules" : "Add Rules"}
          </Modal.Title>
        </Modal.Header>
        <div className="ui main">
          <form className="ui form">
            
            
            {/* <div className="field">
              <label style={{ fontSize: "14px" }}>
                Import rule from existing rule
              </label>
              <Select
                options={array3}
                placeholder="Choose Rule"
                defaultInputValue={onClickData.ruleID}
                onChange={(event) => {
                  let ChannelData = { ...onClickData };
                  ChannelData.ChannelRulesName = event.data.ChannelRulesName;
                  ChannelData.ruleID = event.data._id;
                  let dataArray = [];
                  if (event.data.RuleType && event.data.RuleType.IpAddress) {
                    let data = { value: "IpAddress", label: "IP Address" };

                    dataArray.push(data);
                    // setSelectedRuleValues(dataArray);
                    // setDefaultVal(dataArray);
                  }
                  if (event.data.RuleType && event.data.RuleType.MacAddress) {
                    let data = { value: "MacAddress", label: "Mac Address" };
                    // let dataArray = [];
                    dataArray.push(data);
                    // setSelectedRuleValues(dataArray);
                    // setDefaultVal(dataArray);
                  }
                  if (
                    event.data.RuleType &&
                    event.data.RuleType.AccountNumber
                  ) {
                    let data = {
                      value: "AccountNumber",
                      label: "Account Number",
                    };
                    // let dataArray = [];
                    dataArray.push(data);
                    // setSelectedRuleValues(dataArray);
                    // setDefaultVal(dataArray);
                  }
                  if (event.data.RuleType && event.data.RuleType.Geo_Location) {
                    let data = { value: "Geo_Location", label: "Geo Location" };
                    // let dataArray = [];
                    dataArray.push(data);
                  }

                  setSelectedRuleValues(dataArray);
                  setDefaultVal(dataArray);

                  if (event.data.RuleType) {
                    if (ChannelData && ChannelData.RuleType) {
                      if (event.data.RuleType.IpAddress) {
                        ChannelData.RuleType.IpAddress =
                          event.data.RuleType.IpAddress;
                      }
                      if (event.data.RuleType.MacAddress) {
                        ChannelData.RuleType.MacAddress =
                          event.data.RuleType.MacAddress;
                      }
                      if (event.data.RuleType.AccountNumber) {
                        ChannelData.RuleType.AccountNumber =
                          event.data.RuleType.AccountNumber;
                      }
                      if (event.data.RuleType.Geo_Location) {
                        ChannelData.RuleType.Geo_Location =
                          event.data.RuleType.Geo_Location;
                      }
                    } else {
                      ChannelData.RuleType = {};
                      if (event.data.RuleType.IpAddress) {
                        ChannelData.RuleType.IpAddress =
                          event.data.RuleType.IpAddress;
                      }
                      if (event.data.RuleType.MacAddress) {
                        ChannelData.RuleType.MacAddress =
                          event.data.RuleType.MacAddress;
                      }
                      if (event.data.RuleType.AccountNumber) {
                        ChannelData.RuleType.AccountNumber =
                          event.data.RuleType.AccountNumber;
                      }
                      if (event.data.RuleType.Geo_Location) {
                        ChannelData.RuleType.Geo_Location =
                          event.data.RuleType.Geo_Location;
                      }
                    }
                  }
                  setOnclickData(ChannelData);
                }}
              />
            </div> */}
            
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
        <Modal.Footer>
          <Button
            color="success"
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
              setShow(false);
              setSelectedRuleValues([]);
              setDefaultVal([]);
              setIPFormatV([]);
              setIPFormatVal([]);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRule} onHide={handleCloseRule}>
        <Modal.Header closeButton>
          <Modal.Title>
            {onClickData.ChannelRulesName ? "Edit Rules" : "Add Rules"}
          </Modal.Title>
        </Modal.Header>
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
          {/* { onClickDelete ? <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(event)=>{ruleDeleting(event)}}/>
    <label class="form-check-label" for="exampleCheck1">Clear Selection </label>
  </div>:""}  */}
  { onClickDelete ?  <button
             style={{marginTop:"5px"}}
             className="btn btn-sm btn-outline-danger"
            color="primary"
            onClick={(e)=>{
               UpdateChannelruleForChannel(e, dlvalue);
              //  setShowRule(false);
            }}
          >
           Clear Selection
          </button>:""} 

 
            
          </form>
        </div>
        <Modal.Footer>
          <Button
            color="success"
            onClick={(e)=>{
                UpdateChannelruleForChannel(e);
                setchannelRuleName('');
            }}
          >
            {save1? "save" : "update"}
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setShowRule(false);
              setchannelRuleName('');
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>
            {onClickData.channelName ? "Edit Channel" : "Add Channel"}
          </Modal.Title>
        </Modal.Header>

        <div className="ui main">
          <form className="ui form row">
            <div className="field">
              <label style={{ fontSize: "14px" }}>Property</label>
              {/* <input
                type="text"
                name="Name"
                placeholder="Property"
                onChange={(e) => onInputChange1(e)}
                value={onClickData.Name}
              /> */}
              {/*<Select
                options={array2}
                placeholder="Choose Property"
                defaultInputValue={onClickData.PropertyName}
                onChange={(event) => {
                  let ChannelData = { ...onClickData };
                  ChannelData.PropertyName = event.value;
                  ChannelData.PropertyId = event.PropertyId;
                  setOnclickData(ChannelData);
                }}
              />*/}
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
            {/* <div className="field col-6">
              <label style={{ fontSize: "14px" }}>Icon</label>

              <div class="input-group row">
                <div classNmae="input-group-prepend"></div>
                <div className="custom-file col-8">
                  <input
                    type="file"
                    className="custom-file-input form-control"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => getFile(e)}
                    // value={program.programIcon}
                  />
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
            </div> */}
            <div className="field col-6">
              <label style={{ fontSize: "14px" }}>Icon</label>

              <div class="input-group row">
                <div classNmae="input-group-prepend"></div>
                <div className="custom-file col-8">
                  {/* <input
                    type="file"
                    className="custom-file-input form-control"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => getFile(e)}
                  /> */}
                    <input type="file" id="myfile" name="myfile"  onChange={(e) => getFile(e)}></input>
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
                    // defaultInputValue={onClickData.videoSource[1]}
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
                  // this.setState({ count: this.state.count + 1 });
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
                      <div className="col-4" style={{ padding: "5px" }}>
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
            <div></div>
          </form>
        </div>
        <Modal.Footer>
          <Button
            className="btn btn-success"
            onClick={() => {
              if (save) {
                saveProgram();
                setPropertyVal([]);
              } else {
                UpdateChannelinfo();
                setPropertyVal([]);
              }
            }}
          >
            {save ? "save" : "update"}
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setShow1(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="xl" show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Channel Statistics</Modal.Title>
        </Modal.Header>
        {
          Object.keys(dataStats).length > 0 ? <ChannelStats e = {dataStats}/> :<div></div>
        }
        
      </Modal>
    </div>
  );
};

export default Dashboard;
