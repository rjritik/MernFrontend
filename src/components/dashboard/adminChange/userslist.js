import React, { useEffect, useState } from "react";
import "./users.css";
import httpService from "../../../services/http.service";
import Loader from "../../common/loader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UsersForm from "./usersform";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { bitStreamtoNumber, CHECK_KEYLOK } from "../../../config";

let UsersList = (props) => {
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(<div></div>);
  const [loading, setLoading] = useState(false);
  const [hide, sethide] = useState(false)
  const getUsersCount = async () => {
    let stream = await httpService.get("getlicenses").catch(e => {
      sethide(true);
    })
    let licenseCount = bitStreamtoNumber(stream.data, "user")
    let userlength = await httpService.get("getuserlength").catch(e => {
      console.log(e)
    })
    if(licenseCount > userlength.data.users) sethide(false)
    else sethide(true)
  }
  let gridOptions = {};
  let onGridReady = {};
  function hideLoader() {
    setLoading(false);
  }
  function showLoader() {
    setLoading(true);
  }
  useEffect(() => {
    if(CHECK_KEYLOK){
      getUsersCount();
    }
  },[])

  const addUserClick = (event) => {
    event.preventDefault();
    props.addUserClick();
  };

  const setField = (data) => {
    setContent("form");
    setForm(<UsersForm data={data} setformContent={setContent} loadAllData= {props.loadAllData}/>);
  };

  let DeleteUser = async (event, rowdata) => {
    event.preventDefault();
    let r = window.confirm("Are you sure you want to delete this user!");
    if (r === false) {
      return;
    }
    let data = {
      id: rowdata._id,
    };
    showLoader();
    let returnData = await httpService
      .getByBoj("DeleteUser", data)
      .then((res) => res.data)
      .catch((err) => console.log(err));


    props.loadAllData();
    if (returnData) {
      if (returnData.ack === "1") {
        toast.success("User Deleted", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Unable to delete user", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    hideLoader();
  };

  const defaultColDef = {
    sortable: false,
    editable: false,
    flex: 1,
    filter: false,
  };

  const columns = [
    {
      headerName: "User Name",
      field: "Username",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = params.data.customerId;
        link.addEventListener("click", () => setField(params.data));
        // link.href = '/admin/distributordetail/' + params.data.orderitemid + "/" + params.data.sellersku
        return link;
      },
    },
    {
      headerName: "User Type",
      field: "type",
      cellRenderer: (params) => {
        let span = document.createElement("div");
        if(params.data.customerId == "Admin" || params.data.type == "admin"){
          span.innerText = "Admin";
        }else{
          span.innerText = "Normal User";
        }
        return span;
      },
    },
    {
      headerName: "Account No.",
      field: "accountNo",
      cellRenderer: (params) => {
        let span = document.createElement("div");
        if(params.data.customerId == "Admin" || params.data.type == "admin"){
          span.innerText = "--";
        }else{
          span.innerText = params.data.accountNo;
        }
        return span;
      },
    },
    {
      headerName: "Phone",
      field: "mobileNo",
      cellRenderer: (params) => {
        let span = document.createElement("div");
        if(params.data.customerId == "Admin" || params.data.type == "admin"){
          span.innerText = "--";
        }else{
          span.innerText = params.data.mobileNo;
        }
        return span;
      },
    },
    {
      headerName: "Delete",
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        let span = document.createElement("div");
        span.className = "spanname deleteUser";
        let img = document.createElement("i");
        img.className = "fa fa-trash delete-icon";
        img.hidden = params.data.customerId == "Admin"
        img.onclick = (event) => DeleteUser(event, params.data);

        span.appendChild(img);
        return span;
      },
      onCellValueChanged: (params) => {
        let span = document.createElement("div");
        span.className = "spanname";
        let img = document.createElement("i");
        img.className = "fa fa-trash delete-icon";
        img.onclick = (event) => DeleteUser(event, params.data);
        span.appendChild(img);
        return span;
      },
      maxWidth: 100,
    },
    // {
    //     headerName: "Status",
    //     field: "Status"
    // }
  ];
  return content === "list" ? (
    <>
      <div>
        {loading ? <Loader /> : null}
        <div className="pad-15">
          <div className="text-right">
            <button
              hidden={hide}
              className={"header-btn"}
              onClick={(event) => {
                if(!hide) addUserClick(event)
                else return
              }}
            >
              Add User
            </button>
            <div className="clear"></div>
          </div>
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Users</div>
            <div className="form-boxtopcont user-form">
              <div
                className="ag-theme-alpine"
                style={{ height: "calc(100vh - 240px)" }}
              >
                <AgGridReact
                  pagination={true}
                  paginationPageSize={20}
                  columnDefs={columns}
                  defaultColDef={defaultColDef}
                  enableBrowserTooltips={true}
                  tooltipShowDelay={{ tooltipShowDelay: 0 }}
                  rowData={props.usersList}
                  gridOptions={gridOptions}
                  gridReady={onGridReady}
                  // onCellValueChanged={function(params){
                  //   return params.api.refreshCells({
                  //     force:true
                  //   })
                  // }}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    form
  );
};

export default UsersList;
