import React, { useRef } from "react";

const AdminIssueSearchBar = (props) => {
  const inputBar = useRef("");
  const book = props.books;
  //console.log(props.books);
  const searchKeyword = (searchTerm) => {
    if (searchTerm !== "") {
      const newBookList = book.filter((searchItem) => {
        return Object.values(searchItem)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      props.updateParent(newBookList);
      // console.log(newBookList);
    } else {
      props.updateParent(props.books);
    }
  };
  const getSearchTerm = () => {
    searchKeyword(inputBar.current.value);
  };
  return (
    <div class="input-group mb-3">
      <input
        ref={inputBar}
        type="text"
        class="form-control input-text"
        placeholder="Type here to search"
        /*onChange={(event) => {
           
          }}*/
        onChange={getSearchTerm}
      />
    </div>
  );
};

export default AdminIssueSearchBar;
