import { useState, useEffect } from "react";
import "../layout/layout.css";
import React from "react";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import httpService from "../../../services/http.service";
import "./slideshow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faDesktop,
  faImages,
  faCog,
  faSave,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
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
import FileUpload from "../file-upload/file-upload.component";
import secretutils from "../../../secretutils.json";
import DropboxChooser from "react-dropbox-chooser";
import GooglePicker from "react-google-picker";
// import { GraphFileBrowser } from "@microsoft/file-browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDrivePicker from 'react-google-drive-picker'

var validUrl = require("valid-url");

let Slideshow = (props) => {
  const [openPicker, authResponse] = useDrivePicker();  
  const [widgetList, setwidgetList] = useState([]);
  const [widgetLoading, setwidgetLoading] = useState(false);
  const [datarefresh, setdatarefresh] = useState(false);

  const [modalAddSlide, setmodalAddSlide] = useState(false);
  const [modaleditSlide, setmodaleditSlide] = useState(false);
  const [modalOneDrive, setmodalOneDrive] = useState(false);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideabout, setslideabout] = useState("");
  const [slideshraeWebLink, setslideshraeWebLink] = useState("");
  const [slidetime, setslidetime] = useState(3);

  const [slidetype, setslidetype] = useState("");
  const [editIndex, seteditIndex] = useState(-1);
  const [addslideContent, setaddslideContent] = useState({});
  const [slideSharepicture, setslideSharePicture] = useState({
    Images: [],
  });
  const toggleOneDrive = () => setmodalOneDrive((prevState) => !prevState);

  const toggleAddSlide = () =>
    setmodalAddSlide((prevState) => {
      if (prevState == true) {
        setslideshraeWebLink("");
        setslideSharePicture({
          Images: [],
        });
        setSlideTitle("");
        setslideabout("");
        setaddslideContent({});
        setslidetype("");
        setslidetime(3);
      }
      return !prevState;
    });
  const toggleeditSlide = () =>
    setmodaleditSlide((prevState) => {
      if (prevState == true) {
        setslideshraeWebLink("");
        setslideSharePicture({
          Images: [],
        });
        setSlideTitle("");
        setslideabout("");
        setaddslideContent({});
        setslidetype("");
        setslidetime(3);
      }
      return !prevState;
    });

  const toggleData = () => setdatarefresh((prevState) => !prevState);

  useEffect(async () => {
    let dataPost = {
      layout_id: props.selectedLayoutID,
    };
    let widgetdata = await httpService
      .CreateUpdate("getwidgetsApi", dataPost)
      .catch((err) => {
        console.log(err);
      });
    // setwidgetList(widgetdata.data);
    setwidgetList(props.widgetList);
    setwidgetLoading(true);
  }, []);

  useEffect(() => {}, [widgetLoading]);

  useEffect(() => {
    // getWidgets();
  }, [datarefresh]);

  const oneDriveFilePicker = () => {
    toggleOneDrive();
  };
  const getAuthenticationToken = () => {
    return Promise.resolve(
      "EwCYA8l6BAAUwihrrCrmQ4wuIJX5mbj7rQla6TUAAbtqHdRksO36h6sKq+oqEaMinsfZuefV3kkfpKgLnUc3Drnhy8ogTqxinG8nE7kSZZamS+EVGfEr0hx1tfBv1C4Qyex5PAA6sIv63eZCRtcC76mMCccP6vzTWZmDISOtOZjcw5eJJfvwH3yDP97rjwJWnonhkmCqGaGrObeqHf1uz5H6hkGGTwS2u4QwDSFopceaVs8QSA6kXhFvt9ciYFCDEwkxRUolXEkm2+X7hwq13cX9UzYzg7BUErsfce9Amb6w92qLGYgnGu6jQqZK+jLZvNkzaa7eHf8jw43p9QfBC8W6BODS1D0FKLcugJ37MWYG6wYETFll0A4sGMv2hywDZgAACK1UtgDjzFsWaAJyNkl9juKLktKmmqPKry3+mY9QYG+2z3am6b7uDS1kqqrEFtFWFFkYyF7xvmGoRrDGnWMuH6OU995UClA/Bl6IkUZOB72N8HqNsry7fZv5aXjehJ+n325XMc09YcQRltowxQkt7nG5Bg7Zn/NW5PVZi2YECFeSW8IRvMn18qcjnZ0LOV+xOUCbaDD4kTVovowK02E7W2YoSsT6ataZt/Ds1C3lDEqNoTDrZ8Th7fe0mP6VcszQPz371Asnu1ZKEPvUKW89XOp/ieg0USIh9qUaBAM00XEfjAiR+KfktxZVP1nGFyJJljywcwC9TaeV++0r5MTHAeidkGAdITihm9kU/sVfiwOP/KXnXnsE0urgbN9t66CspFVe5SmAHicvuEf2TVW74LUDmc90OcriHfgMJplrXRWJl/bOhvozU/ZLLr9M3qCLV9A13EcDOWzfpwT5gYPopzfeekaFKfo3bdmsmlvT2T4nOuW5EO3Ixo5VOQL5eiDATWZ6fUhGzTXPFG+Q383ORPLhR0vMvNNIL6OSw30EK/bilE25osgPGgAJE0oE1ZJ+xbMgpm5Y0z4admK6GZ6b4EhMzVuxeVEcW+Z2lU5mEsSH/E/u1nc1bcnoe1xOGV7SA8tS5uYxsbQ9FV4+ZrkPRNoLuwp+8rzRKDXqkUjSn2EhnmXjCEijZ6/UAb9pFPmZntgamWpL0USDuswagzQyfonCDs4wbyqbA47IfCe+TTZ4WurKOtyIPPfTPKdgSUDrr4hCaTZ4iVp5P2o1vFkC4BWnwtHjxZdbOlTh6W+NxjNm/cV84fRIR3xzuCAQyM2N0Ga3rwI="
    );
  };
  const onSuccess = (keys) => {
    console.log("onSuccess", keys);
  };
  const onSubmit = (e) => {
    e.preventdefault();
  };
  const handleSubmitPictureSlideshare = async (url, name) => {
    let dataarray = addslideContent.content;
    dataarray.push([url, "image", name, slideTitle, slideabout, slidetime]);
    let data = {
      type: "slideshare",
      id: addslideContent._id,
      content: dataarray,
    };
    // let widgetdata = await httpService
    //   .CreateUpdate("addslidetoslideshowApi", data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    for (let i = 0; i < props.widgetList.length; i++) {
      if (data.id == props.widgetList[i]._id) {
        let widgetlistData = [...props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...props.editWidgeContent];
        editwidgetlistData.push(data);

        props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
    toast.success("Slide Added", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setslideshraeWebLink("");
    setslideSharePicture({
      Images: [],
    });
    setSlideTitle("");
    setslideabout("");
    setaddslideContent({});
    toggleAddSlide();
    setmodalAddSlide(false);
    // props.toggleSlideshare();
  };

  const AddtoSlideshare = async () => {
    let dataarray = addslideContent.content;
    { var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(slideshraeWebLink.match(p)){
     
  }
  else {
    toast.warn("Please Enter the Valid YouTube URL", {
           position: "bottom-left",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
         return;
  }}
    if (slideshraeWebLink != "") {
      dataarray.push([
        slideshraeWebLink,
        "weblink",
        slideTitle,
        slideabout,
        slidetime,
      ]);
    }
   
    let data = {
      type: "slideshare",
      id: addslideContent._id,
      content: dataarray,
    };
    // let widgetdata = await httpService
    //   .CreateUpdate("addslidetoslideshowApi", data).then(res=>res.data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    for (let i = 0; i < props.widgetList.length; i++) {
      if (data.id == props.widgetList[i]._id) {
        let widgetlistData = [...props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...props.editWidgeContent];
        editwidgetlistData.push(data);

        props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
      // if(widgetdata.message === 'Successful'){
        toast.success("Slide Added ", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      // }
    
    setslideshraeWebLink("");
    setslideSharePicture({
      Images: [],
    });
    setSlideTitle("");
    setslideabout("");
    setaddslideContent({});
    toggleAddSlide();
    setmodalAddSlide(false);
    props.toggleSlideshare();
    return;
  };

  const getId = (url) => {
    const regExp =
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
    const match = url.match(regExp);

    return match[1];
  };

  const editSlideshoecontent = (id, index, edit) => {
    let array = [...edit.content];
    let dataArray = array[index];
    seteditIndex(index);
    if (dataArray[1] == "image") {
      setSlideTitle(dataArray[3]);
      setslideabout(dataArray[4]);
      setslidetime(dataArray[5]);
      setslidetype("image");
      setslideSharePicture({
        Images: [],
      });
    } else {
      setSlideTitle(dataArray[2]);
      setslideabout(dataArray[3]);
      setslideshraeWebLink(dataArray[0]);
      setslidetime(dataArray[4]);
      setslidetype("weblink");
    }
    toggleeditSlide();
  };
  const updateSlide = async (e) => {
    let dataarray = [];
   if(slidetype == "weblink"){ 
     var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(slideshraeWebLink.match(p)){
    }
    else {
      toast.warn("Please Enter the Valid YouTube URL", {
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
    dataarray = addslideContent.content;
    if (slidetype == "weblink") {
      dataarray[editIndex] = [
        slideshraeWebLink,
        "weblink",
        slideTitle,
        slideabout,
        slidetime,
      ];
    }
  }else{
    dataarray = addslideContent.content;
    dataarray[editIndex] = [
      dataarray[editIndex][0],
      "image",
      dataarray[editIndex][2],
      slideTitle,
      slideabout,
      slidetime,
    ];
  }
    
    // if(slidetype == "image"){
    //     await getBase64(slideSharepicture.Images[0])
    //       .then(result => {
    //         baseImage = result;
    //         console.log("File Is", baseImage);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //       dataarray[editIndex]  =[baseImage,"image", slideSharepicture.Images[0].name, slideTitle, slideabout, slidetime];
    //       baseImage = "";
    // }
    let data = {
      type: "slideshare",
      id: addslideContent._id,
      content: dataarray,
    };
    // let widgetdata = await httpService
    //   .CreateUpdate("addslidetoslideshowApi", data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    for (let i = 0; i < props.widgetList.length; i++) {
      if (data.id == props.widgetList[i]._id) {
        let widgetlistData = [...props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...props.editWidgeContent];
        editwidgetlistData.push(data);

        props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
    toast.success("Slide Modified", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setslideshraeWebLink("");
    setslideSharePicture({
      Images: [],
    });
    setSlideTitle("");
    setslideabout("");
    setslidetime(3);
    setaddslideContent({});
    toggleeditSlide();
    // props.toggleSlideshare();
  };
  const editSlideSlidsharePhoto = async (url, name) => {
    let dataarray = addslideContent.content;
    dataarray[editIndex] = [
      url,
      "image",
      name,
      slideTitle,
      slideabout,
      slidetime,
    ];
    let data = {
      type: "slideshare",
      id: addslideContent._id,
      content: dataarray,
    };
    // let widgetdata = await httpService
    //   .CreateUpdate("addslidetoslideshowApi", data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    for (let i = 0; i < props.widgetList.length; i++) {
      if (data.id == props.widgetList[i]._id) {
        let widgetlistData = [...props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...props.editWidgeContent];
        editwidgetlistData.push(data);

        props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
    toast.success("Slide Modified", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setslideshraeWebLink("");
    setslideSharePicture({
      Images: [],
    });
    setSlideTitle("");
    setslideabout("");
    setslidetime(3);
    setaddslideContent({});
    // props.toggleSlideshare();
  };
  const removeSlideshoecontent = async (id, index, edit) => {
    let array = [...edit.content];
    array.splice(index, 1);
    let data = {
      id: id,
      type: "slideshare",
      content: array,
    };
    // let widgetdata = await httpService
    //   .CreateUpdate("removeslideAPI", data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    for (let i = 0; i < props.widgetList.length; i++) {
      if (data.id == props.widgetList[i]._id) {
        let widgetlistData = [...props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...props.editWidgeContent];
        editwidgetlistData.push(data);
        props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }

    // if (widgetdata.data.message == "Successful") {
      toggleData();
      toast.success("Slide Deleted", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    // }
  };
  const getpictureurl = (url) => {
    let finalUrl = "";
    let urlreturn = "";
    if (url.includes("drive.google")) {
      finalUrl = url.substring(
        url.indexOf("/file/d/") + 8,
        url.indexOf("/view")
      );
      urlreturn = "https://drive.google.com/uc?export=view&id=" + finalUrl;
    } else if (url.includes("dropbox.com")) {
      urlreturn = url.replace("dl=0", "raw=1");
    }
    return urlreturn;
  };
  const handleOpenPicker = () => {
    openPicker({
      clientId: props.driveClientid,
      developerKey: props.drivekey,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      viewMimeTypes: ['image/jpeg', 'image/png'],
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
        if (data.docs) {
          console.log("on change:", data.docs);
          data.docs.map((i) => {
            handleSubmitPictureSlideshare(i.url, i.name);
          });
        }
      },
    })
  }
  const handleOpenPicker2 = () => {
    openPicker({
      clientId: props.driveClientid,
      developerKey: props.drivekey,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      viewMimeTypes: ['image/jpeg', 'image/png'],
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
        if (data.docs) {
          console.log("on change:", data.docs);
          data.docs.map((i) => {
            editSlideSlidsharePhoto(i.url, i.name);
          });
        }
      },
    })
  }



  return (
    <div>
      {widgetLoading &&
        props.widgetList.map((e, i) => {
          return (
            <div>
              {(e.type == "slideshare" || e.type == "initialSlideshare") &&
              e._id == props.widgetId ? (
                <div classname="slideheadingmain">
                  <div className="slideheading">
                    <div className="slideheadingtitle">Slideshow</div>
                    <Button
                      color="primary"
                      type="submit"
                      className=" Addslidebutton"
                      onClick={() => {
                        toggleAddSlide();
                        setaddslideContent(e);
                      }}
                    >
                      <b>+</b> Add a Slide
                    </Button>
                    {e.type == "initialSlideshare" ? (
                      <div hidden>{(e.content = [])}</div>
                    ) : (
                      <div hidden></div>
                    )}
                    <div className="slidesHeading">
                      {e.content.map((item, index) => {
                        return (
                          <div className="">
                            {item[1] == "image" ? (
                              <div className="row">
                                <div className="col-10">
                                  <img
                                    className="pictureslide"
                                    width="50"
                                    height="50"
                                    src={getpictureurl(item[0])}
                                    alt="image"
                                  />{" "}
                                  <div className="pictureslidename">
                                    <b>{item[3]}</b>
                                  </div>
                                </div>
                                <Button
                                  color="primary"
                                  className="col-1 SlideButton"
                                  onClick={() => {
                                    setaddslideContent(e);
                                    editSlideshoecontent(e._id, index, e);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="icon"
                                    icon={faEdit}
                                  />
                                </Button>
                                <Button
                                  color="danger"
                                  className="col-1 SlideButton"
                                  onClick={() =>
                                    removeSlideshoecontent(e._id, index, e)
                                  }
                                >
                                  <FontAwesomeIcon
                                    className="icon"
                                    icon={faTrash}
                                  />
                                </Button>
                              </div>
                            ) : (
                              <div className="row">
                                <div className="col-10">
                                  <img
                                    className="pictureslide"
                                    width="50"
                                    height="50"
                                    src={
                                      "http://img.youtube.com/vi/" +
                                      getId(item[0]) +
                                      "/0"
                                    }
                                    alt="image"
                                  />{" "}
                                  <div className="pictureslidename">
                                    {" "}
                                    <b>{item[2]}</b> {"  "} {"("} {item[0]}{" "}
                                    {")"}
                                  </div>
                                </div>
                                <Button
                                  color="primary"
                                  className="col-1 SlideButton"
                                  onClick={() => {
                                    setaddslideContent(e);
                                    editSlideshoecontent(e._id, index, e);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="icon"
                                    icon={faEdit}
                                  />
                                </Button>
                                <Button
                                  color="danger"
                                  className="col-1 SlideButton"
                                  onClick={() =>
                                    removeSlideshoecontent(e._id, index, e)
                                  }
                                >
                                  <FontAwesomeIcon
                                    className="icon"
                                    icon={faTrash}
                                  />
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}

      <Modal isOpen={modalAddSlide} toggle={toggleAddSlide}>
        <ModalHeader toggle={toggleAddSlide}>Add a new Slide</ModalHeader>
        <ModalBody>
          <div>
            <form  className="slidesharemainform">
              {/*<b>Enter the Title of Slide</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
              ></input>
              <b>Enter something about the Slide</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={slideabout}
                onChange={(e) => setslideabout(e.target.value)}
              ></input>*/}
              <b>Enter Timeframe of the Slide (in sec)</b>
              <input
                type="number"
                className="form-control slideshowTitle"
                value={slidetime}
                onChange={(e) => setslidetime(e.target.value)}
              ></input>
              <b>Select the Picture to upload</b>
              <div className="row">
                <div className="col-6 selectButton">
                  <DropboxChooser
                    appKey={props.dropboxkey}
                    success={async (files) => {
                      console.log("chose:", files);
                      await files.map((i) => {
                        handleSubmitPictureSlideshare(i.link, i.name);
                      });
                    }}
                    cancel={() => console.log("closed")}
                    multiselect={true}
                  >
                    <Button
                      className="form-control"
                      color="primary"
                      onClick={(event) => {
                        event.preventDefault();
                        // props.toggleSlideshare();
                      }}
                    >
                      <div className="row">
                        <div className="col-3">
                          <FontAwesomeIcon className="icon" icon={faImages} />
                        </div>
                        <div className="col-9">Select from dropbox</div>
                      </div>
                    </Button>
                  </DropboxChooser>
                </div>
                <div className="col-6 selectButton">
                  {/*<GooglePicker
                    clientId={props.driveClientid}
                    developerKey={props.drivekey}
                    scope={["https://www.googleapis.com/auth/drive.readonly"]}
                    onChange={async (data) => {
                      if (data.docs) {
                        console.log("on change:", data.docs);
                        data.docs.map((i) => {
                          handleSubmitPictureSlideshare(i.url, i.name);
                        });
                      }
                    }}
                    onAuthFailed={(data) =>
                      console.log("on auth failed:", data)
                    }
                    multiselect={false}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
                    viewId={"DOCS"}
                  >
                    <Button
                      className="form-control"
                      color="primary"
                      onClick={(event) => {
                        event.preventDefault();
                        setmodalAddSlide(false);
                        // props.toggleSlideshare();
                      }}
                    >
                      <div className="row">
                        <div className="col-3">
                          <FontAwesomeIcon className="icon" icon={faImages} />
                        </div>
                        <div className="col-9">Select from Drive</div>
                      </div>
                    </Button>
                    </GooglePicker>*/}
                  <Button
                      className="form-control"
                      color="primary"
                      onClick={(event) => {
                        event.preventDefault();
                        setmodalAddSlide(false);
                        handleOpenPicker();
                        // props.toggleSlideshare();
                      }}
                    >
                      <div className="row">
                        <div className="col-3">
                          <FontAwesomeIcon className="icon" icon={faImages} />
                        </div>
                        <div className="col-9">Select from Drive</div>
                      </div>
                    </Button>
                </div>
                <div className="col-3 selectButton"></div>
                {/* <div className="col-6 selectButton">
                  <Button
                    color="primary"
                    className="form-control"
                    onClick={() => {
                      oneDriveFilePicker();
                    }}
                  >
                    <div className="row">
                      <div className="col-3">
                        <FontAwesomeIcon className="icon" icon={faImages} />
                      </div>
                      <div className="col-9">Select from OneDrive</div>
                    </div>
                  </Button>
                </div> */}
              </div>
              <div className="orcenter"> OR </div>
              <b>Enter the url of youtube video</b>
              <input
                type="url"
                className="form-control websiteLink"
                value={slideshraeWebLink}
                onChange={(e) => setslideshraeWebLink(e.target.value)}
              ></input>
              {/*<button type="submit">Create New User</button>*/}
              <Button
                color="primary"
                className="form-control"
                onClick={AddtoSlideshare}
              >
                Add to Slideshare
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalOneDrive} toggle={toggleOneDrive}>
        <ModalHeader toggle={toggleOneDrive}>OneDrive Picker</ModalHeader>
        <ModalBody>
          <div>
            {/* <GraphFileBrowser
              getAuthenticationToken={getAuthenticationToken}
              onSuccess={onSuccess}
            /> */}
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modaleditSlide} toggle={toggleeditSlide}>
        <ModalHeader toggle={toggleeditSlide}>Edit Slide</ModalHeader>
        <ModalBody>
          <div>
            <form  className="slidesharemainform">
              {/*<b>Edit the Title of Slide</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
              ></input>
              <b>Edit about section of the Slide</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={slideabout}
                onChange={(e) => setslideabout(e.target.value)}
              ></input>*/}
              <b>Enter Timeframe of the Slide (in sec)</b>
              <input
                type="number"
                className="form-control slideshowTitle"
                value={slidetime}
                onChange={(e) => setslidetime(e.target.value)}
              ></input>
              {slidetype == "weblink" ? (
                <div>
                  <b>Edit the url of youtube video</b>
                  <input
                    type="url"
                    className="form-control websiteLink"
                    value={slideshraeWebLink}
                    onChange={(e) => setslideshraeWebLink(e.target.value)}
                  ></input>
                </div>
              ) : (
                <div>
                  <b>Select the Picture to replace</b>
                  <div className="row">
                    <div className="col-6 selectButton">
                      <DropboxChooser
                        appKey={props.dropboxkey}
                        success={async (files) => {
                          console.log("chose:", files);
                          await files.map((i) => {
                            editSlideSlidsharePhoto(i.link, i.name);
                          });
                        }}
                        cancel={() => console.log("closed")}
                        multiselect={true}
                      >
                        <Button
                          className="form-control"
                          color="primary"
                          onClick={(event) => {
                            event.preventDefault();
                            setmodaleditSlide(false);
                            // props.toggleSlideshare();
                          }}
                        >
                          <div className="row">
                            <div className="col-3">
                              <FontAwesomeIcon
                                className="icon"
                                icon={faImages}
                              />
                            </div>
                            <div className="col-9">Select from dropbox</div>
                          </div>
                        </Button>
                      </DropboxChooser>
                    </div>
                    <div className="col-6 selectButton">
                      {/*<GooglePicker
                        clientId={props.driveClientid}
                        developerKey={props.drivekey}
                        scope={[
                          "https://www.googleapis.com/auth/drive.readonly",
                        ]}
                        onChange={async (data) => {
                          if (data.docs) {
                            console.log("on change:", data.docs);
                            data.docs.map((i) => {
                              editSlideSlidsharePhoto(i.url, i.name);
                            });
                          }
                        }}
                        onAuthFailed={(data) =>
                          console.log("on auth failed:", data)
                        }
                        multiselect={false}
                        navHidden={true}
                        authImmediate={false}
                        mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
                        viewId={"DOCS"}
                      >
                        <Button
                          className="form-control"
                          color="primary"
                          onClick={(event) => {
                            event.preventDefault();
                            setmodaleditSlide(false);
                            // props.toggleSlideshare();
                          }}
                        >
                          <div className="row">
                            <div className="col-3">
                              <FontAwesomeIcon
                                className="icon"
                                icon={faImages}
                              />
                            </div>
                            <div className="col-9">Select from Drive</div>
                          </div>
                        </Button>
                        </GooglePicker>*/}
                      <Button
                          className="form-control"
                          color="primary"
                          onClick={(event) => {
                            event.preventDefault();
                            setmodaleditSlide(false);
                            handleOpenPicker2();
                            // props.toggleSlideshare();
                          }}
                        >
                          <div className="row">
                            <div className="col-3">
                              <FontAwesomeIcon
                                className="icon"
                                icon={faImages}
                              />
                            </div>
                            <div className="col-9">Select from Drive</div>
                          </div>
                        </Button>
                    </div>
                    <div className="col-3 selectButton"></div>
                    {/* <div className="col-6 selectButton">
                      <Button
                        color="primary"
                        className="form-control"
                        onClick={() => {
                          oneDriveFilePicker();
                        }}
                      >
                        <div className="row">
                          <div className="col-3">
                            <FontAwesomeIcon className="icon" icon={faImages} />
                          </div>
                          <div className="col-9">Select from OneDrive</div>
                        </div>
                      </Button>
                    </div> */}
                  </div>
                </div>
              )}
              <Button
                color="primary"
                className="form-control"
                onClick={updateSlide}
              >
                Save Slide
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Slideshow;
