import React, { useState, useEffect } from "react";
//import { Button } from "reactstrap";
import httpService from "../../../services/http.service";
import "./sidebar.css";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminSidebar = (props) => {
  const getActiveKeyUser = () => {
    for (let i = 0; i < props.sidebarClassesUser.length; i++) {
      if (props.sidebarClassesUser[i] === "1") {
        return i.toString();
      }
    }
    return "";
  };

  const getActiveKeyProperty = () => {
    for (let i = 0; i < props.sidebarClassesProperty.length; i++) {
      if (props.sidebarClassesProperty[i] === "1") {
        return i.toString();
      }
    }
    return "";
  };
  const getActiveKeyChannel = () => {
    for (let i = 0; i < props.sidebarClassesChannel.length; i++) {
      if (props.sidebarClassesChannel[i] === "1") {
        return i.toString();
      }
    }
    return "";
  };
  const toggleUserCard = (event, index) => {
    let x = [...props.sidebarClassesUser];
    let y = [...props.userButtons];
    for (let i = 0; i < x.length; i++) {
      if (i !== index) {
        y[i] = "fa-plus-circle";
        x[i] = "0";
      }
    }
    y[index] = x[index] === "1" ? "fa-plus-circle" : "fa-minus-circle";
    x[index] = x[index] === "1" ? "0" : "1";
    props.setuserButtons(y);
    props.setsidebarClassesUser(x);
  };

  const togglePropertyCard = (event, index) => {
    let x = [...props.sidebarClassesProperty];
    let y = [...props.propertyButtons];
    for (let i = 0; i < x.length; i++) {
      if (i !== index) {
        y[i] = "fa-plus-circle";
        x[i] = "0";
      }
    }
    y[index] = x[index] === "1" ? "fa-plus-circle" : "fa-minus-circle";
    x[index] = x[index] === "1" ? "0" : "1";
    props.setsidebarClassesProperty(x);
    props.setpropertyButtons(y);
  };
  const toggleChannelCard = (event, index) => {
    let x = [...props.sidebarClassesChannel];
    let y = [...props.channelsButtons];
    for (let i = 0; i < x.length; i++) {
      if (i !== index) {
        y[i] = "fa-plus-circle";
        x[i] = "0";
      }
    }
    y[index] = x[index] === "1" ? "fa-plus-circle" : "fa-minus-circle";
    x[index] = x[index] === "1" ? "0" : "1";
    props.setsidebarClassesChannel(x);
    props.setchannelsButtons(y);
  };
  const checkProperty= (propArray, id)=>{
    return propArray.some((el) =>{
      return el.PropertyId === id;
    });
  }
  return (
    <div className="encoderBar">
      <div>
        <div className="adminView">Super-Admin View</div>
      </div>
      <div>
        <Accordion className="left-sidefixed" activeKey={getActiveKeyUser()}>
          {Object.entries(props.allData).length > 0 &&
            props.allData.users.map((user, userindex) => {
              return (
                <Card
                  key={userindex}
                  className="leftCard card-sidebar change-margin-top"
                  hidden={user.type == "admin" || user.customerId=="Admin"}
                >
                  <Card.Header eventKey={userindex.toString()}>
                    <i
                      className={
                        "cus-pointer fa head circlegreen " +
                        props.userButtons[userindex]
                      }
                      style={{ color: "white" }}
                      onClick={(event) => toggleUserCard(event, userindex)}
                    ></i>{" "}
                    <href
                      className={
                        "headcustm-btn color-inherit text-dec-underline"
                      }
                      onClick={(event) => toggleUserCard(event, userindex)}
                    >
                      {user.customerId}
                    </href>
                  </Card.Header>
                  <Accordion.Collapse eventKey={userindex.toString()}>
                    <Card.Body className="card-body2">
                      <Accordion activeKey={getActiveKeyProperty()}>
                        {props.allData.property.map(
                          (property, propertyindex) => {
                            if (property.UserId === user._id) {
                              return (
                                <Card
                                  key={propertyindex}
                                  className="card-sidebar leftcard"
                                >
                                  <Card.Header
                                    eventKey={propertyindex.toString()}
                                  >
                                    <i
                                      className={
                                        "cus-pointer fa head circlegreen " +
                                        props.propertyButtons[propertyindex]
                                      }
                                      style={{ color: "white" }}
                                      onClick={(event) =>
                                        togglePropertyCard(event, propertyindex)
                                      }
                                    ></i>{" "}
                                    <href
                                      className={
                                        "headcustm-btn color-inherit text-dec-underline"
                                      }
                                      onClick={(event) =>
                                        togglePropertyCard(event, propertyindex)
                                      }
                                      style={{ color: "white" }}
                                    >
                                      {property.Name}
                                    </href>
                                  </Card.Header>
                                  <Accordion.Collapse
                                    eventKey={propertyindex.toString()}
                                  >
                                    <Card.Body className="card-body2">
                                      <Accordion
                                        activeKey={getActiveKeyChannel()}
                                      >
                                        {props.allData.channels.map(
                                          (channel, channelindex) => {
                                            if (
                                              // channel.PropertyId ===
                                              // property._id
                                              checkProperty(channel.PropertyType, property._id)
                                            ) {
                                              return (
                                                <Card
                                                  key={channelindex}
                                                  className="card-sidebar leftcard"
                                                >
                                                  <Card.Header
                                                    eventKey={channelindex.toString()}
                                                  >
                                                    
                                                    <href
                                                      className={
                                                        "headcustm-btn color-inherit text-dec-underline"
                                                      }
                                                      onClick={(event) =>
                                                        toggleChannelCard(
                                                          event,
                                                          channelindex
                                                        )
                                                      }
                                                      style={{ color: "white", marginLeft:"4px" }}
                                                    >
                                                      {channel.channelName}
                                                    </href>
                                                  </Card.Header>
                                                </Card>
                                              );
                                            } else {
                                              return <div></div>;
                                            }
                                          }
                                        )}
                                      </Accordion>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              );
                            } else {
                              return <div></div>;
                            }
                          }
                        )}
                      </Accordion>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
};

export default AdminSidebar;
