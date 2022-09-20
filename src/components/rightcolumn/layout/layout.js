import { useState, useEffect, useRef } from "react";
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
import "./layout.css";
import gif1 from "../../../assets/gif1.gif";
import gif2 from "../../../assets/gif2.gif";
import gif3 from "../../../assets/gif3.gif";
import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import LocalStorageLayout from "../test";
// import LocalStorageLayoutOne from "../CustomLayoutOneTest";
import httpService from "../../../services/http.service";
import DropboxChooser from "react-dropbox-chooser";
import { useHistory } from "react-router-dom";
import secretutils from "../../../secretutils.json";
import ReactWeather, { useOpenWeather } from "react-open-weather";
// import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faDesktop,
  faImages,
  faCog,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import GooglePicker from "react-google-picker";
import bgImage from "../../../assets/image.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Loader from "../../common/loader";
import useDrivePicker from 'react-google-drive-picker'


let intervalWeather = setInterval(() => {}, 30000);
let Layout = (props) => {
  const history = useHistory();
  const ref = useRef(null);
  const [openPicker, authResponse] = useDrivePicker();  
  const [BgPicture, setBgPicture] = useState(bgImage);
  const [dropdownWidget, setdropdownWidget] = useState(false);
  const [addwidgettype, setaddwidgettype] = useState("");
  const [modalPicture, setmodalPicture] = useState(false);
  const [modalSlideShare, setmodalSlideShare] = useState(false);
  const [slideshraeWebLink, setslideshraeWebLink] = useState("");
  const [modalcongrats, setmodalcongrats] = useState(false);
  const [congratgif, setcongratgif] = useState("false");
  const [Congratulation, setCongratulation] = useState("");
  const [listarray, setlistarray] = useState([]);
  const [Slidesarray, setSlidesarray] = useState([]);
  const [listcontent, setlistcontent] = useState("");
  const [listcontentStatrt, setlistcontentStart] = useState("");
  const [listcontentStartDate, setlistcontentStartDate] = useState("");
  const [listcontentEndDate, setlistcontentEndDate] = useState("");
  const [listcontentEnd, setlistcontentEnd] = useState("");
  const [modallist, setmodallist] = useState(false);
  const [audioTitle, setaudioTitle] = useState("");
  const [slideTitle, setSlideTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [slideabout, setslideabout] = useState("");
  const [slidetime, setslidetime] = useState(3);
  const [weatherInput, setweatherInput] = useState("");
  const [weatherWind, setweatherWind] = useState("mi");
  const [weatherTemp, setweatherTemp] = useState("F");

  const [modalwebIframe, setmodalwebIframe] = useState(false);
  const [modalweather, setmodalweather] = useState(false);
  const [modalaudio, setmodalaudio] = useState(false);
  const [modalyoutubevideo, setmodalyoutubevideo] = useState(false);
  const [modalvideoPlayer, setmodalvideoPlayer] = useState(false);
  const [modalannouncement, setmodalannouncement] = useState(false);
  // const [modalOneDrive, setmodalOneDrive] = useState(false);
  const [modalBgPicture, setmodalBgPicture] = useState(false);
  const [weblinkframe, setweblinkframe] = useState("");
  const [youtubeVideo, setyoutubevideo] = useState("");
  const [videoPlayer, setvideoPlayer] = useState("");
  const [announcementtext, setannouncementtext] = useState("");
  const [driveClientid, setdriveClientid] = useState("");
  const [drivekey, setdrivekey] = useState("");
  const [dropboxkey, setdropboxkey] = useState("");
  const [weatherApiKey, setweatherApiKey] = useState("");
  const [layout, setlayout] = useState([]);
  const [audioArray, setaudioArray] = useState([]);
  const [audioArrayfetched, setaudioArrayfetched] = useState([]);
  const [audioIndex, setaudioIndex] = useState(0);
  const [widgetAudioArray, setwidgetAudioArray] = useState([]);
  const [selectedAudioId, setselectedAudioId] = useState("Background Music");
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const finalVolume = muted ? 0 : volume ** 2;

  const toggle = () => setdropdownWidget((prevState) => !prevState);
  const togglePicture = () => setmodalPicture((prevState) => !prevState);
  const toggleSlideShare = () => setmodalSlideShare((prevState) => !prevState);
  const togglecongrats = () => setmodalcongrats((prevState) => !prevState);
  const togglelist = () => setmodallist((prevState) => !prevState);
  const togglewebIframe = () => setmodalwebIframe((prevState) => !prevState);
  const toggleweather = () => setmodalweather((prevState) => !prevState);
  const toggleaudio = () => setmodalaudio((prevState) => !prevState);
  const toggleBgPicture = () => setmodalBgPicture((prevState) => !prevState);
  const toggleyoutubewidget = () =>
    setmodalyoutubevideo((prevState) => !prevState);
  const toggleVideoPlayer = () =>
    setmodalvideoPlayer((prevState) => !prevState);
  const toggleannouncement = () =>
    setmodalannouncement((prevState) => !prevState);
  // const toggleOneDrive = () => setmodalOneDrive((prevState) => !prevState);

  const [layoutError, setlayoutError] = useState(false);

  const [widgetList, setwidgetList] = useState([]);
  const [widgetLoading, setwidgetLoading] = useState(false);

  const [widthLayout, setwidthLayout] = useState(0);
  const [deleteWidgetId, setdeleteWidgetId] = useState([]);
  const [editWidgeContent, seteditWidgeContent] = useState([]);
  useEffect(() => {
    // showLoader();
    if (ref && ref.current && ref.current.offsetWidth && !loading) {
      setwidthLayout(parseInt(ref.current.offsetWidth));
    }
    // hideLoader();
  }, [
    modalPicture,
    listarray,
    Slidesarray,
    widgetList,
    widgetLoading,
    layoutError,
    ref,
    widthLayout,
    BgPicture,
  ]);
  useEffect(() => {
    // showLoader();
    if (ref && ref.current && ref.current.offsetWidth  && !loading) {
      // console.log(ref.current.offsetWidth);
      setwidthLayout(parseInt(ref.current.offsetWidth));
    }
    // hideLoader();
  });
  useEffect(()=>{
  },[bgImage, audioIndex, audioArrayfetched])
  
  useEffect(async () => {
   
    // if(props.selectedLayoutID == ""){props.setselectedLayoutID(LayoutArraydata.data.data[0]._id);}
    if (props.selectedLayoutID.length > 0) {
      showLoader();
      let dataPost = {
        layout_id: props.selectedLayoutID,
      };
      let SelecetdLayoutdata = await httpService
        .CreateUpdate("getSelectedLayoutData", dataPost)
        .catch((err) => {
          console.log(err);
        });
      setaudioArrayfetched(
        SelecetdLayoutdata.data.data[0].audio
          ? SelecetdLayoutdata.data.data[0].audio
          : []
      );
      setselectedAudioId(SelecetdLayoutdata.data.data[0].audioId ? SelecetdLayoutdata.data.data[0].audioId : "Background Music");
      setVolume(
        SelecetdLayoutdata.data.data[0].audioSet
          ? SelecetdLayoutdata.data.data[0].audioSet[0]
          : 0.5
      );
      setMuted(
        SelecetdLayoutdata.data.data[0].audioSet
          ? SelecetdLayoutdata.data.data[0].audioSet[1]
          : false
      );
      
      let widgetdata = await httpService
        .CreateUpdate("getwidgetsApi", dataPost)
        .catch((err) => {
          console.log(err);
        });
      let BgImagedata = await httpService
        .CreateUpdate("getbgpictureApi", dataPost)
        .catch((err) => {
          console.log(err);
        });
      let Locationdata = await httpService
        .CreateUpdate("getwidgetlocationAPI", dataPost)
        .catch((err) => {
          console.log(err);
        });
      let clientIddata = await httpService
        .CreateUpdate("getClientIdData")
        .catch((err) => {
          console.log(err);
        });
     if(clientIddata.data[0])
     { setdriveClientid(clientIddata.data[0].GoogleDriveClientId);
      setdrivekey(clientIddata.data[0].GoogleDriveKey);
      setdropboxkey(clientIddata.data[0].DropboxKey);
      setweatherApiKey(clientIddata.data[0].weatherApiKey);
     }
      setBgPicture(BgImagedata.data.data);
      setlayout(Locationdata.data.data);
      setwidgetList(widgetdata.data.data);
      let audioArray = [];
      let obj = {
        value: `${"Background Music"}`,
        label: `${"Background Music"}`,
        id: `Background Music`,
        data: "Background Music",
      };
      audioArray.push(obj)
      for(let i=0; i<widgetdata.data.data.length ; i++){
        if(widgetdata.data.data[i].type == "youtube" || widgetdata.data.data[i].type == "videoplayer" || widgetdata.data.data[i].type == "initialvideoplayer"){
          let obj = {
            value: `${widgetdata.data.data[i]._id}`,
            label: `${widgetdata.data.data[i].type} (${widgetdata.data.data[i].content[0]})`,
            id: `${widgetdata.data.data[i]._id}`,
            data: widgetdata.data.data[i],
          };
          audioArray.push(obj);
        }
      }
      setwidgetAudioArray(audioArray);
      setwidgetLoading(true);
      hideLoader();
    }
   
  }, []);

  useEffect(async () => {
    // showLoader();
    var currentUrl = window.location.href;
    let accessToken = currentUrl.substring(
      currentUrl.indexOf("=") + 1,
      currentUrl.indexOf("&")
    );
    // hideLoader();
  }, []);

  useEffect(() => {
    // showLoader();
    if (widgetLoading && !loading) {
      const ratio =
        (parseInt(ref.current.offsetWidth && !loading) * 100.0) /
        parseInt(ref.current.clientHeight && !loading);
      const defaultratio = (16 * 100.0) / 9;
      if (ratio > defaultratio) {
        setlayoutError(true);
      } else {
        setlayoutError(false);
      }
    }
    // hideLoader();
  });

  const playnext = (index) => {
    if (index == audioArrayfetched.length - 1) {
      setaudioIndex(0);
    } else {
      setaudioIndex(index + 1);
    }
  };
  const handleOpenPicker = () => {
    openPicker({
      clientId: driveClientid,
      developerKey: drivekey,
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
            setaddwidgettype("picture");
            handleSubmitPicture(i.url, i.name);
          });
        }
      },
    })
  }
  const handleOpenPicker2 = () => {
    openPicker({
      clientId: driveClientid,
      developerKey: drivekey,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      viewMimeTypes: ["audio/mpeg", "audio/mp3"],
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
        if (data.docs) {
          debugger;
          console.log("on change:", data.docs);
          data.docs.map((i) => {
            setaddwidgettype("audioplayer");
            // handl`eSubmitPicture(i.url, i.name);
            let array = [...audioArray];
            array.push({ link: i.url, name: i.name });
            setaudioArray(array);
          });
        }
      },
    })
  }
  const handleOpenPicker3 = () => {
    openPicker({
      clientId: driveClientid,
      developerKey: drivekey,
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
            handleSubmitBgPicture(i.url, i.name);
          });
        }
      },
    })
  }
  const handleOpenPicker4 = () => {
    openPicker({
      clientId: driveClientid,
      developerKey: drivekey,
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

  const refreshWeatherData = () => {
    if (widgetList.length > 0) {
      widgetList.map(async (e, index) => {
        if (e.type == "weather") {
          let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${e.content[0].name}&appid=${weatherApiKey}`
          ).then(async (response) => {
            if (response.status == 404) {
              toast.warn("Something Went Wrong", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return;
            } else {
              console.log(response);
              const dataRec = await response.json();
              let data = {
                type: "weather",
                id: e._id,
                content: [dataRec],
              };
              let widgetdata = await httpService
                .CreateUpdate("updateWidgetApi", data)
                .catch((err) => {
                  console.log(err);
                });
              if (widgetdata.ack == "1") {
                let std = [...widgetList];
                std[index].content = [dataRec];
                setwidgetList(std);
              }
            }
          });
        }
      });
    }
  };
  const fetchData = async () => {
    // intervalWeather = setInterval(()=>{
    //   refreshWeatherData();
    // },30000)
  };
  useEffect(() => {
    // showLoader();
    fetchData();
    return () => {
      clearInterval(intervalWeather);
    };
    // hideLoader();
  }, []);

  const getWidgets = async () => {
    let dataPost = {
      layout_id: props.selectedLayoutID,
    };
    let widgetdata = await httpService
      .CreateUpdate("getwidgetsApi", dataPost)
      .catch((err) => {
        console.log(err);
      });
    setwidgetList(widgetdata.data.data);
    setwidgetLoading(true);
  };

  const getAudioId = (e) => {
    if(e != ""){
      if (e.includes("drive.google")) {
        let field = e.split("file/d/");
        let stringdata = field[1].split("/view")[0];
        if(window.location.origin.substring(0,5) == "http:"){
          return "https://docs.google.com/uc?export=open&id=" + stringdata;
          // return "https://docs.google.com/uc?export=download&id=" + "1XPTnQHfU0WGaJJ-ZxJSXvRPYr_2Y4UBj";
        }else{
          return "https://docs.google.com/uc?export=open&id=" + stringdata;
          // return "https://docs.google.com/uc?export=download&id=" + "1XPTnQHfU0WGaJJ-ZxJSXvRPYr_2Y4UBj";
        }
      } else if (e.includes("dropbox.com")) {
        let urlreturn = e.replace("dl=0", "dl=1");
        return urlreturn;
      }
      
    }else{
      return ""
    }
  };
  const handleSubmitAudio = async () => {
    // if (audioArray.length <= 0) {
    //   toast.warn("Please select some audio file", {
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
    const data = {
      content: audioArray,
      layout_id: props.selectedLayoutID,
      volume: volume,
      muted: muted,
      selectedAudioId: selectedAudioId
    };
    let user = await httpService
      .CreateUpdate("addaudioLayout", data)
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update playlist", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setmodalaudio(false);
    setaudioArrayfetched(audioArray);
    setaudioArray([]);
    toast.success("Audio Playlist Updated ", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    let user = {};
    if (addwidgettype == "list") {
      if (listarray.length == 0) {
        toast.warn("Please add something to the list", {
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
      var sortedArray = listarray.sort(function(a, b) {
        return a[5] - b[5];
      });
      setlistarray(sortedArray);
      const data = {
        type: "list",
        content: listarray,
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
        });

      setmodallist(false);
      setlistarray([]);
      toast.success("List Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (addwidgettype == "youtube") {
      if (youtubeVideo == "") {
        toast.warn("Please Enter the youTube URL", {
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

      {
        var p =
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (youtubeVideo.match(p)) {
        } else {
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
      }

      // }
      const data = {
        type: "youtube",
        content: [youtubeVideo],
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
          toast.error("Unable to add Widget", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });

      setmodalyoutubevideo(false);
      setyoutubevideo("");
      toast.success("Youtube Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (addwidgettype == "videoplayer") {
      if (videoPlayer == "") {
        toast.warn("Please Enter the URL", {
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
      const data = {
        type: "videoplayer",
        content: [videoPlayer],
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
          toast.error("Unable to add Widget", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });

      setmodalvideoPlayer(false);
      setvideoPlayer("");
      toast.success("Video Player Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // } else if (addwidgettype == "audioplayer") {
      //   if (audioArray.length <= 0) {
      //     toast.warn("Please select some audio file", {
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
      //   const data = {
      //     type: "audioplayer",
      //     content: audioArray,
      //     layout_id: props.selectedLayoutID,
      //   };
      //    user = await httpService
      //     .CreateUpdate("addwidgetApi", data)
      //     .catch((err) => {
      //       console.log(err);
      //       toast.error("Unable to add Widget", {
      //         position: "bottom-left",
      //         autoClose: 5000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //       });
      //     });

      //   setmodalaudio(false);
      //   setaudioArray([]);
      //   toast.success("Audio Player Widget Added ", {
      //     position: "bottom-left",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
    } else if (addwidgettype == "webiframe") {
      if (weblinkframe == "") {
        toast.warn("Please Enter the Website URL", {
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

      const data = {
        type: "webiframe",
        content: [weblinkframe],
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
        });

      setmodalwebIframe(false);
      setweblinkframe("");
      toast.success("WebIframe Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (addwidgettype == "announcement") {
      if (announcementtext == "") {
        toast.warn("Please Enter the Announcement", {
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
      const data = {
        type: "announcement",
        content: [announcementtext],
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
        });

      setmodalannouncement(false);
      setannouncementtext("");
      toast.success("Announcement Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (addwidgettype == "weather") {
      if (weatherInput == "") {
        toast.warn("Please Enter the city name", {
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
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${weatherInput},us&appid=${weatherApiKey}`
      ).then(async (response) => {
        if(response.status == 401){
          toast.warn("Something Went Wrong", {
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
        if (response.status == 404) {
          toast.warn("Please Enter the city code correctly.", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        } else {
          const data = await response.json();
          console.log(data);
          const dataPost = {
            type: "weather",
            content: [data, weatherInput, weatherWind, weatherTemp],
            layout_id: props.selectedLayoutID,
          };
          user = await httpService
            .CreateUpdate("addwidgetApi", dataPost)
            .catch((err) => {
              console.log(err);
            });
          setweatherInput("");
          setmodalweather(false);
          toast.success("Weather Widget Added", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
      // getWidgets();
    } else if (addwidgettype == "congrats") {
      if (Congratulation == "") {
        toast.warn("Please Enter the Congratulation message", {
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
      if (congratgif == "") {
        toast.warn("Please select the congratulation GIF", {
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
      const data = {
        type: "congrats",
        content: [Congratulation, congratgif],
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
        });
      setmodalcongrats(false);
      setCongratulation("");
      setcongratgif("");
      toast.success("Congratulation Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (addwidgettype == "slideshare") {
      if (Slidesarray.length == 0) {
        toast.warn("Please add some slides", {
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
      const data = {
        type: "slideshare",
        content: Slidesarray,
        layout_id: props.selectedLayoutID,
      };
      user = await httpService
        .CreateUpdate("addwidgetApi", data)
        .catch((err) => {
          console.log(err);
        });
      toast.success("Slideshare Widget Added ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setmodalSlideShare(false);
      setslideshraeWebLink("");
      setSlideTitle("");
      setslideabout("");
      setslidetime(3);
      setSlidesarray([]);
    }
    let addwidgetDeleteData = props.addwidgetDelete;
    addwidgetDeleteData.push(user.data.id);
    props.setaddwidgetDelete(addwidgetDeleteData);
    // getWidgets();
    let widgetdata = [...widgetList];
    widgetdata.push(user.data.data);
    setwidgetList(widgetdata);
  };

  const handleSubmitPicture = async (url, name) => {
    let user = {};
    if (url == "") {
      toast.warn("Image not selected", {
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
    const data = {
      type: "picture",
      content: [
        {
          title: name,
          image: url,
        },
      ],
      layout_id: props.selectedLayoutID,
    };

    user = await httpService.CreateUpdate("addwidgetApi", data).catch((err) => {
      console.log(err);
    });
    toast.success("Picture Widget Added ", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let addwidgetDeleteData = props.addwidgetDelete;
    addwidgetDeleteData.push(user.data.id);
    props.setaddwidgetDelete(addwidgetDeleteData);
    setmodalPicture(false);
    // getWidgets();
    let widgetdata = [...widgetList];
    widgetdata.push(user.data.data);
    setwidgetList(widgetdata);
  };
  const handleSubmitBgPicture = async (url, name) => {
    if (url == "") {
      toast.warn("Image not selected", {
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
    const data = {
      content: url,
      layout_id: props.selectedLayoutID,
    };

    const user = await httpService
      .CreateUpdate("savebgpictureApi", data)
      .catch((err) => {
        console.log(err);
      });
    toast.success("Background Picture Changed ", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setmodalPicture(false);
    setBgPicture(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const saveLayout = async () => {
    showLoader();
    let layoutArray = layout;
    for (let i = 0; i < layout.length; i++) {
      if (layout[i].y >= 18) {
        let data = {
          id: layout[i].i,
        };
        await httpService.CreateUpdate("removewidgetApi", data).catch((err) => {
          console.log(err);
        });
        layoutArray.splice(i, 1);
      }
    }
    for (let i = 0; i < deleteWidgetId.length; i++) {
      let dataDelete = {
        id: deleteWidgetId[i],
      };
      await httpService
        .CreateUpdate("removewidgetApi", dataDelete)
        .catch((err) => {
          console.log(err);
        });
    }
    setdeleteWidgetId([]);

    for (let i = 0; i < editWidgeContent.length; i++) {
      let dataedit = editWidgeContent[i];
      let widgetdata = await httpService
        .CreateUpdate("updateWidgetApi", dataedit)
        .catch((err) => {
          console.log(err);
        });
    }
    seteditWidgeContent([]);

    setlayout(layoutArray);
    let data = {
      location: layout,
      layout_id: props.selectedLayoutID,
    };
    await httpService
      .CreateUpdate("savewidgetlocationAPI", data)
      .catch((err) => {
        console.log(err);
      });
    toast.success("Layout Saved ", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-7",
        JSON.stringify({
          ["layout"]: layout,
        })
      );
    }
    props.setaddwidgetDelete([]);
    getWidgets();
    hideLoader();
  };

  const addtolist = () => {
    if (listcontent == "") {
      toast.warn("Please enter some Content to add in the list", {
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
    if (listcontentStatrt == "") {
      toast.warn("Please enter start time to add in the list", {
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
    if (listcontentEnd == "") {
      toast.warn("Please enter End Time to add in the list", {
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
    if (listcontentStartDate == "") {
      toast.warn("Please enter Start Date to add in the list", {
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
    if (listcontentEndDate == "") {
      toast.warn("Please enter End Date to add in the list", {
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
    if (listcontent != "") {
      let stYr = listcontentStartDate.substring(0,4);
      let stmon = parseInt(listcontentStartDate.substring(5,7)) - 1;
      let stday = listcontentStartDate.substring(8,10);
      let enYr = listcontentEndDate.substring(0,4);
      let enmon = parseInt(listcontentEndDate.substring(5,7)) -1;
      let enday = listcontentEndDate.substring(8,10);

      let sthr = listcontentStatrt.substring(0,2);
      let stmin = listcontentStatrt.substring(3,5);
      let enhr = listcontentEnd.substring(0,2);
      let enmin = listcontentEnd.substring(3,5);

      let startDate = new Date(stYr, stmon, stday, sthr, stmin).getTime();
      let endDate = new Date(enYr, enmon, enday, enhr, enmin).getTime();

      let diff = endDate - startDate;

      if(diff > 0){
        let array = [...listarray];
        array.push([listcontent, listcontentStatrt, listcontentEnd, listcontentStartDate, listcontentEndDate, startDate, endDate]);
        setlistarray(array);
        setlistcontent("");
        setlistcontentStart("");
        setlistcontentEnd("");
        setlistcontentStartDate("");
        setlistcontentEndDate("");
        toast.success("Added to the list", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        toast.warn("Please enter End Date greater than the start date", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
    }
    
  };
  const AddtoSlides = async () => {
    // let baseImage = "";
    // const getBase64 = (file) => {
    //   return new Promise((resolve) => {
    //     let fileInfo;
    //     let baseURL = "";
    //     let reader = new FileReader();

    //     reader.readAsDataURL(file);

    //     reader.onload = () => {
    //       console.log("Called", reader);
    //       baseURL = reader.result;
    //       console.log(baseURL);
    //       resolve(baseURL);
    //     };
    //     console.log(fileInfo);
    //   });
    // };
    if (slideTitle == "") {
      toast.warn("Please enter the slide title", {
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
    if (slideabout == "") {
      toast.warn("Please enter something about the slide", {
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
    if (slidetime == 0) {
      toast.warn("Please enter the time for the slide", {
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
    if (slideshraeWebLink == "") {
      toast.warn("Please enter the url or select the picture", {
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

    {
      var p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (slideshraeWebLink.match(p)) {
      } else {
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
    }
    let array = [...Slidesarray];
    if (slideshraeWebLink != "") {
      if (slideshraeWebLink != "") {
        array.push([
          slideshraeWebLink,
          "weblink",
          slideTitle,
          slideabout,
          slidetime,
        ]);
      }
      toast.success("Slide added to the slideshare", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // if (slideSharepicture.Images.length != 0) {
      //   array.push([
      //     baseImage,
      //     "image",
      //     slideSharepicture.Images[0].name,
      //     slideTitle,
      //     slideabout,
      //     slidetime,
      //   ]);
      // }
    }
    setSlidesarray(array);
    setslideshraeWebLink("");
    setSlideTitle("");
    setslideabout("");
    setslidetime(3);
  };
  const handleSubmitPictureSlideshare = async (url, name) => {
    let array = [...Slidesarray];
    array.push([url, "image", name, slideTitle, slideabout, slidetime]);
    setSlidesarray(array);
    setslideshraeWebLink("");
    setSlideTitle("");
    setslideabout("");
    setslidetime(3);
  };
  const removelistcontent = (i) => {
    let array = [...listarray];
    array.splice(i, 1);
    setlistarray(array);
  };
  const removeslidearraycontent = (i) => {
    let array = [...Slidesarray];
    array.splice(i, 1);
    setSlidesarray(array);
  };

  // const oneDriveFilePicker = () => {
  //   toggleOneDrive();
  // };
  const getAuthenticationToken = () => {
    return Promise.resolve(
      "EwCYA8l6BAAUwihrrCrmQ4wuIJX5mbj7rQla6TUAAbtqHdRksO36h6sKq+oqEaMinsfZuefV3kkfpKgLnUc3Drnhy8ogTqxinG8nE7kSZZamS+EVGfEr0hx1tfBv1C4Qyex5PAA6sIv63eZCRtcC76mMCccP6vzTWZmDISOtOZjcw5eJJfvwH3yDP97rjwJWnonhkmCqGaGrObeqHf1uz5H6hkGGTwS2u4QwDSFopceaVs8QSA6kXhFvt9ciYFCDEwkxRUolXEkm2+X7hwq13cX9UzYzg7BUErsfce9Amb6w92qLGYgnGu6jQqZK+jLZvNkzaa7eHf8jw43p9QfBC8W6BODS1D0FKLcugJ37MWYG6wYETFll0A4sGMv2hywDZgAACK1UtgDjzFsWaAJyNkl9juKLktKmmqPKry3+mY9QYG+2z3am6b7uDS1kqqrEFtFWFFkYyF7xvmGoRrDGnWMuH6OU995UClA/Bl6IkUZOB72N8HqNsry7fZv5aXjehJ+n325XMc09YcQRltowxQkt7nG5Bg7Zn/NW5PVZi2YECFeSW8IRvMn18qcjnZ0LOV+xOUCbaDD4kTVovowK02E7W2YoSsT6ataZt/Ds1C3lDEqNoTDrZ8Th7fe0mP6VcszQPz371Asnu1ZKEPvUKW89XOp/ieg0USIh9qUaBAM00XEfjAiR+KfktxZVP1nGFyJJljywcwC9TaeV++0r5MTHAeidkGAdITihm9kU/sVfiwOP/KXnXnsE0urgbN9t66CspFVe5SmAHicvuEf2TVW74LUDmc90OcriHfgMJplrXRWJl/bOhvozU/ZLLr9M3qCLV9A13EcDOWzfpwT5gYPopzfeekaFKfo3bdmsmlvT2T4nOuW5EO3Ixo5VOQL5eiDATWZ6fUhGzTXPFG+Q383ORPLhR0vMvNNIL6OSw30EK/bilE25osgPGgAJE0oE1ZJ+xbMgpm5Y0z4admK6GZ6b4EhMzVuxeVEcW+Z2lU5mEsSH/E/u1nc1bcnoe1xOGV7SA8tS5uYxsbQ9FV4+ZrkPRNoLuwp+8rzRKDXqkUjSn2EhnmXjCEijZ6/UAb9pFPmZntgamWpL0USDuswagzQyfonCDs4wbyqbA47IfCe+TTZ4WurKOtyIPPfTPKdgSUDrr4hCaTZ4iVp5P2o1vFkC4BWnwtHjxZdbOlTh6W+NxjNm/cV84fRIR3xzuCAQyM2N0Ga3rwI="
    );
  };

  const onSuccess = (keys) => {
    console.log("onSuccess", keys);
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
  const showLoader=()=>{
    setLoading(true);
  }
  const hideLoader=()=>{
    setLoading(false);
   
  }

  return (
    <div className="mainlayout row">
     {loading ? <Loader/> : null}
      <span className="headerLayout col-9" hidden={props.preview}>
        <Dropdown
          className="backup-dropdown addwidgetmain"
          isOpen={dropdownWidget}
          toggle={toggle}
        >
          <DropdownToggle className="btn btn-primary mt-1 addwidgetButton">
            <b>+ Add Widget</b>
          </DropdownToggle>
          <DropdownMenu style={{ left: "0px !important" }}>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#Modal"
              onClick={() => {
                setaddwidgettype("slideshare");
                setmodalSlideShare(true);
              }}
            >
              Slideshare
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#pictureModal"
              onClick={() => {
                setaddwidgettype("picture");
                setmodalPicture(true);
              }}
            >
              Picture
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("congrats");
                setmodalcongrats(true);
              }}
            >
              Congratulation
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("list");
                setmodallist(true);
              }}
            >
              List
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("webiframe");
                setmodalwebIframe(true);
              }}
            >
              Web Iframe
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("announcement");
                setmodalannouncement(true);
              }}
            >
              Announcement
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("youtube");
                setmodalyoutubevideo(true);
              }}
            >
              YouTube Video
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("videoplayer");
                setmodalvideoPlayer(true);
              }}
            >
              DASH/HLS Video Player
            </DropdownItem>
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("weather");
                setmodalweather(true);
              }}
            >
              Weather
            </DropdownItem>
            {/*<DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={() => {
                setaddwidgettype("audioplayer");
                setmodalaudio(true);
              }}
            >
              Audio Player
            </DropdownItem>*/}
            <DropdownItem
              center
              data-toggle="modal"
              data-target="#weeklyModal"
              onClick={async () => {
                setaddwidgettype("date");
                const data = {
                  type: "date",
                  content: ["Date/Time", "-4", true, true],
                  timeFormat : "12h",
                  layout_id: props.selectedLayoutID,
                };
                const user = await httpService
                  .CreateUpdate("addwidgetApi", data)
                  .catch((err) => {
                    console.log(err);
                  });

                let addwidgetDeleteData = props.addwidgetDelete;
                addwidgetDeleteData.push(user.data.id);
                props.setaddwidgetDelete(addwidgetDeleteData);
                let widgetdata = [...widgetList];
                widgetdata.push(user.data.data);
                setwidgetList(widgetdata);
                // getWidgets();
              }}
            >
              Date/Time
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>{" "}
        <Button
          color="primary"
          type="submit"
          className="backgroundbutton"
          onClick={() => {
            toggleBgPicture();
          }}
        >
          {BgPicture.length > 0 ? "Update" : "Set"} Background Image
        </Button>
        <Button
          color="primary"
          type="submit"
          className="backgroundbutton"
          style={{ marginLeft: "4px" }}
          onClick={() => {
            toggleaudio();
            setaudioArray(audioArrayfetched);
          }}
        >
          Background Music
        </Button>
      </span>
      {/*
      <div className="col-4 errormessage" hidden={props.preview}>
        <div hidden={layoutError}></div>
</div>*/}
      <div className="col-3 headerLayoutgoback" hidden={props.preview}>
        {widgetLoading && widgetList.length != 0 && (
          <Button
            color="primary"
            type="submit"
            className="form-control savelayoutbutton"
            onClick={() => {
              if (
                window.confirm(
                  "Saving Layout will delete all the widgets outside the defined boundary. Do you want to proceed?"
                ) == true
              ) {
                saveLayout();
              }
            }}
            // disabled={!layoutError}
          >
            <FontAwesomeIcon className="iconSaveLayout" icon={faSave} /> Save
            Layout
          </Button>
        )}
      </div>

      {widgetLoading && (
        <div ref={ref} className="layoutRef">
          {BgPicture.length != 0 ? (
            <img
              src={getpictureurl(BgPicture)}
              className="bgImage"
              width="100%"
              height={(widthLayout * 9.0) / 16}
              alt="BgImage"
            ></img>
          ) : (
            <img
              src={bgImage}
              className="bgImage"
              width="100%"
              height={(widthLayout * 9.0) / 16}
              hidden={props.view}
              alt="BgImage"
            ></img>
          )}
          <LocalStorageLayout
            className="layoutcomponent"
            widgetList={widgetList}
            setlayout={setlayout}
            layout={layout}
            setwidgetList={setwidgetList}
            borderColor={props.borderColor}
            borderWidth={props.borderWidth}
            widthLayout={widthLayout}
            setrightContentType={props.setrightContentType}
            rightContentType={props.rightContentType}
            getWidgets={getWidgets}
            preview={props.preview}
            selectedLayoutID={props.selectedLayoutID}
            setselectedLayoutID={props.setselectedLayoutID}
            toggleeditLayout={props.toggleeditLayout}
            deleteWidgetId={deleteWidgetId}
            setdeleteWidgetId={setdeleteWidgetId}
            editWidgeContent={editWidgeContent}
            seteditWidgeContent={seteditWidgeContent}
            volume= {volume}
            muted= {muted}
            selectedAudioId = {selectedAudioId}
            driveClientid = {driveClientid}
            drivekey = {drivekey}
            dropboxkey = {dropboxkey}
            weatherApiKey = {weatherApiKey}
            openPicker = {openPicker}
            authResponse = {authResponse}
          ></LocalStorageLayout>
        </div>
      )}
      <div className="marginLayout" hidden={props.preview}>
        {""}
      </div>
      <Modal
        isOpen={modalPicture}
        toggle={togglePicture}
        className="modaleditLayout"
      >
        <ModalHeader toggle={togglePicture}>Upload Picture</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit}>
              {/*<FileUpload
                accept=".jpg,.png,.jpeg"
                label=""
                updateFilesCb={updateUploadedFiles}
              />*/}
              <div className="row">
                <div className="col-6 selectButton">
                  <DropboxChooser
                    appKey={dropboxkey}
                    success={async (files) => {
                      console.log("chose:", files);
                      setmodalPicture(false);
                      await files.map((i) => {
                        handleSubmitPicture(i.link, i.name);
                      });
                    }}
                    cancel={() => console.log("closed")}
                    multiselect={true}
                  >
                    <Button className="form-control" color="primary">
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
                    className="googlepickerbox"
                    clientId={driveClientid}
                    developerKey={drivekey}
                    scope={["https://www.googleapis.com/auth/drive.readonly"]}
                    onChange={async (data) => {
                      if (data.docs) {
                        console.log("on change:", data.docs);
                        data.docs.map((i) => {
                          setaddwidgettype("picture");
                          handleSubmitPicture(i.url, i.name);
                        });
                        if (data.docs.length > 0) {
                          // props.toggleeditLayout();
                        }
                      }
                    }}
                    onAuthFailed={(data) =>
                      console.log("on auth failed:", data)
                    }
                    multiselect={false}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
                    // query={'a query string like .txt or fileName'}
                    viewId={"DOCS"}
                  >
                    <Button
                      className="form-control"
                      color="primary"
                      onClick={() => {
                        setmodalPicture(false);
                        // props.toggleeditLayout();
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
                      onClick={() => {
                        setmodalPicture(false);
                        handleOpenPicker();
                        // props.toggleeditLayout();
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
                {/*<div className="col-6 selectButton">
                  <Button
                    color="primary"
                    className="form-control"
                    onClick={() => {
                      setmodalPicture(false);
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
                  </div>*/}
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalaudio}
        toggle={toggleaudio}
        className="modaleditLayout"
      >
        <ModalHeader toggle={toggleaudio}>Audio Settings</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit}>
              {/*<b>Enter the Title of Audio </b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={audioTitle}
                onChange={(e) => setaudioTitle(e.target.value)}
              ></input>*/}
              <div className="row">
                <div className="col-9 selectButton">
                  <b style={{ paddingTop: "30px" }}>Select Audio Type </b>
                  <section>
                  <Select
                    options={widgetAudioArray}
                    placeholder="Choose Rule"
                    // defaultInputValue={selectedAudioId}
                    defaultValue={{label:selectedAudioId , value: selectedAudioId}}
                    onChange={(event) => {
                      setselectedAudioId(event.value);
                    }}
                  />
                  </section>
                </div>
                <div className="col-3 selectButton" style={{ paddingTop: "27px", paddingRight:"10px" }}>
                  <Button
                  className="form-control"
                  onClick={() => setMuted((m) => !m)}
                  style={{ marginLeft: "5px" }}
                >
                  {muted ? "muted" : "unmuted"}
                </Button>
                </div>
                
              </div>
              <div style = {{margin: "10px 5px", padding: "5px", border:"1px solid gray"}} className="row">
              <b>Choose Audio </b>
              <div className="col-6 selectButton">
                  <DropboxChooser
                    appKey={dropboxkey}
                    success={async (files) => {
                      console.log("chose:", files);
                      // setmodalPicture(false);
                      await files.map((i) => {
                        // handleSubmitPicture(i.link, i.name);
                        let array = [...audioArray];
                        array.push({ link: i.link, name: i.name });
                        setaudioArray(array);
                      });
                    }}
                    cancel={() => console.log("closed")}
                    multiselect={false}
                  >
                    <Button className="form-control" color="primary">
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
                    className="googlepickerbox"
                    clientId={driveClientid}
                    developerKey={drivekey}
                    scope={["https://www.googleapis.com/auth/drive.readonly"]}
                    onChange={async (data) => {
                      if (data.docs) {
                        console.log("on change:", data.docs);
                        data.docs.map((i) => {
                          setaddwidgettype("audioplayer");
                          // handl`eSubmitPicture(i.url, i.name);
                          let array = [...audioArray];
                          array.push({ link: i.url, name: i.name });
                          setaudioArray(array);
                        });
                        if (data.docs.length > 0) {
                          // props.toggleeditLayout();
                        }
                      }
                    }}
                    onAuthFailed={(data) =>
                      console.log("on auth failed:", data)
                    }
                    onAuthenticate = {(token) =>{
                      console.log(token);
                    }}
                    multiselect={true}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={["audio/mpeg", "audio/mp3"]}
                    // query={'a query string like .txt or fileName'}
                    viewId={"DOCS"}
                  >
                    <Button
                      className="form-control"
                      color="primary"
                      onClick={() => {
                        setmodalPicture(false);
                        // props.toggleeditLayout();
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
                      onClick={() => {
                        setmodalPicture(false);
                        handleOpenPicker2();
                        // props.toggleeditLayout();
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

                {/*<div className="col-6 selectButton">
                  <Button
                    color="primary"
                    className="form-control"
                    onClick={() => {
                      setmodalPicture(false);
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
                  </div>*/}
              <div style={{ marginTop: "15px", borderTop: "1px solid gray" }}>
              <div className="row" style={{borderBottom:"1px dashed gray"}}>
              <div className="col-6" style={{fontSize:"large", fontWeight:"bold"}}>Playlist</div>
              <div className="col-6 selectButton">
            <b style={{ paddingTop: "0px", display:"inline-block" }}>Set Volume </b>
            <section style={{display:"inline-block",paddingLeft:"10px", paddingTop : "0px"}}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={(event) => {
                  setVolume(event.target.valueAsNumber);
                }}
              />
            </section>
          </div>
          </div>
                {audioArray.map((elem, index) => {
                  return (
                    <div className="row">
                      <div className="col-10" style={{ paddingTop: "6px" }}>
                        {elem.name}
                      </div>
                      <div className="col-2">
                        <Button
                          color="Secondary"
                          className="col-1"
                          onClick={() => {
                            let array = [...audioArray];
                            array.splice(index, 1);
                            setaudioArray(array);
                          }}
                        >
                          x
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmitAudio}
              >
                Save
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>

      {selectedAudioId == "Background Music" || selectedAudioId == "" ? <ReactAudioPlayer
        style={{ display: "none" }}
        className="playallaudioplayer"
        src={
          audioArrayfetched[audioIndex]
            ? getAudioId(
                audioArrayfetched[audioIndex].link
                  ? audioArrayfetched[audioIndex].link
                  : ""
              )
            : ""
        }
        volume={volume}
        muted={muted}
        controls
        autoPlay = {true}
        key={audioIndex}
        onEnded={() => playnext(audioIndex)}
      />: ""}
      {/*{selectedAudioId == "Background Music" || selectedAudioId == "" ? <AudioPlayer
      autoPlay = {true}
      style={{ display: "none" }}
      className="playallaudioplayer"
      src={
        audioArrayfetched[audioIndex]
          ? getAudioId(
              audioArrayfetched[audioIndex].link
                ? audioArrayfetched[audioIndex].link
                : ""
            )
          : ""
      }
      volume={volume}
      muted={muted}
      onEnded={() => playnext(audioIndex)}
    />: ""}*/}
      <Modal isOpen={modalBgPicture} toggle={toggleBgPicture}>
        <ModalHeader toggle={toggleBgPicture}>
          Upload Background Picture
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit}>
              {/*<FileUpload
                accept=".jpg,.png,.jpeg"
                label=""
                updateFilesCb={updateUploadedFiles}
              />*/}
              <div className="row">
                <div className="col-6 selectButton">
                  <DropboxChooser
                    appKey={dropboxkey}
                    success={async (files) => {
                      console.log("chose:", files);
                      setmodalBgPicture(false);
                      await files.map((i) => {
                        handleSubmitBgPicture(i.link, i.name);
                      });
                    }}
                    cancel={() => console.log("closed")}
                    multiselect={false}
                  >
                    <Button className="form-control" color="primary">
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
                    clientId={driveClientid}
                    developerKey={drivekey}
                    scope={["https://www.googleapis.com/auth/drive.readonly"]}
                    onChange={async (data) => {
                      if (data.docs) {
                        console.log("on change:", data.docs);
                        data.docs.map((i) => {
                          handleSubmitBgPicture(i.url, i.name);
                        });
                        if (data.docs.length > 0) {
                          // props.toggleeditLayout();
                        }
                      }
                    }}
                    onAuthFailed={(data) =>
                      console.log("on auth failed:", data)
                    }
                    multiselect={false}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
                    // query={'a query string like .txt or fileName'}
                    viewId={"DOCS"}
                  >
                    <Button
                      className="form-control"
                      color="primary"
                      onClick={() => {
                        setmodalBgPicture(false);
                        // props.toggleeditLayout();
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
                      onClick={() => {
                        setmodalBgPicture(false);
                        handleOpenPicker3();
                        // props.toggleeditLayout();
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
                {/*<div className="col-6 selectButton">
                  <Button
                    color="primary"
                    className="form-control"
                    onClick={() => {
                      // setmodalBgPicture(false);
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
                  </div>*/}
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalSlideShare} toggle={toggleSlideShare}>
        <ModalHeader toggle={toggleSlideShare}>
          Create a new Slideshare
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              {/* <b>Enter the Title of Slide </b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
              ></input>
              <b>Enter something about the Slide </b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="text"
                className="form-control slideshowTitle"
                value={slideabout}
                onChange={(e) => setslideabout(e.target.value)}
              ></input> */}
              <b>Enter Timeframe of the Slide (in sec) </b>
              <b style={{ color: "red" }}>*</b>
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
                    appKey={dropboxkey}
                    success={async (files) => {
                      console.log("chose:", files);
                      await files.map((i) => {
                        handleSubmitPictureSlideshare(i.link, i.name);
                      });
                    }}
                    cancel={() => console.log("closed")}
                    multiselect={true}
                  >
                    <Button className="form-control" color="primary">
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
                    clientId={driveClientid}
                    developerKey={drivekey}
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
                    // query={'a query string like .txt or fileName'}
                    viewId={"DOCS"}
                  >
                    <Button
                      className="form-control"
                      color="primary"
                      onClick={() => {}}
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
                      onClick={() => {handleOpenPicker4()}}
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
                {/*<div className="col-6 selectButton">
                  <Button
                    color="primary"
                    className="form-control"
                    onClick={() => {
                      // setmodalPicture(false);
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
                  </div>*/}
              </div>
              <div className="orcenter"> OR </div>
              <b>Enter the url of youtube video</b>
              <input
                type="url"
                className="form-control websiteLink"
                value={slideshraeWebLink}
                onChange={(e) => setslideshraeWebLink(e.target.value)}
              ></input>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={AddtoSlides}
              >
                Add to Slideshare
              </Button>{" "}
              {/*<Button color="secondary" onClick={CancelSlideShareClickHandler}>Cancel</Button>*/}
              <div className="slideshareborder"></div>
            </form>
            <div className="availableSlideshares"> Slides to Upload</div>
            {Slidesarray.map((e, i) => (
              <div>
                {e[1] == "weblink" ? (
                  <div className="row slidetoadd">
                    <b className="col-11">
                      {i + 1}. {e[0]}
                    </b>
                    <Button
                      color="Secondary"
                      className="col-1"
                      onClick={() => removeslidearraycontent(i)}
                    >
                      x
                    </Button>
                  </div>
                ) : (
                  <div className="row slidetoadd">
                    <b className="col-11">
                      {i + 1}.{" "}
                      <img
                        width="auto"
                        height="80px"
                        src={getpictureurl(e[0])}
                        alt="image"
                      />
                    </b>
                    <Button
                      color="Secondary"
                      className="col-1"
                      onClick={() => removeslidearraycontent(i)}
                    >
                      x
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <Button
              color="primary"
              type="submit"
              className="form-control"
              onClick={handleSubmit}
            >
              Save
            </Button>{" "}
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalcongrats} toggle={togglecongrats}>
        <ModalHeader toggle={togglecongrats}>
          Create a new Congratulation WIdget
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <b>Enter the Congratulations Message</b>{" "}
              <b style={{ color: "red" }}>*</b>
              <textarea
                type="test"
                className="form-control websiteLink"
                value={Congratulation}
                onChange={(e) => setCongratulation(e.target.value)}
              ></textarea>
              <div className="slideshareborder"></div>
              <div className="availableSlideshares">
                {" "}
                Choose GIFs <b style={{ color: "red" }}>*</b>
              </div>
              <div className="row">
                <div
                  className="col-4"
                  onClick={() => {
                    setcongratgif("1");
                  }}
                >
                  {congratgif == "1" ? (
                    <img
                      className="congratsgif activegif"
                      src={gif1}
                      alt="gift"
                    ></img>
                  ) : (
                    <img className="congratsgif" src={gif1} alt="gift"></img>
                  )}
                </div>

                <div
                  className="col-4"
                  onClick={() => {
                    setcongratgif("2");
                  }}
                >
                  {congratgif == "2" ? (
                    <img
                      className="congratsgif activegif"
                      src={gif2}
                      alt="gift"
                    ></img>
                  ) : (
                    <img className="congratsgif" src={gif2} alt="gift"></img>
                  )}
                </div>

                <div
                  className="col-4"
                  onClick={() => {
                    setcongratgif("3");
                  }}
                >
                  {congratgif == "3" ? (
                    <img
                      className="congratsgif activegif"
                      src={gif3}
                      alt="gift"
                    ></img>
                  ) : (
                    <img className="congratsgif" src={gif3} alt="gift"></img>
                  )}
                </div>
              </div>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Create
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modallist} toggle={togglelist}>
        <ModalHeader toggle={togglelist}>Create a new List WIdget</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <div className="row">
              <label>
              <b>Item Label</b>
            </label>
                <div className="col-12" style={{ padding: "5px" }}>
                  
                  <input
                    type="text"
                    className="form-control"
                    value={listcontent}
                    onChange={(e) => setlistcontent(e.target.value)}
                  ></input>
                </div>
                <label>
                    <b>Starts At</b>
                  </label>
                <div className="col-6" style={{ padding: "5px" }}>
                  
                  <input
                    type="date"
                    format="YYYY-MM-DD"
                    name="ProgramSchedule"
                    className="form-control"
                    value={listcontentStartDate}
                    onChange={(e) => setlistcontentStartDate(e.target.value)}
                  />
                </div>
                <div className="col-6" style={{ padding: "5px" }}>
                  <input
                    type="time"
                    format="HH:mm"
                    name="ProgramSchedule"
                    className="form-control"
                    value={listcontentStatrt}
                    onChange={(e) => setlistcontentStart(e.target.value)}
                  />
                </div>
                <label>
                    <b>Ends At</b>
                  </label>
                <div className="col-6" style={{ padding: "5px" }}>
                  
                  <input
                    type="date"
                    format="YYYY-MM-DD"
                    name="ProgramSchedule"
                    className="form-control"
                    value={listcontentEndDate}
                    onChange={(e) => setlistcontentEndDate(e.target.value)}
                  />
                </div>
                <div className="col-6" style={{ padding: "5px", marginBottom:"10px" }}>
                  
                  <input
                    type="time"
                    format="HH:mm"
                    name="ProgramSchedule"
                    className="form-control"
                    value={listcontentEnd}
                    onChange={(e) => setlistcontentEnd(e.target.value)}
                  />
                </div>
                <div className="col-3"></div>
                <div className="col-6">
                  <Button
                    color="info"
                    type="submit"
                    className=" form-control"
                    onClick={() => addtolist()}
                  >
                    Add to List
                  </Button>
                </div>
                <div className="col-3"></div>
              </div>
              <div className="slideshareborder"></div>
              {listarray.map((e, i) => (
                <div className="row" style={{marginBottom:"4px", paddingBottom:"4px", borderBottom:"0.8px solid gray"}}>
                <div className="col-11 row">
                  <b className="col-11">{e[0]}</b>
                  
                  <div className="col-6">
                    {e[1]} {"("}{e[3]}{")"}
                  </div>
                  <div className="col-6">
                    {e[2]} {"("}{e[4]}{")"}
                  </div>
                </div>
                <Button
                    color="Secondary"
                    className="col-1"
                    onClick={() => removelistcontent(i)}
                  >
                    x
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Create List
              </Button>{" "}
              {/*<Button color="secondary" onClick={CancelSlideShareClickHandler}>Cancel</Button>*/}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalwebIframe} toggle={togglewebIframe}>
        <ModalHeader toggle={togglewebIframe}>
          Create a new Web Iframe Widget
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <b>Enter the url of Website</b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="url"
                className="form-control websiteLink"
                value={weblinkframe}
                onChange={(e) => setweblinkframe(e.target.value)}
              ></input>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Create
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalweather} toggle={toggleweather}>
        <ModalHeader toggle={toggleweather}>
          Create a new Weather Widget
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <b>Enter the City ZIP code</b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="number"
                className="form-control websiteLink"
                value={weatherInput}
                onChange={(e) => setweatherInput(e.target.value)}
              ></input>
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-6" style={{ paddingRight: "4px" }}>
                  <b>Select the unit for Wind Speed</b>
                  <select
                    className="form-control"
                    value={weatherWind}
                    name="Wind speed"
                    onChange={(event) => setweatherWind(event.target.value)}
                  >
                    <option value="km">Km per hour</option>
                    <option value="mi">Miles per hour</option>
                  </select>
                </div>
                <div className="col-6" style={{ paddingLeft: "4px" }}>
                  <b>Select the unit for Temperature</b>
                  <select
                    className="form-control"
                    value={weatherTemp}
                    name="Wind speed"
                    onChange={(event) => setweatherTemp(event.target.value)}
                  >
                    <option value="C">Celsius</option>
                    <option value="F">Fahrenheit</option>
                  </select>
                </div>
              </div>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Save
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalyoutubevideo} toggle={toggleyoutubewidget}>
        <ModalHeader toggle={toggleyoutubewidget}>
          Create a new YouTube Video Widget
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <b>Enter the url of youtube video</b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="url"
                className="form-control websiteLink"
                value={youtubeVideo}
                onChange={(e) => setyoutubevideo(e.target.value)}
              ></input>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Create
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalvideoPlayer} toggle={toggleVideoPlayer}>
        <ModalHeader toggle={toggleVideoPlayer}>
          Create a new DASH/HLS Video Player Widget
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <b>Enter the url of video</b>
              <b style={{ color: "red" }}>*</b>
              <input
                type="url"
                className="form-control websiteLink"
                value={videoPlayer}
                onChange={(e) => setvideoPlayer(e.target.value)}
              ></input>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Create
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      {/*<Modal isOpen={modalOneDrive} toggle={toggleOneDrive}>
        <ModalHeader toggle={toggleOneDrive}>OneDrive Picker</ModalHeader>
        <ModalBody>
          <div>
          </div>
        </ModalBody>
          </Modal>*/}
      <Modal isOpen={modalannouncement} toggle={toggleannouncement}>
        <ModalHeader toggle={toggleannouncement}>
          Create a new Announcement WIdget
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={onSubmit} className="slidesharemainform">
              <b>Enter the Announcement Message</b>
              <b style={{ color: "red" }}>*</b>
              <textarea
                type="test"
                className="form-control websiteLink"
                value={announcementtext}
                onChange={(e) => setannouncementtext(e.target.value)}
              ></textarea>
              <Button
                color="primary"
                type="submit"
                className="form-control"
                onClick={handleSubmit}
              >
                Create
              </Button>{" "}
            </form>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        size="sm"
        centered={true}
        isOpen={props.modaleditLayoutConfirm}
        toggle={props.toggleEditConfirm}
      >
        <ModalHeader toggle={props.toggleEditConfirm}>Confirmation</ModalHeader>
        <ModalBody>
          <div>
            <div>Dont't forget to save the changes, if not done. </div>
            <div style={{ marginBottom: "20px" }}>
              {" "}
              <b> Are you Sure you want to leave? </b>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="success"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  saveLayout();
                  props.toggleEditConfirm();
                  props.setmodaleditLayout(!props.modaleditLayout);
                }}
              >
                Save
              </Button>
              <Button
                color="danger"
                style={{ marginRight: "10px" }}
                onClick={async () => {
                  props.toggleEditConfirm();
                  for (let i = 0; i < props.addwidgetDelete.length; i++) {
                    let dataDelete = {
                      id: props.addwidgetDelete[i],
                    };
                    await httpService
                      .CreateUpdate("removewidgetApi", dataDelete)
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                  props.setaddwidgetDelete([]);
                  props.setmodaleditLayout(!props.modaleditLayout);
                }}
              >
                Leave
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  props.toggleEditConfirm();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Layout;
