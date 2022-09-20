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

let LayoutSelectionEdit = (props) => {
  const [layoutType, setlayoutType] = useState("1");
  const [layoutName, setlayoutName] = useState("");
  const [array2, setArray2] = useState([]);
  const [propertyData, setpropertyData] = useState([]);
  const [PropertyId, setPropertyId] = useState("");

  useEffect(() => {
    setlayoutName(props.layoutName);
    setpropertyData(props.propertyData);
  }, []);
  useEffect(() => {
    loadProperty();
  }, []);

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
      name: layoutName,
      propertyData: propertyData,
      id : props.id
    };
    const Layout = await httpService
      .CreateUpdate("UpdateSelectedLayoutProp", data)
      .catch((err) => {
        console.log(err);
      });
    props.setlayoutCheck(true);
    toast.success("Layout Updated", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
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
        PropertyId: `${allPropertydata.data[i]._id}`,
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
      <Select
        isMulti
        name="Rule Type"
        options={array2}
        value={propertyData}
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
      ></input>
      <div className="row">
        
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

export default LayoutSelectionEdit;
