import { useState, useEffect } from 'react'
import './leftcolumn.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge,faDesktop,faImages } from '@fortawesome/free-solid-svg-icons'


let LeftColumn = (props) => {
    const [usersFormState, setUsersFormState] = useState("list")

    useEffect(() => {
    }, [props.rightContentType])

    // const changeContentUsers = () => {

    //     if (usersFormState === "list") {
    //         setUsersFormState('form');
    //     } else if (usersFormState === "form") {
    //         setUsersFormState("list");
    //     }
    // }

    // const handleUserClick = () => {
    //     setUsersFormState('list')
    // }

    // const addUserClick = () => {
    //     setUsersFormState('form')
    // }

    return (
        <div className="mainleft">
        <div className = "layout-outer">
        {
        //     props.rightContentType ==="layout" ? <div className = "layout-inner active">
        // <FontAwesomeIcon className ="icon" icon={faThLarge} /> {" "}
        // <div className="Text">
        // LAYOUT
        // </div>
        // </div>: 
        // <div className = "layout-inner"  onClick = {()=>{props.setrightContentType("layout")}}>
        // <FontAwesomeIcon className ="icon" icon={faThLarge} /> {" "}
        // <div className="Text" >
        // LAYOUT
        // </div></div>
    }
        
        {props.rightContentType ==="preview" ? <div className = "layout-inner active">
        <FontAwesomeIcon className ="icon" icon={faDesktop} /> {" "}
        <div className="Text">
        LAYOUTS
        </div>
        </div> : <div className = "layout-inner" onClick = {()=>{props.setrightContentType("preview")}}>
        <FontAwesomeIcon className ="icon" icon={faDesktop} /> {" "}
        <div className="Text"  >
        LAYOUTS
        </div></div>}
        {
        //     props.rightContentType ==="slideshow" ? 
        // <div className = "layout-inner active">
        // <FontAwesomeIcon className ="icon" icon={faImages} /> {" "}
        // <div className="Text">
        // SLIDESHOWS
        // </div>
        // </div>  : <div className = "layout-inner" onClick = {()=>{props.setrightContentType("slideshow")}}>
        // <FontAwesomeIcon className ="icon" icon={faImages} /> {" "}
        // <div className="Text" >
        // SLIDESHOWS
        // </div>
        // </div> 
    }
        </div>
            </div>
    );
}

export default LeftColumn;