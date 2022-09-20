import { useState, useEffect } from "react";
import "./users.css";
import UsersList from "./userslist";
import UsersForm from "./usersform";

let Users = (props) => {
  const [usersFormState, setUsersFormState] = useState("list");

  const changeContentUsers = () => {
    if (usersFormState === "list") {
      setUsersFormState("form");
    } else if (usersFormState === "form") {
      setUsersFormState("list");
    }
  };

  const handleUserClick = () => {
    setUsersFormState("list");
  };

  const addUserClick = () => {
    setUsersFormState("form");
  };

  return (
    <>
      <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        {usersFormState === "list" ? (
          <UsersList
            changeContent={changeContentUsers}
            addUserClick={addUserClick}
            usersList={props.allData.users}
            loadAllData = {() => props.loadAllData()}
          />
        ) : (
          <UsersForm changeContent={changeContentUsers}
          loadAllData = {() => props.loadAllData()}
           />
        )}
      </div>
    </>
  );
};

export default Users;
