import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import "../layout/layout.css";
import "./preview.css";
import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { Accordion } from "react-bootstrap";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import httpService from "../../../services/http.service";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../common/loader";
import {
  faFolder,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import LayoutSelection from "../../../layoutselection";
import Layout from "../layout/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import LayoutSelectionEdit from "../../../layoutselectionEdit";

let Preview = (props) => {
  const history = useHistory();
  const ref = useRef(null);
  const [modaladdLayout, setmodaladdLayout] = useState(false);
  const [modaleditLayout, setmodaleditLayout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modaleditLayoutProp, setmodaleditLayoutProp] = useState(false);
  const [modaleditLayoutConfirm, setmodaleditLayoutConfirm] = useState(false);
  const [LayoutIDModel, setLayoutIDModel] = useState("");
  const [LayoutIDModelCheck, setLayoutIDModelCheck] = useState(false);
  const [LayoutIDName, setLayoutIDName] = useState("");
  const [layoutnameprop, setlayoutnameprop] = useState("");
  const [layoutidprop, setlayoutidprop] = useState("");
  const [layoutpropertyprop, setlayoutpropertyprop] = useState({});
  const [layoutName, setLayoutName] = useState(false);
  const [editLname, setEditLname] = useState("");
  const [borderWidthProp, setborderWidthProp] = useState(5);
  const [borderColorProp, setborderColorProp] = useState("#000");
  const [addwidgetDelete, setaddwidgetDelete] = useState([]);
  const [LayoutDataObject, setLayoutDataObject] = useState({});
  const [layoutidTrue, setlayoutidTrue] = useState("");

  useEffect(()=>{
    showLoader();
    let string = window.location.href.split("/content/").length > 1
    ? window.location.href.split("/content/")[1].split("/")[0]
    : ""
    setlayoutidTrue(string);
    hideLoader();
  },[])

  const editLayoutN = async () => {
    let dataPost = {
      id: LayoutIDModel,
      name: editLname,
    };
    let data = await httpService
      .CreateUpdate("updateSelectedLayoutName", dataPost)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      toast.success("Layout Name Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLayoutIDName(editLname);
      layoutData();
    }
  };

  const toggleLayoutName = async () => {
    setLayoutName((prevState) => !prevState);
  };
  const toggleAddLayout = () => setmodaladdLayout((prevState) => !prevState);
  const toggleeditLayoutProp = () => setmodaleditLayoutProp((prevState) => !prevState);
  const toggleEditConfirm = () =>
    setmodaleditLayoutConfirm((prevState) => !prevState);
  const toggleeditLayout = () => {
    showLoader();
    if (modaleditLayout) {
      toggleEditConfirm();
    } else {
      setmodaleditLayout(!modaleditLayout);
      layoutData();
    }
    hideLoader();
  };
  const [widgetList, setwidgetList] = useState([]);
  const [widgetLoading, setwidgetLoading] = useState(false);
  const [layoutArray, setlayoutArray] = useState([]);
  const [widthLayout, setwidthLayout] = useState(0);
  let dataUserPost = { userID: localStorage.getItem("UserId") };

  useEffect(() => {
    if (ref && ref.current && ref.current.offsetWidth) {
      setwidthLayout(parseInt(ref.current.offsetWidth));
    }
  }, [
    modaleditLayout,
    widgetList,
    widgetLoading,
    ref,
    widthLayout,
    layoutArray,
  ]);
  useEffect(() => {
    if (ref && ref.current && ref.current.offsetWidth) {
      // console.log(ref.current.offsetWidth);
      setwidthLayout(parseInt(ref.current.offsetWidth));
    }
  });
  useEffect(() => {
    layoutData();
  }, []);
  useEffect(()=>{
  },[layoutArray])

  const layoutData = async () => {
    showLoader();
    let LayoutArraydata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });
    setlayoutArray(LayoutArraydata.data.data);
    let dataLayouts = LayoutArraydata.data.data;
    let dataObject = {};
    // for(let i =0; i< LayoutArraydata.data.data.length; i++){
    //   if(dataObject[`${dataLayouts[i].PropertyName}`]){
    //     dataObject[`${dataLayouts[i].PropertyName}`].push(dataLayouts[i]);
    //   }else{
    //     dataObject[`${dataLayouts[i].PropertyName}`] = [dataLayouts[i]];
    //   }

    // }
    // let dataObject = {};
    // for(let i =0; i< dataLayouts.length; i++){
    //     for(let j=0;j<dataLayouts[i].propertyData.length;j++){
    //       if(dataObject[`${dataLayouts[i].propertyData[j].label}`])
    //      {
    //         dataObject[`${dataLayouts[i].propertyData[j].label}`].push(dataLayouts[i]);
    //       }
    //      else{
    //       dataObject[`${dataLayouts[i].propertyData[j].label}`] = [dataLayouts[i]];
    //     }
    //     }

    //    }
    for (let i = 0; i < dataLayouts.length; i++) {
      if(dataLayouts[i].propertyData && dataLayouts[i].propertyData.length > 0){
        for (let j = 0; j < dataLayouts[i].propertyData.length; j++) {
          if (dataObject[`${dataLayouts[i].propertyData[j].label}`]) {
            dataObject[`${dataLayouts[i].propertyData[j].label}`].push(
              dataLayouts[i]
            );
          } else {
            dataObject[`${dataLayouts[i].propertyData[j].label}`] = [
              dataLayouts[i],
            ];
          }
        }
      }else{
        if(dataObject[`Undefined Property`]){
          dataObject[`Undefined Property`].push(dataLayouts[i]);
        }else{
          dataObject[`Undefined Property`] = [dataLayouts[i]];
        }
      }
      
    }
    setLayoutDataObject(dataObject);
    setwidgetLoading(true);
    hideLoader();
  };

  //   const getWidgets = async () => {
  //     let dataPost = {
  //     //   "layout_id" : props.selectedLayoutID
  //     }
  //     let widgetdata = await httpService.CreateUpdate("getwidgetsApi", dataPost).catch((err) => {
  //       console.log(err);
  //     });
  //     setwidgetList(widgetdata.data.data);
  //     setwidgetLoading(true);
  //   };

  const layoutarrayretrieve = async () => {
    let LayoutArraydata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });
    setlayoutArray(LayoutArraydata.data.data);
  };
  const removeLayout = async (layout_id) => {
    let dataPost = {
      layout_id: layout_id,
    };
    let widgetdata = await httpService
      .CreateUpdate("removelayoutAPI", dataPost)
      .catch((err) => {
        console.log(err);
      });
    let LayoutArraydata = await httpService
      .CreateUpdate("getSelectedLayout", dataUserPost)
      .catch((err) => {
        console.log(err);
      });
    toast.success("Layout removed ", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setlayoutArray(LayoutArraydata.data.data);
    layoutData();
  };
  const showLayout = (id) => {
    history.push(window.location.origin + "/view/" + id + "/");
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const layoutExists = (name, arr) => {
    return arr.some(function(el) {
      return el.value === name;
    }); 
  }
  const showLoader=()=>{
    setLoading(true);
  }
  const hideLoader=()=>{
    setLoading(false);
  }
  return (
    <div className="mainlayout row">
      {props.showProperty ? (
        <div
          className="mainClass mainClassLayouts"
          style={{ paddingTop: "90px", marginRight: "10px" }}
        >
        {loading ? <Loader/> : null}

          <div className="form-boxdiv ">
            <div className="row form-boxtopline5 mb-2">
              <div className="col-9">
                <b>LAYOUTS {"  "} </b>
                <Button className="  btn btn-primary mt-1 addwidgetButton">
                  <b>
                    <div onClick={toggleAddLayout}> + Add Layout</div>
                  </b>
                </Button>
              </div>
              <div className="col-3 headerLayoutgoback">
                <div
                  // color="primary"
                  // className="form-control"
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                >
                  <Button color="primary">Go Back</Button>
                </div>
              </div>
            </div>
            <div
              className="custom-control custom-checkbox"
              //   style={{ display: "inline-block" }}
            >
              <div
                style={{
                  // margin: "0.7%",
                  padding: "10px",
                  border: "1.4px solid gray",
                }}
              >
                <div className="row dataheading">
                  <div className="col-4 ">
                    <b>Layout Name</b>
                  </div>
                  <div className="col-4 ">
                    <b> Edit Layout </b>
                  </div>
                  {/*<div className="col-2 ">
                  <b>Select Layout</b>
                </div>*/}

                  <div className="col-4 ">
                    <b>View Layout</b>
                  </div>
                  {/*<div className="col-2 ">
                  <b>Delete Layout</b>
              </div>*/}
                </div>
                {layoutArray.map((e, i) => {
                  return (
                    <div>
                      {layoutExists(layoutidTrue, e.propertyData) ? (
                        <div className="row datarows">
                          <div className="col-4 " style={{ paddingTop: "4px", cursor: "pointer" }} onClick = {()=>{
                            toggleeditLayoutProp();
                            setlayoutnameprop(e.name);
                            setlayoutpropertyprop(e.propertyData);
                            setlayoutidprop(e._id);
                          }}>
                            {e.name != undefined && e.name != "" ? (
                              <div>{e.name}</div>
                            ) : (
                              <div>Layout</div>
                            )}
                          </div>
                          <div className="col-4 ">
                            <Button
                              onClick={() => {
                                console.log(e._id);
                                setLayoutIDModel(e._id);
                                setLayoutIDName(e.name);
                                setEditLname(e.name);
                                e.color
                                  ? setborderColorProp(e.color)
                                  : setborderColorProp("#000");
                                e.width
                                  ? setborderWidthProp(e.width)
                                  : setborderWidthProp("3");
                                setLayoutIDModelCheck(e.checked);
                                toggleeditLayout();
                              }}
                              color="lik"
                              style={{ transform: "scale(1.2)" }}
                            >
                              <i className="edit outline icon"></i>
                            </Button>{" "}
                            {}
                          </div>
                          {/*<div className="col-2">
                      <input
                        type="checkbox"
                        className="checkboxLayout"
                        value={e._id}
                        checked={e.checked}
                        onChange={async (event) => {
                          setLayoutIDModelCheck(!e.checked);
                          let dataPost = {
                            id: e._id,
                            checked: !e.checked,
                          };
                          let data = await httpService
                            .CreateUpdate("updateSelectedLayout", dataPost)
                            .catch((err) => {
                              console.log(err);
                            });
                          let LayoutArraydata = await httpService
                            .CreateUpdate("getSelectedLayout", dataUserPost)
                            .catch((err) => {
                              console.log(err);
                            });
                          setlayoutArray(LayoutArraydata.data.data);
                        }}
                      ></input>
                      </div>*/}
                          <div className="col-4 " style={{ paddingTop: "4px" }}>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              to={`/view/${e._id}`}
                            >
                              View
                            </Link>
                            {/* <Button color="primary" onClick={() => showLayout(e._id)}>
                        <u>View</u>
                      </Button> */}
                          </div>
                          {/*<div className="col-2 ">
                      <Button
                        color="danger"
                        onClick={() => removeLayout(e._id)}
                      >
                        <FontAwesomeIcon
                          className="icon"
                          icon={faTrash}
                          color="danger"
                        />
                      </Button>
                    </div>*/}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mainClass mainClassLayouts">
        {loading ? <Loader/> : null}
          <div className="form-boxdiv ">
            <div className="row form-boxtopline5 mb-2">
              <div className="col-9">
                <b>LAYOUTS {"  "} </b>
                <Button className="  btn btn-primary mt-1 addwidgetButton">
                  <b>
                    <div onClick={toggleAddLayout}> + Add Layout</div>
                  </b>
                </Button>
              </div>
              <div className="col-3 headerLayoutgoback">
                <div
                  // color="primary"
                  // className="form-control"
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                >
                  <Button color="primary">Go Back</Button>
                </div>
              </div>
            </div>
            <div
              className="custom-control custom-checkbox"
              //   style={{ display: "inline-block" }}
            >
              <Accordion defaultActiveKey="0" style={{ paddingBottom: "20px" }}>
                {Object.entries(LayoutDataObject).map((item, Layoutindex) => {
                  return (
                    <Accordion.Item eventKey={Layoutindex}>
                      <Accordion.Header>
                        <b>{item[0]}</b>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div
                          style={{
                            margin: "0.7%",
                            padding: "10px",
                            border: "1.4px solid gray",
                          }}
                        >
                          <div className="row dataheading">
                            <div className="col-4 ">
                              <b>Layout Name</b>
                            </div>
                            <div className="col-2 ">
                              <b> Edit Layout </b>
                            </div>
                            <div className="col-2 ">
                              <b>Select Layout</b>
                            </div>

                            <div className="col-2 ">
                              <b>View Layout</b>
                            </div>
                            <div className="col-2 ">
                              <b>Delete Layout</b>
                            </div>
                          </div>
                          {item[1].map((e, i) => {
                            return (
                              <div className="row datarows">
                                <div
                                  className="col-4 "
                                  style={{ paddingTop: "4px", cursor: "pointer" }}
                                  onClick = {()=>{
                                    toggleeditLayoutProp();
                                    setlayoutnameprop(e.name);
                                    setlayoutpropertyprop(e.propertyData);
                                    setlayoutidprop(e._id);
                                  }}
                                >
                                  {e.name != undefined && e.name != "" ? (
                                    <div>{e.name}</div>
                                  ) : (
                                    <div>Layout</div>
                                  )}
                                </div>
                                <div className="col-2 ">
                                  <Button
                                    onClick={() => {
                                      console.log(e._id);
                                      setLayoutIDModel(e._id);
                                      setLayoutIDName(e.name);
                                      setEditLname(e.name);
                                      e.color
                                        ? setborderColorProp(e.color)
                                        : setborderColorProp("#000");
                                      e.width
                                        ? setborderWidthProp(e.width)
                                        : setborderWidthProp("3");
                                      setLayoutIDModelCheck(e.checked);
                                      toggleeditLayout();
                                    }}
                                    color="lik"
                                    style={{ transform: "scale(1.2)" }}
                                  >
                                    <i className="edit outline icon"></i>
                                  </Button>{" "}
                                  {}
                                </div>
                                <div
                                  className="col-2"
                                  style={{ paddingTop: "4px" }}
                                >
                                  <input
                                    type="checkbox"
                                    className="checkboxLayout"
                                    value={e._id}
                                    checked={e.checked}
                                    onChange={async (event) => {
                                      setLayoutIDModelCheck(!e.checked);
                                      let dataPost = {
                                        id: e._id,
                                        checked: !e.checked,
                                      };
                                      let data = await httpService
                                        .CreateUpdate(
                                          "updateSelectedLayout",
                                          dataPost
                                        )
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                      // let LayoutArraydata = await httpService
                                      //   .CreateUpdate("getSelectedLayout", dataUserPost)
                                      //   .catch((err) => {
                                      //     console.log(err);
                                      //   });
                                      // setlayoutArray(LayoutArraydata.data.data);
                                      layoutData();
                                    }}
                                  ></input>
                                </div>
                                <div
                                  className="col-2 "
                                  style={{ paddingTop: "4px" }}
                                >
                                  <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    to={`/view/${e._id}`}
                                  >
                                    View
                                  </Link>
                                  {/* <Button color="primary" onClick={() => showLayout(e._id)}>
                        <u>View</u>
                      </Button> */}
                                </div>
                                <div className="col-2 ">
                                  <Button
                                    color="danger"
                                    onClick={() => removeLayout(e._id)}
                                    style={{ transform: "scale(0.7)" }}
                                  >
                                    <FontAwesomeIcon
                                      className="icon"
                                      icon={faTrash}
                                      color="danger"
                                    />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      )}
      <div className="helpQuestion">
        <Link to="/faq">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="iconHelp"
            color="primary"
          />
        </Link>
      </div>
      <Modal size="xl" isOpen={modaladdLayout} toggle={toggleAddLayout}>
        <ModalHeader toggle={toggleAddLayout}>Choose Layout</ModalHeader>
        <ModalBody>
          <div>
            <LayoutSelection
              setlayoutCheck={(p) => {
                toggleAddLayout();
                layoutarrayretrieve();
                layoutData();
              }}
            />
          </div>
        </ModalBody>
      </Modal>
      <Modal size="md" isOpen={modaleditLayoutProp} toggle={toggleeditLayoutProp}>
        <ModalHeader toggle={toggleeditLayoutProp}>Edit Layout</ModalHeader>
        <ModalBody>
          <div>
            <LayoutSelectionEdit
              setlayoutCheck={(p) => {
                toggleeditLayoutProp();
                layoutarrayretrieve();
                layoutData();
              }}
              layoutName = {layoutnameprop}
              propertyData = {layoutpropertyprop}
              id = {layoutidprop}
            />
          </div>
        </ModalBody>
      </Modal>

      <Modal
        size="xl"
        isOpen={modaleditLayout}
        fullscreen
        toggle={toggleeditLayout}
        className="modaleditLayout"
        style={{ overflowY: "scroll" }}
      >
        <ModalHeader
          toggle={toggleeditLayout}
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          Layout( <b>{LayoutIDName}</b>)
          <Button
            onClick={() => {
              setLayoutName(true);
            }}
            color="lik"
            className="shadow-none"
          >
            {" "}
            <i className="edit outline icon editLayoutName"></i>
          </Button>
        </ModalHeader>
        <ModalBody>
          <div className="editLayoutModal">
            <Layout
              rightContentType={"layout"}
              //   setrightContentType = {props.setrightContentType}
              selectedLayoutID={LayoutIDModel}
              borderColor={borderColorProp}
              borderWidth={borderWidthProp}
              preview={false}
              view={false}
              toggleeditLayout={toggleeditLayout}
              addwidgetDelete={addwidgetDelete}
              setaddwidgetDelete={setaddwidgetDelete}
              modaleditLayoutConfirm={modaleditLayoutConfirm}
              toggleEditConfirm={toggleEditConfirm}
              modaleditLayout={modaleditLayout}
              setmodaleditLayout={setmodaleditLayout}
            ></Layout>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={layoutName} toggle={toggleLayoutName}>
        <ModalHeader toggle={toggleLayoutName}>Edit Layout Name</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <b>Layout Name</b>
                <b style={{ color: "red" }}></b>
                <input
                  type="text"
                  className="form-control layoutName"
                  value={editLname}
                  onChange={(e) => setEditLname(e.target.value)}
                ></input>
              </div>
              <Button
                color="primary"
                type="submit"
                className="form-control layoutName "
                onClick={() => {
                  toggleLayoutName();
                  editLayoutN();
                }}
              >
                Update
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Preview;
