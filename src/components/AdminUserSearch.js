import React, { useRef } from "react";

const AdminUserSearch = (props) => {
  const inputBar = useRef("");
  const user = props.users;
  //console.log(props.books);
  const searchKeyword = (searchTerm) => {
    if (searchTerm !== "") {
      const newUserList = user.filter((searchItem) => {
        return Object.values(searchItem)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      props.updateParent(newUserList);
      // console.log(newBookList);
    } else {
      props.updateParent(props.users);
    }
  };
  const getSearchTerm = () => {
    searchKeyword(inputBar.current.value);
  };
  return (
    <div>
      <div class="input-group mb-3">
        {" "}
        <input
          ref={inputBar}
          type="text"
          class="form-control input-text"
          placeholder="Search users...."
          /*onChange={(event) => {
           
          }}*/
          onChange={getSearchTerm}
        />
        <div class="input-group-append">
          {" "}
          <button
            color="black"
            class="btn btn-outline-warning btn-lg"
            type="button"
          >
            <i style={{ color: "black" }} class="fa fa-search"></i>
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default AdminUserSearch;
