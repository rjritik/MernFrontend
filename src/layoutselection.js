import { useState, useEffect } from "react";
import "./layoutselection.css";
import layout1 from "./assets/layout1.png";
import layout2 from "./assets/layout2.png";
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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import httpService from "./services/http.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";


let LayoutSelection = (props) => {
  const [layoutType, setlayoutType] = useState("1");
  const [layoutName, setlayoutName] = useState("");
  const [array2, setArray2] = useState([]);
  const [propertyData, setpropertyData] = useState([]);

  const [PropertyId, setPropertyId] = useState("");


  useEffect(() => {}, [layoutType, layoutName]);
  useEffect(() => {
    loadProperty();
  }, []);

  const setLayoutTypeDB = (type) => {
    setlayoutType(type);
  };

  const handlePropertyForLayout = (selectedValue) => {
    setpropertyData(selectedValue);
};
  const ProceedToThisLayout = async () => {
    if (layoutName == "") {
      toast.warn("Please enter the layout name", {
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
    if (propertyData.PropertyId == "") {
      toast.warn("Please select the property", {
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
    let data = {
      selectedLayout: layoutType,
      name: layoutName,
      propertyData:propertyData,
      // PropertyName: PropertyName,
      // PropertyId: PropertyId,
      userID: localStorage.getItem("UserId"),
    };
    const Layout = await httpService
      .CreateUpdate("saveSelectedLayout", data)
      .catch((err) => {
        console.log(err);
      });
    props.setlayoutCheck(true);
    toast.success("Layout Added", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar:false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }); 
  };
  const loadProperty = async () => {
    const UserId = localStorage.getItem("UserId");
    let req = {
      UserId: JSON.stringify(UserId),
    };
    let allPropertydata = await httpService
      .CreateUpdate("getallProperty", req)
      .catch((err) => {
        console.log(err);
      });

    const arr2 = [];
    for (let i = 0; i < allPropertydata.data.length; i++) {
      let obj = {
        value: `${allPropertydata.data[i]._id}`,
        label: `${allPropertydata.data[i].Name}`,
         PropertyId:`${allPropertydata.data[i]._id}`,
      };
      if (allPropertydata.data[i]) {
        {
          arr2.push(obj);
        }
      }
    }
    setArray2(arr2);
  };


  return (
    <div>
      <b style={{ fontSize: "14px" }}>Property</b>
      <b style={{ color: "red" }}>*</b>
      {/* <Select
        options={array2}
        placeholder="Choose Property"
        defaultInputValue={PropertyId}
        style={{ marginBottom: "15px" }}
        onChange={(event) => {
          setPropertyName(event.label);
          setPropertyId(event.PropertyId);
        }}
      /> */}

        <Select
                isMulti
                name="Rule Type"
                options={array2}
                defaultInputValue={PropertyId}
                style={{ marginBottom: "15px" }}
                onChange={handlePropertyForLayout}
                className="basic-multi-select"
                classNamePrefix="select"
              /> 


      <label style={{ marginTop: "15px" }}>
        <b>Enter the Layout Name </b>
        <b style={{ color: "red" }}>*</b>
      </label>
      <input
        className="form-control"
        placeholder="Layout Name"
        value={layoutName}
        onChange={(e) => {
          setlayoutName(e.target.value);
        }}
        style={{ marginBottom: "15px" }}
      ></input>
      <label>
        <b>Choose Layout </b>
      </label>
      <div className="row">
        <div
          className="col-4 layoutSelMain"
          onClick={() => setLayoutTypeDB("1")}
        >
          {layoutType == "1" ? (
            <div className="layoutImage activeLayout">
              <img src={layout1} alt="layoutImage"></img>
              <div className="layoutLabel">LAYOUT 1</div>
            </div>
          ) : (
            <div className="layoutImage">
              <img src={layout1} alt="layoutImage"></img>
              <div className="layoutLabel">LAYOUT 1</div>
            </div>
          )}
        </div>
        <div
          className="col-4 layoutSelMain"
          onClick={() => setLayoutTypeDB("2")}
        >
          {layoutType == "2" ? (
            <div className="layoutImage activeLayout">
              <img src={layout2} alt="layoutImage"></img>
              <div className="layoutLabel">LAYOUT 2</div>
            </div>
          ) : (
            <div className="layoutImage">
              <img src={layout2} alt="layoutImage"></img>
              <div className="layoutLabel">LAYOUT 2</div>
            </div>
          )}
        </div>
        <div
          className="col-4 layoutSelMain"
          onClick={() => setLayoutTypeDB("3")}
        >
          {layoutType == "3" ? (
            <div className=" activeLayout layoutImageCustom">
              <div className=" ">CREATE YOUR OWN CUSTOM LAYOUT</div>
              <div>
                <Button color="primary">
                  <FontAwesomeIcon className="iconPlusLayout" icon={faPlus} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="layoutImage layoutImageCustom">
              <div className="">CREATE YOUR OWN CUSTOM LAYOUT</div>
              <div>
                <Button color="primary">
                  <FontAwesomeIcon className="iconPlusLayout" icon={faPlus} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button
          color="primary"
          onClick={ProceedToThisLayout}
          className="ButtonProceed"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default LayoutSelection;
