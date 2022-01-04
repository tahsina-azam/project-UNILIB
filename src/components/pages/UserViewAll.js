import React from "react";
import ShowUserList from "./ShowUserList";
/**
 * viewing all the users at once
 * @returns {component} ShowUserList
 */
const UserViewAll = () => {
  return (
    <div className="p-5">
      <ShowUserList />
    </div>
  );
};

export default UserViewAll;
