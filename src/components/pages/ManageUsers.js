import React from "react";
import ShowUserList from "./ShowUserList";

/**
 * Contains elements of showing all the users list to admin
 * @returns {component} ShowUserList
 */
const ManageUsers = () => {
  return (
    <div className="mt-5">
      <ShowUserList className="mt-5" />
    </div>
  );
};

export default ManageUsers;
