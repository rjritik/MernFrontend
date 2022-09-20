import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "./test.css";
import gif1 from "../../assets/gif1.gif";
import gif2 from "../../assets/gif2.gif";
import gif3 from "../../assets/gif3.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import httpService from "../../services/http.service";
import ReactWeather, { useOpenWeather } from "react-open-weather";
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
import "./layout/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImages, faCog } from "@fortawesome/free-solid-svg-icons";
import GooglePicker from "react-google-picker";
import DropboxChooser from "react-dropbox-chooser";
// import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";
import secretutils from "../../secretutils.json";
import Slideshow from "./slideshow/slideshow";
import weatherImg from "./../../assets/weather.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarouselVideo from "./layout/carouselV";
import CongratWidget from "../widgetComponents/congratulationsWidget";
import AnnouncementWidget from "../widgetComponents/AnnouncementWidget";
import TimeWidget from "../widgetComponents/TimeWidget";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import { SketchPicker } from "react-color";
import ListTest from "../widgetComponents/listTest";
import WeatherWidget from "../widgetComponents/weatherwidget";

var validUrl = require("valid-url");

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // layout: JSON.parse(JSON.stringify(originalLayout)),
      layout: props.layout,
      modalPicture: false,
      modalaudio: false,
      modalYoutube: false,
      modalPlayer: false,
      modalCongrats: false,
      modalAnnouncement: false,
      modalList: false,
      modalWebIframe: false,
      modalSlideshare: false,
      modalWeather: false,
      modalList: false,
      modalDate: false,
      modalEditSettings: false,
      dropdownWidget: false,
      addwidgettype: "",
      widgetId: "",
      widgetColor: "",
      widgetFontColor: "",
      widgetBackColor: "",
      widgetWidth: "",
      timeFormat: "",
      fontFamily: "",
      fontSizeType: "auto",
      fontsize: "small", 
      fontsizeSub : "small",
      // timezone: new Date().getTimezoneOffset() / 60,
      // timezoneUpdate: new Date().getTimezoneOffset() / 60,
      // timeDay: new Date(
      //   new Date().getTime() - (3600000 * new Date().getTimezoneOffset()) / 60
      // )
      //   .toUTCString()
      //   .substring(4, 16),
      // time: new Date(
      //   new Date().getTime() - (3600000 * new Date().getTimezoneOffset()) / 60
      // )
      //   .toUTCString()
      //   .substring(16, 25),

      youtubeVideo: "",
      videoPlayer: "",
      weblinkframe: "",
      announcementtext: "",
      Congratulation: "",
      congratgif: "",
      weatherCity: "",
      weatherWind: "",
      weatherTemp: "",
      listArray: [],
      showTime: true,
      showDate: true,
      listshow: false,
      audioArray: [],
      // datawidget: this.props.widgetList.data
    };
    this.myInput = React.createRef();
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onEditSettingsItem = this.onEditSettingsItem.bind(this);

    this.togglePicture = this.togglePicture.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleEditSettingsItem = this.toggleEditSettingsItem.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleYoutube = this.toggleYoutube.bind(this);
    this.toggleVideoPlayer = this.toggleVideoPlayer.bind(this);
    this.toggleDate = this.toggleDate.bind(this);
    this.toggleWebIframe = this.toggleWebIframe.bind(this);
    this.toggleCongrats = this.toggleCongrats.bind(this);
    this.toggleWeather = this.toggleWeather.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleAnnouncement = this.toggleAnnouncement.bind(this);
    this.toggleSlideshare = this.toggleSlideshare.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitPicture = this.handleSubmitPicture.bind(this);
    this.Setwidgettoggle = this.Setwidgettoggle.bind(this);
  }
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    margin: [0, 0],
    onLayoutChange: function () {},
  };

  componentDidMount() {
    console.log(this.myInput);
  }
  componentDidMount() {
    // this.intervalID = setInterval(() => this.updateClock(), 1000);
  }
  componentWillUnmount() {
    // clearInterval(this.intervalID);
  }
  // updateClock() {
  //   // console.log(this.state.timezone);
  //   let timeData = new Date(
  //     parseInt(new Date().getTime()) +
  //       3600000 * parseInt(this.state.timezoneUpdate)
  //   )
  //     .toUTCString()
  //     .substring(17, 25);
    
  //     let first = timeData.substring(0,2);
  //     let second = timeData.substring(3,5);
  //     let firstInt = parseInt(first);
  //     let firstIntData = (firstInt -12).toLocaleString('en-US', {
  //       minimumIntegerDigits: 2,
  //       useGrouping: false
  //     });
  //     if(firstInt >= 0 && firstInt < 12){
  //       this.setState({
  //         time: first + ":" + second + " AM"
  //       });
  //     }else{
  //       this.setState({
  //         time: firstIntData + ":" + second + " PM"
  //       });
  //     }
  //   this.setState({
  //     timeDay: new Date(
  //       new Date().getTime() + 3600000 * parseInt(this.state.timezoneUpdate)
  //     )
  //       .toUTCString()
  //       .substring(4, 16),
  //   });
  // }
  onSubmit(e) {
    e.preventDefault();
  }
  togglePicture() {
    this.setState({
      modalPicture: !this.state.modalPicture,
    });
    return;
  }
  toggleAudio() {
    this.setState({
      modalaudio: !this.state.modalaudio,
    });
    return;
  }
  toggleAnnouncement() {
    this.setState({
      modalAnnouncement: !this.state.modalAnnouncement,
    });
    return;
  }
  toggleSlideshare() {
    this.setState({
      modalSlideshare: !this.state.modalSlideshare,
    });
    // this.props.getWidgets();
    return;
  }
  Setwidgettoggle() {
    this.setState({
      dropdownWidget: !this.state.dropdownWidget,
    });
    // this.props.getWidgets();
    return;
  }
  toggleList() {
    this.setState({
      modalList: !this.state.modalList,
    });
    return;
  }
  toggleWeather() {
    this.setState({
      modalWeather: !this.state.modalWeather,
    });
    return;
  }
  toggleList() {
    this.setState({
      modalList: !this.state.modalList,
    });
    return;
  }
  toggleYoutube() {
    this.setState({
      modalYoutube: !this.state.modalYoutube,
    });
    return;
  }
  toggleVideoPlayer() {
    this.setState({
      modalPlayer: !this.state.modalPlayer,
    });
    return;
  }
  toggleDate() {
    this.setState({
      modalDate: !this.state.modalDate,
    });
    return;
  }
  toggleWebIframe() {
    this.setState({
      modalWebIframe: !this.state.modalWebIframe,
    });
    return;
  }
  toggleCongrats() {
    this.setState({
      modalCongrats: !this.state.modalCongrats,
    });
    return;
  }
  toggleEditSettingsItem() {
    this.setState({
      modalEditSettings: !this.state.modalEditSettings,
    });
    this.setState({
      addwidgettype : ""
    })
    return;
  }
  onResize(layout, oldLayoutItem, layoutItem, placeholder) {
    // console.log(this.props.widthLayout);
    // console.log("layout:", layout,"oldLayoutItem:", oldLayoutItem,"layoutItem:", layoutItem,"placeholder:", placeholder);
    let dataTo = true;
    for (let i = 0; i < layout.length; i++) {
      if (parseInt(layout[i].h) + parseInt([i].y) > 19) {
        dataTo = false;
      }
      if(layout[i].minW){
        layout[i].minW = 0;
      }
      if(layout[i].minH){
        layout[i].minH = 0;
      }
    }

    if (!dataTo || parseInt(layoutItem.h) + parseInt(layoutItem.y) > 19) {
      layoutItem.w = oldLayoutItem.w;
      placeholder.w = oldLayoutItem.w;
      layoutItem.h = oldLayoutItem.h;
      placeholder.h = oldLayoutItem.h;
    }

    // if (layoutItem.h < 3 && layoutItem.w < 2) {
    //   layoutItem.w = 2;
    //   placeholder.w = 2;
    //   layoutItem.h = 3;
    //   placeholder.h = 3;
    // }
  }
  onDrag(layout, oldLayoutItem, layoutItem, placeholder) {
    // console.log(this.props.widthLayout);
    // console.log("layout:", layout,"oldLayoutItem:", oldLayoutItem,"layoutItem:", layoutItem,"placeholder:", placeholder);

    let x = oldLayoutItem.x;
    let y = oldLayoutItem.y;
    if (parseInt(layoutItem.h) + parseInt(layoutItem.y) > 19) {
      layoutItem.w = oldLayoutItem.w;
      layoutItem.x = x;
      layoutItem.y = y;
      placeholder.w = oldLayoutItem.w;
      placeholder.x = x;
      placeholder.y = y;
      layoutItem.h = oldLayoutItem.h;
      placeholder.h = oldLayoutItem.h;
    }
  }

  resetLayout() {
    this.setState({
      layout: [],
    });
  }
  getId(url) {
    const regExp =
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
    const match = url.match(regExp);

    return match[1];
  }

  async onLayoutChange(layout) {
    /*eslint no-console: 0*/
    for (let i = 0; i < layout.length; i++) {
      if (parseInt(layout[i].h) + parseInt(layout[i].y) > 19) {
        // layout[i].w = 2;
        if (parseInt(layout[i].h) + parseInt(layout[i].y) - 19 < layout[i].h) {
          layout[i].h =
            layout[i].h - (parseInt(layout[i].h) + parseInt(layout[i].y) - 19);
        } else {
          layout[i].h = 1;
          layout[i].w = 1;
        }
      }
      if (parseInt(layout[i].y) > 19) {
        // layout[i].w = 2;
        layout[i].y = 19;
      }
    }

    await saveToLS("layout", layout);
    this.props.setlayout(() => {
      return layout;
    });
    this.setState({ layout });
    this.props.onLayoutChange(layout);
  }
  async onRemoveItem(index) {
    let datawidget = [...this.props.widgetList];
    let deleteArray = [...this.props.deleteWidgetId];
    deleteArray.push(datawidget[index]._id);
    this.props.setdeleteWidgetId(() => {
      return deleteArray;
    });
    // await httpService.CreateUpdate("removewidgetApi", data).catch((err) => {
    //   console.log(err);
    // });
    datawidget.splice(index, 1);
    this.props.setwidgetList(() => {
      return datawidget;
    });
  }
  async onEditItem(e) {
    if (e.type == "youtube") {
      this.toggleYoutube();
      this.setState({
        addwidgettype: "youtube",
      });
      this.setState({
        youtubeVideo: e.content[0],
      });
      this.setState({
        widgetId: e._id,
      });
    } else if (e.type == "videoplayer") {
      this.toggleVideoPlayer();
      this.setState({
        addwidgettype: "videoplayer",
      });
      this.setState({
        videoPlayer: e.content[0],
      });
      this.setState({
        widgetId: e._id,
      });
    } else if (e.type == "webiframe") {
      this.toggleWebIframe();
      this.setState({
        addwidgettype: "webiframe",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        weblinkframe: e.content[0],
      });
    } else if (e.type == "announcement" || e.type == "initialAnnouncement") {
      this.toggleAnnouncement();
      this.setState({
        addwidgettype: "announcement",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        announcementtext: e.content[0],
      });
    } else if (e.type == "list") {
      this.toggleList();
      this.setState({
        addwidgettype: "list",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        listArray: e.content,
      });
      this.setState({
        listshow : e.listshow ? e.listshow : false,
      });
    } else if (e.type == "audioplayer") {
      this.toggleAudio();
      this.setState({
        addwidgettype: "audioplayer",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        audioArray: e.content,
      });
    } else if (e.type == "picture" || e.type == "initialPicture") {
      this.togglePicture();
      this.setState({
        addwidgettype: "picture",
      });
      this.setState({
        widgetId: e._id,
      });
    } else if (e.type == "congrats" || e.type == "initialCongratulation") {
      this.toggleCongrats();
      this.setState({
        addwidgettype: "congrats",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        congratgif: e.content[1] || "",
        Congratulation: e.content[0] || "",
      });
    } else if (e.type == "date" || e.type == "initialDate") {
      this.toggleDate();
      this.setState({
        addwidgettype: "date",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        timezone: e.content[1] || this.state.timezone,
      });
      this.setState({
        showTime : e.content[2] != undefined ? e.content[2] : this.state.showTime,
      });
      this.setState({
        showDate : e.content[3] != undefined ? e.content[3] : this.state.showDate,
      });
    } else if (e.type == "slideshare" || e.type == "initialSlideshare") {
      // this.props.setrightContentType (()=> {return "slideshow"});
      this.toggleSlideshare();
      this.setState({
        widgetId: e._id,
      });
    } else if (e.type == "weather" || e.type == "initialWeather") {
      // this.props.setrightContentType (()=> {return "slideshow"});
      this.toggleWeather();
      this.setState({
        addwidgettype: "weather",
      });
      this.setState({
        widgetId: e._id,
      });
      this.setState({
        weatherCity: e.content[1] || "",
      });
      this.setState({
        weatherWind: e.content[2] || "mi",
      });
      this.setState({
        weatherTemp: e.content[3] || "F",
      });
    }
  }
  async onEditSettingsItem(e) {
    this.toggleEditSettingsItem();
    this.setState({
      widgetId: e._id,
    });
    this.setState({
      widgetColor: e.color,
    });
    this.setState({
      widgetFontColor: e.fcolor,
    });
    this.setState({
      widgetBackColor: e.bcolor,
    });
    this.setState({
      widgetWidth: e.width,
    });
    this.setState({
      timeFormat: e.timeFormat ? e.timeFormat: "",
    })
    this.setState({
      fontFamily: e.fontFamily ? e.fontFamily: "",
    })
    this.setState({
      fontSizeType: e.fontSizeType ? e.fontSizeType: "auto",
    })
    this.setState({
      fontsize: e.fontsize ? e.fontsize: "small",
    })
    this.setState({
      fontsizeSub: e.fontsizeSub ? e.fontsizeSub: "small",
    })
    if(e.type== "date" || e.type == "initialDate"){
      this.setState({
        addwidgettype: "date",
      });
    }
    if(e.type == "list"){
      this.setState({
        addwidgettype: "list",
      });
    }
    if(e.type == "congrats"){
      this.setState({
        addwidgettype: "congrats",
      });
    }
    if(e.type == "youtube"){
      this.setState({
        addwidgettype: "youtube",
      });
    }
    if(e.type == "picture" || e.type== "initialPicture"){
      this.setState({
        addwidgettype: "picture",
      });
    }
    if(e.type == "audioplayer"){
      this.setState({
        addwidgettype: "audioplayer",
      });
    }
    if(e.type == "weather"){
      this.setState({
        addwidgettype: "weather",
      });
    }
    if(e.type == "slideshare"){
      this.setState({
        addwidgettype: "slideshare",
      });
    }
    if(e.type == "webiframe"){
      this.setState({
        addwidgettype: "webiframe",
      });
    }
    if(e.type == "videoplayer"){
      this.setState({
        addwidgettype: "videoplayer",
      });
    }
    if(e.type == "announcement" || e.type== "initialAnnouncement"){
      this.setState({
        addwidgettype: "announcement",
      });
    }
  }
  async editLayoutSettings() {
    let data = {
      id: this.state.widgetId,
      color: this.state.widgetColor,
      fcolor: this.state.widgetFontColor,
      bcolor: this.state.widgetBackColor,
      width: this.state.widgetWidth,
      timeFormat: this.state.timeFormat,
      fontFamily: this.state.fontFamily,
      fontSizeType: this.state.fontSizeType,
      fontsize: this.state.fontsize,
      fontsizeSub: this.state.fontsizeSub,
    };
    // let dataRec = await httpService
    //   .CreateUpdate("updateWidgetSettings", data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //   if(dataRec){
    //     toast.success("Widget Settings Updated ", {
    //       position: "bottom-left",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    for (let i = 0; i < this.props.widgetList.length; i++) {
      if (data.id == this.props.widgetList[i]._id) {
        let widgetlistData = [...this.props.widgetList];
        widgetlistData[i].color = data.color;
        widgetlistData[i].fcolor = data.fcolor;
        widgetlistData[i].bcolor = data.bcolor;
        widgetlistData[i].width = data.width;
        widgetlistData[i].timeFormat = data.timeFormat ? data.timeFormat : "";
        widgetlistData[i].fontFamily = data.fontFamily ? data.fontFamily : "";
        widgetlistData[i].fontSizeType = data.fontSizeType ? data.fontSizeType : "";
        widgetlistData[i].fontsize = data.fontsize ? data.fontsize : "small";
        widgetlistData[i].fontsizeSub = data.fontsizeSub ? data.fontsizeSub : "small";
        this.props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...this.props.editWidgeContent];
        editwidgetlistData.push(data);
        this.props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
    this.setState({
      widgetColor: "",
    });
    this.setState({
      widgetColor: "",
    });
    this.setState({
      widgetFontColor: "",
    });
    this.setState({
      widgetBackColor: "",
    });
    this.setState({
      timeFormat: "",
    });
    this.setState({
      fontFamily: "",
    });
    this.setState({
      fontSizeType: "",
    });
    this.setState({
      fontsize: "small",
    });
    this.setState({
      fontsizeSub: "small",
    });
  }

  getstoriesinfo(data) {
    let stories = [];
    data.content.map((elem) => {
      if (elem[1] == "image") {
        stories.push({
          content: ({ action, story }) => {
            return (
              <div
                style={{
                  background: "#333",
                  width: "100%",
                  padding: 2,
                  color: "white",
                  height: "100%",
                }}
              >
                <img
                  className="imageslideshare"
                  style={
                    {
                      // width: "auto",
                      // height: "100%",
                      // maxHeight: "40vh"
                    }
                  }
                  src={this.getpictureurl(elem[0])}
                  alt="SlideImg"
                ></img>
              </div>
            );
          },
          duration: parseInt(elem[5]) * 1000,
        });
      } else {
        stories.push({
          content: ({ action, story }) => {
            return (
              <div
                style={{
                  background: "snow",
                  padding: 2,
                  height: "100%",
                  width: "100%",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  maxHeight="20vh"
                  src={
                    "https://www.youtube.com/embed/" +
                    this.getId(elem[0]) +
                    "?autoplay=1&loop=1&playlist=" +
                    this.getId(elem[0])
                  }
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            );
          },
          duration: parseInt(elem[4]) * 1000,
        });
      }
    });
    return stories;
  }
  getpictureurl(url) {
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
  }
  async handleSubmitPicture(url, name) {
    const data = {
      type: "picture",

      id: this.state.widgetId,
      content: [
        {
          title: name,
          image: url,
        },
      ],
    };
    // let widgetdata = await httpService
    //   .CreateUpdate("updateWidgetApi", data)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // this.props.getWidgets();
    for (let i = 0; i < this.props.widgetList.length; i++) {
      if (data.id == this.props.widgetList[i]._id) {
        let widgetlistData = [...this.props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        this.props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...this.props.editWidgeContent];
        editwidgetlistData.push(data);

        this.props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
    toast.success("Picture Widget Updated ", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  async handleSubmitEdit() {
    // event.preventDefault();
    let data = {};
    if (this.state.addwidgettype == "list") {
      if (this.state.listArray.length == 0) {
        toast.warn("Please Enter some content to add to the list", {
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



      let listArrayData = [...this.state.listArray];
      for(let i =0 ; i< listArrayData.length; i++){
        if(listArrayData[i][0] == "" || listArrayData[i][0] == undefined || listArrayData[i][1] == "" || listArrayData[i][1] == undefined || listArrayData[i][2] == "" || listArrayData[i][2] == undefined || listArrayData[i][3] == "" || listArrayData[i][3] == undefined || listArrayData[i][4] == "" || listArrayData[i][4] == undefined){
          toast.warn("Please enter date and time properly", {
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
        let stYr = listArrayData[i][3].substring(0,4);
        let stmon = parseInt(listArrayData[i][3].substring(5,7)) - 1;
        let stday = listArrayData[i][3].substring(8,10);
        let enYr = listArrayData[i][4].substring(0,4);
        let enmon = parseInt(listArrayData[i][4].substring(5,7)) -1;
        let enday = listArrayData[i][4].substring(8,10);

        let sthr = listArrayData[i][1].substring(0,2);
        let stmin = listArrayData[i][1].substring(3,5);
        let enhr = listArrayData[i][2].substring(0,2);
        let enmin = listArrayData[i][2].substring(3,5);
        

        let startDate = new Date(stYr, stmon, stday, sthr, stmin).getTime();
        let endDate = new Date(enYr, enmon, enday, enhr, enmin).getTime();

        let diff = endDate - startDate;
        if(diff > 0){
          let newArray = [...this.state.listArray];
          newArray[i][5] = startDate;
          newArray[i][6] = endDate;
          this.setState({ listArray: newArray });

        
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
          return;
        }
      }
      var sortedArray = this.state.listArray.sort(function(a, b) {
        return a[5] - b[5];
      });
      this.setState({ listArray: sortedArray });
      data = {
        type: "list",
        id: this.state.widgetId,
        content: this.state.listArray,
        listshow : this.state.listshow
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      toast.success("List Widget Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggleList();
    } else if (this.state.addwidgettype == "youtube") {
      if (this.state.youtubeVideo == "") {
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
      if (!validUrl.isUri(this.state.youtubeVideo)) {
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
      data = {
        type: "youtube",
        id: this.state.widgetId,
        content: [this.state.youtubeVideo],
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      toast.success("Youtube Widget Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggleYoutube();
    } else if (this.state.addwidgettype == "videoplayer") {
      if (this.state.videoPlayer == "") {
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
      if (!validUrl.isUri(this.state.videoPlayer)) {
        toast.warn("Please Enter the Valid URL", {
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
      data = {
        type: "videoplayer",
        id: this.state.widgetId,
        content: [this.state.videoPlayer],
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });

      toast.success("Video URL Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggleVideoPlayer();
    } else if (this.state.addwidgettype == "audioplayer") {
      if (this.state.audioArray.length <= 0) {
        toast.warn("Please select atleast one audio file", {
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
      data = {
        type: "audioplayer",
        id: this.state.widgetId,
        content: this.state.audioArray,
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });

      toast.success("Audio Playlist Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggleAudio();
    } else if (this.state.addwidgettype == "webiframe") {
      if (this.state.weblinkframe == "") {
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
      data = {
        type: "webiframe",
        id: this.state.widgetId,
        content: [this.state.weblinkframe],
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      toast.success("WebIFrame Widget Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.addwidgettype == "date") {
      if (this.state.timezone == "") {
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
      if (!(this.state.showTime || this.state.showDate)) {
        toast.warn("Please select at least on show option", {
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
      data = {
        type: "date",
        id: this.state.widgetId,
        content: ["Date/Time", this.state.timezone, this.state.showTime, this.state.showDate],
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.setState({
        timezoneUpdate: this.state.timezone
      });
      this.toggleDate();
      toast.success("Date/Time Widget Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.addwidgettype == "announcement") {
      if (this.state.announcementtext == "") {
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

      data = {
        type: "announcement",

        id: this.state.widgetId,
        content: [this.state.announcementtext],
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      toast.success("Announcement Widget Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggleAnnouncement();
    } else if (this.state.addwidgettype == "congrats") {
      if (this.state.Congratulation == "") {
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
      if (this.state.congratgif == "") {
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
      data = {
        type: "congrats",
        id: this.state.widgetId,
        content: [this.state.Congratulation, this.state.congratgif],
      };
      // let widgetdata = await httpService
      //   .CreateUpdate("updateWidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      toast.success("Congratulations Widget Updated ", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.toggleCongrats();
    } else if (this.state.addwidgettype == "weather") {
      if (this.state.weatherCity == "") {
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
        `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.weatherCity},us&appid=${this.props.weatherApiKey}`
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
          const dataRec = await response.json();

          data = {
            type: "weather",
            id: this.state.widgetId,
            content: [
              dataRec,
              this.state.weatherCity,
              this.state.weatherWind,
              this.state.weatherTemp,
            ],
          };
          // let widgetdata = await httpService
          //   .CreateUpdate("updateWidgetApi", data)
          //   .catch((err) => {
          //     console.log(err);
          //   });
          toast.success("Weather Widget Updated ", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.toggleWeather();
        }
      });
    } else if (this.state.addwidgettype == "picture") {
      // const data = {
      //   type: "picture",
      //   content: [
      //     {
      //       title: picturetitle,
      //       image: pictureurl,
      //     },
      //   ],
      // };
      // const user = await httpService
      //   .CreateUpdate("addwidgetApi", data)
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // setmodalPicture(false);
      // setPicture({
      //   Images: [],
      // });
      // setPicturetitle("");
      // setPictureurl("");
    }

    // this.props.getWidgets();

    for (let i = 0; i < this.props.widgetList.length; i++) {
      if (data.id == this.props.widgetList[i]._id) {
        let widgetlistData = [...this.props.widgetList];
        widgetlistData[i].type = data.type;
        widgetlistData[i].content = data.content;
        widgetlistData[i].listshow = data.listshow ? data.listshow : false;
        this.props.setwidgetList(() => {
          return widgetlistData;
        });
        let editwidgetlistData = [...this.props.editWidgeContent];
        editwidgetlistData.push(data);

        this.props.seteditWidgeContent(() => {
          return editwidgetlistData;
        });
      }
    }
    // this.setState({
    //   modalPicture : false,
    //   modalYoutube : false,
    //   modalCongrats : false,
    //   modalAnnouncement : false,
    //   modalList : false,
    //   modalWebIframe : false,
    //   addwidgettype : "",
    //   widgetId : "",

    //   youtubeVideo : "",
    // })
    // this.props.getWidgets();
  }
  getAudioId(e) {
    let field = e.split("file/d/");
    let stringdata = field[1].split("/view")[0];
    return stringdata;
  }
  checkMuted(e) {
    if(e._id == this.props.selectedAudioId){
      if(this.props.muted == true){
        return "1"
      }else{
        return "0"
      }
    }else{
      return "1"
    }
  }
  decimalToHex (alpha){
    let data = alpha == 0.000 ? '00' : parseInt(255 * alpha).toString(16).padStart(2,0);
    // return alpha === 0 ? '00' : parseInt(255 * alpha).toString(16);
    return data;
  }

  handleOpenPicker() {
    this.props.openPicker({
      clientId: this.props.driveClientid,
      developerKey: this.props.drivekey,
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
            this.setState({
              addwidgettype: "audioplayer",
            });
            // this.handleSubmitPicture(i.url, i.name);
            let array = [...this.state.audioArray];
            array.push({ link: i.url, name: i.name });
            this.setState({
              audioArray: array,
            });
          });
        }
      },
    })
  }

  handleOpenPicker2() {
    this.props.openPicker({
      clientId: this.props.driveClientid,
      developerKey: this.props.drivekey,
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
            this.setState({
              addwidgettype: "picture",
            });
            this.handleSubmitPicture(i.url, i.name);
          });
        }
      },
    })
  }


  render() {
    return (
      <div>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onResize={this.onResize}
          onDragStop={this.onDrag}
          isResizable={!this.props.preview}
          isDraggable={!this.props.preview}
          verticalCompact={false}
          rowHeight={parseInt(this.props.widthLayout) / 48}
          margin={[
            parseInt(this.props.widthLayout) / 130,
            parseInt(this.props.widthLayout) / 130,
          ]}

          // isBounded={true}
        >
          {this.props.widgetList.map((e, index) => {
            return (
              <div
                key={e._id}
                className="widgetcontainer"
                data-grid={{ w: 2, h: 4, x: 0, y: 0}}
                ref={(ref) => (this.myInput = ref)}
                style={{
                  color: `${e.fcolor ? e.fcolor : "#000"}`,
                  border: `${parseInt(e.width ? e.width : 2)}px solid ${
                    e.color ? e.color : "#000"
                  }`,
                  padding: parseInt(this.props.widthLayout) / 300,
                  background: `linear-gradient(to bottom left,${
                    e.bcolor ? e.bcolor : "#fff"
                  } 0%, ${e.bcolor ? e.bcolor : "#fff"} 100%)`,
                  fontFamily: `${
                    e.fontFamily ? e.fontFamily : "Times New Roman, Times, serif"}`,
                }}
              >
                {e.type == "list" ? (
                  <div className="listclass">
                    <ListTest e={e} width="100%" />
                  </div>
                ) : e.type == "youtube" ? (
                  <span className="text youtubeVideo">
                    <iframe
                      style={{ zIndex: "-100" }}
                      width="100%"
                      height="100%"
                      src={
                        "https://www.youtube.com/embed/" +
                        this.getId(e.content[0]) +
                        "?autoplay=1&mute=" + this.checkMuted(e) + "&loop=1&playlist=" +
                        this.getId(e.content[0])
                      }
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </span>
                ) : e.type == "webiframe" ? (
                  <span className="text youtubeVideo">
                    <iframe
                      src={e.content[0]}
                      width="100%"
                      height="100%"
                      className="iframeMain"
                    ></iframe>
                  </span>
                ) : e.type == "announcement" ? (
                  <div>
                    <AnnouncementWidget e={e} width="100%" height="100%"/>
                  </div>
                ) : e.type == "congrats" ? (
                  <CongratWidget
                    width="100%"
                    height="100%"
                    e={e}
                    gif1={gif1}
                    gif2={gif2}
                    gif3={gif3}
                  />
                ) : e.type == "picture" ? (
                  <span className="picturemain">
                    <img
                      className="picture"
                      width="auto"
                      height="auto"
                      // src= "https://drive.google.com/uc?export=view&id=1_njOi2DxEp9kuxQqMIHZVYWbj5X3V8qf"
                      src={this.getpictureurl(e.content[0].image)}
                      alt="mainPicture"
                    />
                  </span>
                ) : e.type == "weather" ? (
                  <WeatherWidget e ={e} weatherApiKey = {this.props.weatherApiKey}/>
                ) : e.type == "slideshare" ? (
                  <span className="slidesharemain"> 
                    <CarouselVideo dataPassed={e.content} dataOther = {e}/>
                  </span>
                ) : e.type == "date" || e.type == "initialDate" ? (
                  <span>
                  
                    {e.content[1]
                      ? this.setState({ timezoneUpdate: e.content[1] })
                      : ""}
                    <TimeWidget
                      // time={this.state.time}
                      // timeDay={this.state.timeDay}
                      timeFormat = {e.timeFormat}
                      e = {e}
                      width="100%"
                      height="100%"
                    />
                  </span>
                ) : e.type == "videoplayer" ||
                  e.type == "initialvideoplayer" ? (
                  <span>
                    <ShakaPlayer autoPlay = {true} src={e.content[0]} volume = {e._id == this.props.selectedAudioId ? parseInt(this.props.volume * 100) : 0} muted = {e._id == this.props.selectedAudioId ? this.props.muted : true}/>
                  </span>
                ) : e.type.substring(0, 7) == "initial" &&
                  e.type != "initialDate" ? (
                  <span
                    className="text widgettext"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>{e.content[0]}</div>
                  </span>
                ) : (
                  <span className="text widgettext">Slideshare</span>
                )}
                {!this.props.preview && (
                  <div>
                    <div
                      className="editwidegt"
                      onClick={this.onEditItem.bind(this, e)}
                      // hidden={e.type == "date" || e.type == "initialDate"}
                    >
                      <span className="editwidegticon">
                        <FontAwesomeIcon className="icon" icon={faEdit} />
                      </span>
                    </div>
                    <div
                      className="editwidegtSetting"
                      onClick={
                        this.onEditSettingsItem.bind(this, e)
                      }
                      // hidden={e.type == "date" || e.type == "initialDate"}
                    >
                      <span className="editwidegticon">
                        <FontAwesomeIcon className="icon" icon={faCog} />
                      </span>
                    </div>
                  </div>
                )}
                {!this.props.preview && (
                  <div
                    className="removewidegt"
                    onClick={this.onRemoveItem.bind(this, index)}
                  >
                    <span className="removewidegtcross">x</span>
                  </div>
                )}
              </div>
            );
          })}
        </ReactGridLayout>
        <Modal
          size="lg"
          isOpen={this.state.modalEditSettings}
          toggle={this.toggleEditSettingsItem}
        >
          <ModalHeader toggle={this.toggleEditSettingsItem}>
            Edit the widget Settings
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-6" style={{ padding: "5px" }}>
                    <b>Border Width (in px)</b>
                    <b style={{ color: "red", padding: "5px" }}></b>
                    <input
                      type="number"
                      className="form-control layoutName"
                      value={this.state.widgetWidth}
                      onChange={(event) =>
                        this.setState({ widgetWidth: event.target.value })
                      }
                    ></input>
                  </div>
                  <div className="col-6" style={{ padding: "5px" }}>
                    <b>Font Family</b>
                    <b style={{ color: "red", padding: "5px" }}></b>
                    <select
                      className="form-control"
                      value={this.state.fontFamily}
                      name="RuleType"
                      onChange={(event) =>{
                        this.setState({
                          fontFamily: event.target.value
                        })
                      }
                      }
                    >
                      <option value="">Select</option>
                      <option value="Arial, Helvetica, sans-serif">Arial</option>
                      <option value="Times New Roman, Times, serif">Times New Roman</option>
                      <option value="Lucida Console, Courier New, monospace">Lucida Console</option>
                      <option value="Verdana, Arial, Tahoma, Serif">Verdana</option>
                      <option value="Helvetica, Arial, sans-serif">Helvetica</option>
                    </select>
                  </div>
                  <div className="col-6" style={{ padding: "5px" }} hidden = {this.state.addwidgettype != "announcement" && this.state.addwidgettype != "congrats" && this.state.addwidgettype != "date" && this.state.addwidgettype != "slideshare" && this.state.addwidgettype != "list" && this.state.addwidgettype != "weather"}>
                    <b>Font Size Type</b>
                    <b style={{ color: "red", padding: "5px" }}></b>
                    <select
                      className="form-control"
                      value={this.state.fontSizeType}
                      name="RuleType"
                      onChange={(event) =>{
                        this.setState({
                          fontSizeType: event.target.value
                        })
                      }
                      }
                    >
                      <option value="auto">Auto</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div className="col-6" style={{ padding: "5px" }} hidden={this.state.fontSizeType == "auto" || (this.state.addwidgettype != "announcement" && this.state.addwidgettype != "congrats" && this.state.addwidgettype != "date" && this.state.addwidgettype != "slideshare" && this.state.addwidgettype != "list" && this.state.addwidgettype != "weather")}>
                    <b>Font Size</b>
                    <b style={{ color: "red", padding: "5px" }}></b>
                    {/*<input
                      type="number"
                      className="form-control layoutName"
                      value={this.state.fontsize}
                      onChange={(event) =>
                        this.setState({ fontsize: event.target.value })
                      }
                    ></input>*/}
                    <select
                      className="form-control"
                      value={this.state.fontsize}
                      name="FormatType"
                      onChange={(event) =>{
                        this.setState({
                          fontsize: event.target.value
                        })
                      }}
                    >
                      <option value="xx-large">XX-Large</option>
                      <option value="x-large">X-Large</option>
                      <option value="large">Large</option>
                      <option value="medium">Medium</option>
                      <option value="small">Small</option>
                      <option value="xx-small">XX-Small</option>
                    </select>
                  </div>
                  <div className="col-6" style={{ padding: "5px" }} hidden={this.state.fontSizeType == "auto" || (this.state.addwidgettype != "weather")}>
                    <b>Sub-Header Font Size</b>
                    <b style={{ color: "red", padding: "5px" }}></b>
                    {/*<input
                      type="number"
                      className="form-control layoutName"
                      value={this.state.fontsize}
                      onChange={(event) =>
                        this.setState({ fontsize: event.target.value })
                      }
                    ></input>*/}
                    <select
                      className="form-control"
                      value={this.state.fontsizeSub}
                      name="FormatType"
                      onChange={(event) =>{
                        this.setState({
                          fontsizeSub: event.target.value
                        })
                      }}
                    >
                      <option value="xx-large">XX-Large</option>
                      <option value="x-large">X-Large</option>
                      <option value="large">Large</option>
                      <option value="medium">Medium</option>
                      <option value="small">Small</option>
                      <option value="xx-small">XX-Small</option>
                    </select>
                  </div>
                  <div className="col-6" style={{ padding: "5px" }} hidden = {this.state.addwidgettype != "date" && this.state.addwidgettype != "list"}>
                    <b>Slect time format</b>
                    <b style={{ color: "red", padding: "5px" }}></b>
                    <select
                      className="form-control"
                      value={this.state.timeFormat}
                      name="FormatType"
                      onChange={(event) =>{
                        this.setState({
                          timeFormat: event.target.value
                        })
                      }}
                    >
                      <option value="">Select</option>
                      <option value="12h">12 hour format</option>
                      <option value="24h">24 hour format</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4" style={{ padding: "5px" }}>
                    <b>Border Color</b>
                    <SketchPicker
                      width="auto"
                      color={this.state.widgetColor}
                      onChangeComplete={(hex) => {
                        let colorSet = `${hex.hex}${this.decimalToHex(hex.rgb.a)}`
                        this.setState({ widgetColor: colorSet });
                      }}
                    />
                  </div>
                  <div className="col-4" style={{ padding: "5px" }}>
                    <b>Background Color</b>
                    <SketchPicker
                      width="auto"
                      color={this.state.widgetBackColor}
                      onChangeComplete={(hex) => {
                        let colorSet = `${hex.hex}${this.decimalToHex(hex.rgb.a)}`
                        this.setState({ widgetBackColor: colorSet });
                      }}
                    />
                  </div>
                  <div className="col-4" style={{ padding: "5px" }}>
                    <b>Font Color</b>
                    <SketchPicker
                      width="auto"
                      color={this.state.widgetFontColor}
                      onChangeComplete={(hex) => {
                        let colorSet = `${hex.hex}${this.decimalToHex(hex.rgb.a)}`
                        this.setState({ widgetFontColor: colorSet });
                      }}
                    />
                  </div>
                </div>
                <Button
                  color="primary"
                  type="submit"
                  className="form-control layoutName "
                  onClick={() => {
                    this.toggleEditSettingsItem();
                    this.editLayoutSettings();
                  }}
                  style={{ marginTop: "20px" }}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalYoutube} toggle={this.toggleYoutube}>
          <ModalHeader toggle={this.toggleYoutube}>
            Edit YouTube Video Widget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the url of youtube video</b>
                <input
                  type="url"
                  className="form-control websiteLink"
                  value={this.state.youtubeVideo}
                  onChange={(event) =>
                    this.setState({ youtubeVideo: event.target.value })
                  }
                ></input>
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => this.handleSubmitEdit()}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalPlayer} toggle={this.toggleVideoPlayer}>
          <ModalHeader toggle={this.toggleVideoPlayer}>
            Edit DASH/HLS Video Player Widget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the url of video</b>
                <input
                  type="url"
                  className="form-control websiteLink"
                  value={this.state.videoPlayer}
                  onChange={(event) =>
                    this.setState({ videoPlayer: event.target.value })
                  }
                ></input>
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => this.handleSubmitEdit()}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalDate} toggle={this.toggleDate}>
          <ModalHeader toggle={this.toggleDate}>
            Edit Date/Time Widget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the Timezone of the widget</b>
                <select
                  className="form-control"
                  value={this.state.timezone}
                  onChange={(event) => {
                    this.setState({
                      timezone: event.target.value,
                    });
                  }}
                  style={{marginBottom : "10px"}}
                >
                  <option value="">Select Timezone</option>
                  <option value="-4">Eastern Time</option>
                  <option value="-5">Central Time</option>
                  <option value="-6">Mountain Time</option>
                  <option value="-7">Pacific Time</option>
                  <option value="-8">Alaska Time</option>
                  <option value="-10">Hawaii Time</option>
                </select>
                <div className="row" style={{marginBottom : "20px"}}>
                  <div className ="col-6">
                  <label><b>Show Time {" "}</b></label>
                  <input
                    type="checkbox"
                    className="checkboxLayout"
                    value={this.state.showTime}
                    checked={this.state.showTime}
                    onChange={async (event) => {
                      this.setState({showTime : !this.state.showTime});
                    }}
                  ></input>
                  </div>
                  <div className="col-6">
                  <label><b>Show Date {" "}</b></label>
                  <input
                    type="checkbox"
                    className="checkboxLayout"
                    value={this.state.showDate}
                    checked={this.state.showDate}
                    onChange={async (event) => {
                      this.setState({showDate : !this.state.showDate});
                    }}
                  ></input>
                  </div>
                </div>
                
                  
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => this.handleSubmitEdit()}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalWebIframe} toggle={this.toggleWebIframe}>
          <ModalHeader toggle={this.toggleWebIframe}>
            Edit Web Iframe Widget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the url of Website</b>
                <input
                  type="url"
                  className="form-control websiteLink"
                  value={this.state.weblinkframe}
                  onChange={(e) =>
                    this.setState({ weblinkframe: e.target.value })
                  }
                ></input>
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => this.handleSubmitEdit()}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalWeather} toggle={this.toggleWeather}>
          <ModalHeader toggle={this.toggleWeather}>
            Edit Weather Widget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the City ZIP code</b>
                <input
                  type="number"
                  className="form-control websiteLink"
                  value={this.state.weatherCity}
                  onChange={(e) =>
                    this.setState({ weatherCity: e.target.value })
                  }
                ></input>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-6" style={{ paddingRight: "4px" }}>
                    <b>Select the unit for Wind Speed</b>
                    <select
                      className="form-control"
                      value={this.state.weatherWind}
                      name="Wind speed"
                      onChange={(e) => {
                        this.setState({ weatherWind: e.target.value });
                      }}
                    >
                      <option value="km">Km per hour</option>
                      <option value="mi">Miles per hour</option>
                    </select>
                  </div>
                  <div className="col-6" style={{ paddingLeft: "4px" }}>
                    <b>Select the unit for Temperature</b>
                    <select
                      className="form-control"
                      value={this.state.weatherTemp}
                      name="Wind speed"
                      onChange={(e) => {
                        this.setState({ weatherTemp: e.target.value });
                      }}
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
                  onClick={() => {
                    this.handleSubmitEdit();
                  }}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.modalAnnouncement}
          toggle={this.toggleAnnouncement}
        >
          <ModalHeader toggle={this.toggleAnnouncement}>
            Edit the Announcement WIdget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the Announcement Message</b>
                <textarea
                  type="test"
                  className="form-control websiteLink"
                  value={
                    this.state.announcementtext == "Announcement Message"
                      ? ""
                      : this.state.announcementtext
                  }
                  onChange={(e) =>
                    this.setState({ announcementtext: e.target.value })
                  }
                ></textarea>
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => {
                    this.handleSubmitEdit();
                  }}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalList} toggle={this.toggleList}>
          <ModalHeader toggle={this.toggleList}>
            Edit the List WIdget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <div style={{ marginBottom: "10px" }}>
                  <b className="addcontentheader">List content</b>
                  <Button className="  btn btn-primary addcontentlist">
                    <b>
                      <div
                        onClick={() => {
                          let newArray = [...this.state.listArray];
                          newArray.push(["","","","","","",""]);
                          this.setState({ listArray: newArray });
                        }}
                      >
                        {" "}
                        +{" "}
                      </div>
                    </b>
                  </Button>
                  <div style={{display:"inline-block", float:"right"}}>
                  <label><b>Show Date and Time {" "}</b></label>
                  <input
                    type="checkbox"
                    className="checkboxLayout"
                    value={this.state.listshow}
                    checked={this.state.listshow}
                    onChange={async (event) => {
                      this.setState({listshow : !this.state.listshow});
                    }}
                  ></input>
                  </div>
                  
                </div>
                {this.state.listArray.map((e, i) => {
                  return (
                    <div className="row" style={{ marginBottom: "10px", padding:"5px", border:"1px solid gray", borderRadius:"5px" }}>
                      <div className="col-11" style={{ padding: "5px" }}>
                      <label>
                        <b>Item Label</b>
                      </label>
                      </div>
                      <div className="col-1" style={{ paddingTop: "5px" }}>
                        <label>
                          <b>Delete</b>
                        </label>
                        </div>
                      <div className="col-11" style={{ padding: "5px" }}>
                        <input
                          type="text"
                          className=" form-control"
                          value={e[0]}
                          onChange={(event) => {
                            let newArray = [...this.state.listArray];
                            newArray[i][0] = event.target.value;
                            this.setState({ listArray: newArray });
                          }}
                        ></input>
                      </div>
                      <div className="col-1" style={{ paddingTop: "5px" }}>
                        <Button
                          color="danger"
                          className="form-control"
                          style={{ float: "right", paddingRight: "0px" }}
                          onClick={() => {
                            let newArray = [...this.state.listArray];
                            newArray.splice(i, 1);
                            this.setState({ listArray: newArray });
                          }}
                        >
                          x
                        </Button>
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
                            value={e[3]}
                            onChange={(event) => {
                              let newArray = [...this.state.listArray];
                              newArray[i][3] = event.target.value;
                              this.setState({ listArray: newArray });
                            }}
                          />
                        </div>
                      <div className="col-6" style={{ padding: "5px" }}>
                        
                        <input
                          type="time"
                          format="HH:mm"
                          name="ProgramSchedule"
                          className="form-control"
                          onChange={(event) => {
                            let newArray = [...this.state.listArray];
                            newArray[i][1] = event.target.value;
                            this.setState({ listArray: newArray });
                          }}
                          value={e[1]}
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
                            value={e[4]}
                            onChange={(event) => {
                              let newArray = [...this.state.listArray];
                              newArray[i][4] = event.target.value;
                              this.setState({ listArray: newArray });
                            }}
                          />
                        </div>
                      <div className="col-6" style={{ padding: "5px" }}>
                        
                        <input
                          type="time"
                          format="HH:mm"
                          name="ProgramSchedule"
                          className="form-control"
                          onChange={(event) => {
                            let newArray = [...this.state.listArray];
                            newArray[i][2] = event.target.value;
                            this.setState({ listArray: newArray });
                          }}
                          value={e[2]}
                        />
                      </div>
                      
                    </div>
                  );
                })}
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => {
                    this.handleSubmitEdit();
                  }}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalaudio} toggle={this.toggleAudio}>
          <ModalHeader toggle={this.toggleAudio}>
            Edit the Audio Playlist
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <div
                  style={{
                    paddingBottom: "10px",
                    borderBottom: "2px solid gray",
                  }}
                >
                  <b style={{ paddingTop: "20px" }}>Choose Audio </b>

                  <div className="row">
                    <div className="col-6 selectButton">
                      <DropboxChooser
                        appKey={this.props.dropboxkey}
                        success={async (files) => {
                          console.log("chose:", files);
                          // this.setState({
                          //   modalPicture: false,
                          // });
                          await files.map((i) => {
                            // this.handleSubmitPicture(i.link, i.name);
                            let array = [...this.state.audioArray];
                            array.push({ link: i.link, name: i.name });
                            this.setState({
                              audioArray: array,
                            });
                          });
                        }}
                        cancel={() => console.log("closed")}
                        multiselect={true}
                      >
                        <Button className="form-control" color="primary">
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
                        clientId={this.props.driveClientid}
                        developerKey={this.props.drivekey}
                        scope={[
                          "https://www.googleapis.com/auth/drive.readonly",
                        ]}
                        onChange={async (data) => {
                          if (data.docs) {
                            console.log("on change:", data.docs);
                            data.docs.map((i) => {
                              this.setState({
                                addwidgettype: "audioplayer",
                              });
                              // this.handleSubmitPicture(i.url, i.name);
                              let array = [...this.state.audioArray];
                              array.push({ link: i.url, name: i.name });
                              this.setState({
                                audioArray: array,
                              });
                            });
                            if (data.docs.length > 0) {
                              // this.props.toggleeditLayout();
                            }
                          }
                        }}
                        onAuthFailed={(data) =>
                          console.log("on auth failed:", data)
                        }
                        multiselect={false}
                        navHidden={true}
                        authImmediate={false}
                        // mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
                        // query={'a query string like .txt or fileName'}
                        viewId={"DOCS"}
                      >
                        <Button
                          className="form-control"
                          color="primary"
                          onClick={() => {
                            // this.props.toggleeditLayout();
                            // this.setState({
                            //   modalaudio : false,
                            // });
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
                          onClick={() => {
                            // this.props.toggleeditLayout();
                            // this.setState({
                            //   modalaudio : false,
                            // });
                            this.handleOpenPicker();
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
                    {/*<div className="col-6 selectButton">
                      <ReactOneDriveFilePicker
                        clientID={secretutils.onedriveclientid}
                        action="share"
                        multiSelect={true}
                        onSuccess={(result) => {
                          alert(JSON.stringify(result));
                        }}
                        onCancel={(result) => {
                          alert(JSON.stringify(result));
                        }}
                      >
                        <Button color="primary" className="form-control">
                          <div className="row">
                            <div className="col-3">
                              <FontAwesomeIcon
                                className="icon"
                                icon={faImages}
                              />
                            </div>
                            <div className="col-9">Select from OneDrive</div>
                          </div>
                        </Button>
                      </ReactOneDriveFilePicker>
                      </div>*/}
                  </div>
                </div>
                {this.state.audioArray.map((elem, index) => {
                  return (
                    <div className="row" style={{ marginBottom: "10px" }}>
                      <div className="col-10" style={{ marginTop: "5px" }}>
                        {elem.name}
                      </div>
                      <div className="col-2">
                        <Button
                          color="Secondary"
                          className="col-1"
                          onClick={() => {
                            let array = [...this.state.audioArray];
                            array.splice(index, 1);
                            this.setState({
                              audioArray: array,
                            });
                          }}
                        >
                          x
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <Button
                  color="primary"
                  type="submit"
                  className="form-control"
                  onClick={() => {
                    this.handleSubmitEdit();
                  }}
                >
                  Update
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          size="lg"
          isOpen={this.state.modalSlideshare}
          toggle={this.toggleSlideshare}
        >
          <ModalHeader toggle={this.toggleSlideshare}>
            Edit the Slideshare Widget
          </ModalHeader>
          <ModalBody>
            <div>
              <Slideshow
                selectedLayoutID={this.props.selectedLayoutID}
                setselectedLayoutID={this.props.setselectedLayoutID}
                widgetId={this.state.widgetId}
                toggleSlideshare={this.toggleSlideshare}
                editWidgeContent = {this.props.editWidgeContent}
                seteditWidgeContent = {this.props.seteditWidgeContent}
                widgetList = {this.props.widgetList}
                setwidgetList = {this.props.setwidgetList}
                setdeleteWidgetId = {this.props.setdeleteWidgetId}
                deleteWidgetId = {this.props.deleteWidgetId}
                driveClientid = {this.props.driveClientid}
                drivekey = {this.props.drivekey}
                dropboxkey = {this.props.dropboxkey}
                weatherApiKey = {this.props.weatherApiKey}
              />
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalCongrats} toggle={this.toggleCongrats}>
          <ModalHeader toggle={this.toggleCongrats}>
            Edit the Congratulation WIdget
          </ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit} className="slidesharemainform">
                <b>Edit the Congratulations Message</b>
                <textarea
                  type="test"
                  className="form-control websiteLink"
                  value={
                    this.state.Congratulation == "Transparent Text"
                      ? ""
                      : this.state.Congratulation
                  }
                  onChange={(e) =>
                    this.setState({ Congratulation: e.target.value })
                  }
                ></textarea>
                <div className="slideshareborder"></div>
                <div className="availableSlideshares"> Change GIFs</div>
                <div className="row">
                  <div
                    className="col-4"
                    onClick={(e) => this.setState({ congratgif: "1" })}
                  >
                    {this.state.congratgif == "1" ? (
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
                    onClick={(e) => this.setState({ congratgif: "2" })}
                  >
                    {this.state.congratgif == "2" ? (
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
                    onClick={(e) => this.setState({ congratgif: "3" })}
                  >
                    {this.state.congratgif == "3" ? (
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
                  onClick={() => {
                    this.handleSubmitEdit();
                  }}
                >
                  Upload
                </Button>{" "}
              </form>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalPicture} toggle={this.togglePicture}>
          <ModalHeader toggle={this.togglePicture}>Change Picture</ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={this.onSubmit}>
                {/*<FileUpload
                accept=".jpg,.png,.jpeg"
                label=""
                updateFilesCb={updateUploadedFiles}
              />*/}
                <div className="row">
                  <div className="col-6 selectButton">
                    <DropboxChooser
                      appKey={this.props.dropboxkey}
                      success={async (files) => {
                        console.log("chose:", files);
                        this.setState({
                          modalPicture: false,
                        });
                        await files.map((i) => {
                          this.handleSubmitPicture(i.link, i.name);
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
                      clientId={this.props.driveClientid}
                      developerKey={this.props.drivekey}
                      scope={["https://www.googleapis.com/auth/drive.readonly"]}
                      onChange={async (data) => {
                        if (data.docs) {
                          console.log("on change:", data.docs);
                          data.docs.map((i) => {
                            this.setState({
                              addwidgettype: "picture",
                            });
                            this.handleSubmitPicture(i.url, i.name);
                          });
                          if (data.docs.length > 0) {
                            // this.props.toggleeditLayout();
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
                          // this.props.toggleeditLayout();
                          this.setState({
                            modalPicture: false,
                          });
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
                          // this.props.toggleeditLayout();
                          this.setState({
                            modalPicture: false,
                          });
                          this.handleOpenPicker2();
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
                    <ReactOneDriveFilePicker
                      clientID={secretutils.onedriveclientid}
                      action="share"
                      multiSelect={true}
                      onSuccess={(result) => {
                        alert(JSON.stringify(result));
                      }}
                      onCancel={(result) => {
                        alert(JSON.stringify(result));
                      }}
                    >
                      <Button color="primary" className="form-control">
                        <div className="row">
                          <div className="col-3">
                            <FontAwesomeIcon className="icon" icon={faImages} />
                          </div>
                          <div className="col-9">Select from OneDrive</div>
                        </div>
                      </Button>
                    </ReactOneDriveFilePicker>
                    </div>*/}
                </div>
                {/*<Button color="primary" type="submit" onClick={handleSubmit}>
                Upload
              </Button>{" "}
              <Button color="secondary" onClick={CancelPictureClickHandler}>
                Cancel
            </Button>*/}
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
