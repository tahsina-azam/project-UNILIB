import React, { useRef } from "react";
/**
 * a search box from which users can be searched by their info
 * @param {array} props takes all the users info as array
 * @returns a search bar and a result array based on user search
 */
const AdminUserSearch = (props) => {
  const inputBar = useRef("");
  const user = props.users;
  //console.log(props.books);
  /**
   * it searches for the word fragments that the user types in the searchbar
   * @param {string} searchTerm whatever input is in search bar
   */
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
    <div class="input-group mb-3 mt-5">
      {" "}
      <input
        ref={inputBar}
        type="text"
        class="form-control input-text"
        placeholder="Search users here"
        /*onChange={(event) => {
           
          }}*/
        onChange={getSearchTerm}
      />
    </div>
  );
};

export default AdminUserSearch;
