import React, { useRef } from "react";

/**
 * a search box from which books can be searched by their info in admin library
 * @param {array} props takes all the books info as array
 * @returns a search bar and a result array based on user search
 */
const AdminLibrarySearch = (props) => {
  const inputBar = useRef("");
  const book = props.books;
  //console.log(props.books);
  /**
   * it searches for the word fragments that the user types in the searchbar
   * @param {string} searchTerm whatever input is in search bar
   */
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

export default AdminLibrarySearch;
