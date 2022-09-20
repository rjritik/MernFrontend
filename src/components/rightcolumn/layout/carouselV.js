// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import React from 'react';
// import ReactPlayer from 'react-player';
// import { Carousel } from 'react-responsive-carousel';
// import { PropTypes } from 'prop-types';
// import { Grid, makeStyles } from '@material-ui/core';

// const DUMMY_VIDEOS = [
//   {
//    _id: '5fd025a181e2c80897c14ae1',
//    videoUrl: 'https://www.youtube.com/embed/AVn-Yjr7kDc'
//   }
// ];

// const useStyles = makeStyles(theme => ({
//   carousel: {
// //   margin: theme.spacing(2)
//  }
// }));

// const YoutubeSlide = ({ url, isSelected }) => (
//   <ReactPlayer width="100%" url={url} playing={isSelected} />
// );

// const CarouselVideo = (props) => {
//   const classes = useStyles();

//   const customRenderItem = (item, props) => (
//     <item.type {...item.props} {...props} />
//   );
//   const getpictureurl = (url) => {
//     let finalUrl = "";
//     let urlreturn = "";
//     if (url.includes("drive.google")) {
//       finalUrl = url.substring(
//         url.indexOf("/file/d/") + 8,
//         url.indexOf("/view")
//       );
//       urlreturn = "https://drive.google.com/uc?export=view&id=" + finalUrl;
//     } else if (url.includes("dropbox.com")) {
//       urlreturn = url.replace("dl=0", "raw=1");
//     }
//     return urlreturn;
//   }

// //   const getVideoThumb = videoId =>`https://img.youtube.com/vi/${videoId}/default.jpg`;

// //   const getVideoId = url =>url.substr('https://www.youtube.com/watch?v='.length, url.length);

//   return (
//     <Grid item 
//     // md={6} xs={12}
//     >
//       <Carousel
//        autoPlay={true}
//        className={classes.carousel}
//        emulateTouch={true}
//        showArrows={true}
//        showThumbs={true}
//        showStatus={false}
//        infiniteLoop={true}
//        renderItem={customRenderItem}
//      >
//       {props.dataPassed.map((elem, index) => {
//           debugger
//         {elem[1] == "image" ? (
//             <div>
//               <div>
//                 <img
//                   width="50%"
//                   height="auto"
//                   src={()=>getpictureurl(elem[0])}
//                 />
//               </div>
//               <p className="legend">
//                 <b>{elem[3]}</b> {":  "} {elem[4]}
//               </p>
//             </div>
//           ) : (
//             <div data-interval={1000}>
//             <YoutubeSlide
//             url={elem[0]}
//             muted
//             playing={false}
//             // key={elem._id ? elem._id : elem.id}
//             key={index}
//           />
//               <p className="legend">
//                 <b>{elem[2]}</b> {":  "} {elem[3]}
//               </p>
//             </div>
//           )}
        
//       })}
//      </Carousel>
//    </Grid>
//   );
//  };

//  YoutubeSlide.propTypes = {
//    url: PropTypes.string,
//    isSelected: PropTypes.bool
//  };

//  CarouselVideo.propTypes = {
//    data: PropTypes.array
//  };

//  CarouselVideo.defaultProps = {
//   data: DUMMY_VIDEOS
//  };

// export default CarouselVideo;



// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import React from 'react';
// import ReactPlayer from 'react-player';
// import { Carousel } from 'react-responsive-carousel';
// import { PropTypes } from 'prop-types';
// import { Grid, makeStyles } from '@material-ui/core';

// const DUMMY_VIDEOS = [
//   {
//    _id: '5fd025a181e2c80897c14ae1',
//    videoUrl: 'https://www.youtube.com/embed/AVn-Yjr7kDc'
//   },
//   {
//    _id: '5fd025a181e2c80897c14ae1',
//    videoUrl: 'https://www.youtube.com/embed/AVn-Yjr7kDc'
//   }
// ];

// const useStyles = makeStyles(theme => ({
//   carousel: {
//   margin: theme.spacing(2)
//  }
// }));

// const YoutubeSlide = ({ url, isSelected }) => (
//   <ReactPlayer width="100%" height="276px" url={url} playing={isSelected} />
// );

// const CarouselVideo = ({ data }) => {
//   const classes = useStyles();

//   const customRenderItem = (item, props) => (
//     <item.type {...item.props} {...props} />
//   );

//   const getVideoThumb = videoId =>`https://img.youtube.com/vi/${videoId}/default.jpg`;

//   const getVideoId = url =>url.substr('https://www.youtube.com/watch?v='.length, url.length);

//   const customRenderThumb = children =>
//     children.map(item => {
//       const videoId = getVideoId(item.props.url);
  
//       return <img key={videoId} src={getVideoThumb(videoId)} />;
//   });

//   return (
//     <Grid item md={6} xs={12}>
//       <Carousel
//        autoPlay={false}
//        className={classes.carousel}
//        emulateTouch={true}
//        showArrows={true}
//        showThumbs={true}
//        showStatus={false}
//        infiniteLoop={true}
//        renderItem={customRenderItem}
//        renderThumbs={customRenderThumb}
//      >
//       {data.map(v => (
//         <YoutubeSlide
//           url={v.videoUrl}
//           muted
//           playing={false}
//           key={v._id ? v._id : v.id}
//         />
//       ))}
//      </Carousel>
//    </Grid>
//   );
//  };

//  YoutubeSlide.propTypes = {
//    url: PropTypes.string,
//    isSelected: PropTypes.bool
//  };

//  CarouselVideo.propTypes = {
//    data: PropTypes.array
//  };

//  CarouselVideo.defaultProps = {
//   data: DUMMY_VIDEOS
//  };

// export default CarouselVideo;



import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import React from 'react';
import ReactPlayer from 'react-player';
import "./carouselV.css";
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-bootstrap/Carousel';
import { PropTypes } from 'prop-types';

const CarouselVideo = (props) => {
    const getpictureurl = (url)=> {
        
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

    const getId = (url)=> {
        const regExp =
          /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
        const match = url.match(regExp);
    
        return match[1];
      }
  return(
    <Carousel 
    controls={false} 
    indicators = {false}>
    {
        props.dataPassed.map((elem, index)=>{
            return(
                <Carousel.Item  
                 interval ={elem[elem.length -1]*1000}
                >
            {elem[1] == "image" ? (
                <div className="pictureCarousel">
                <img
                width="auto"
                height="auto"
                className="pictureC"
                src={getpictureurl(elem[0])}
              />
                    <Carousel.Caption style={{fontFamily: `${
                      props.dataOther.fontFamily ? props.dataOther.fontFamily : "Times New Roman, Times, serif"} !important`}}>
                        <h4 style={{color: `${props.dataOther.fcolor ? props.dataOther.fcolor : "#000"}`, fontWeight: "bold"}}><div style={{fontFamily: `${
                            props.dataOther.fontFamily ? props.dataOther.fontFamily : "Times New Roman, Times, serif"}`}}>{elem[3]}</div></h4>
                        {/*<p>{elem[4]}</p>*/}
                    </Carousel.Caption>
                    </div>
              ) : (
                  <div style={{ height: '100%'}}>
                  <iframe
                  width="100%"
                  height="auto"
                  src={
                    "https://www.youtube.com/embed/" +
                    getId(elem[0]) +
                    "?mute=1&autoplay=1&loop=1&playlist=" +
                    getId(elem[0])
                  }
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  muted
                  // style={{zIndex: "-10000"}}
                ></iframe>
                    <Carousel.Caption className = "carouselCaption">
                      {props.dataOther.fontSizeType == undefined || props.dataOther.fontSizeType == "" || props.dataOther.fontSizeType == "auto" ?<h4 style={{color: `${props.dataOther.fcolor ? props.dataOther.fcolor : "#000"}`}}>
                      <div style={{fontFamily: `${
                        props.dataOther.fontFamily ? props.dataOther.fontFamily : "Times New Roman, Times, serif"}`}}>{elem[2]}</div></h4>
                    : <h4 style={{color: `${props.dataOther.fcolor ? props.dataOther.fcolor : "#000"}`}}>
                          <div style={{fontSize: `${props.dataOther.fontsize ? props.dataOther.fontsize : "small"}`,fontFamily: `${
                            props.dataOther.fontFamily ? props.dataOther.fontFamily : "Times New Roman, Times, serif"}`}}>{elem[2]}</div></h4>
                        
                    }
                        
                    </Carousel.Caption>
                    </div>
                
              )}
              </Carousel.Item>
            )
        })
    }
    
    
  </Carousel>
  )
 };

export default CarouselVideo;
