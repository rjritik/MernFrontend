import { useState, useEffect } from "react";
import "../navbar/navbar.css";
import React from "react";
import _ from "lodash";
import logoUrl from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
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
let Navbar = (props) => {
  const history = useHistory();
  return (
    <div className="">
      <div className="row navbarmain">
        <div className="col-3 navbarlogo">
          <img className="imagelogo" src={logoUrl} alt="Logo"></img>
        </div>
        <div className="col-6 navbartext">
        Radiant RSD Portal
        </div>
        <div className="col-3 headerLayoutlogout ">
          <div
            className="userName"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <FontAwesomeIcon className="iconLayout" icon={faUser} />{" "}
            <u>{localStorage.getItem("customerId")}</u>
          </div>
          <div className="buttonLogout">
            <Button
              color="secondary"
              className=""
              onClick={() => {
                localStorage.setItem("isSession", false);
                localStorage.removeItem("customerId");
                localStorage.removeItem("UserId");
                history.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
