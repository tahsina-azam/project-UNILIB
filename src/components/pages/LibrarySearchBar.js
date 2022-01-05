import React, { useRef } from "react";
/**
 * a search box from which books can be searched by their name,writer and even subject
 * @param {array} props takes all the books info as array
 * @returns a search bar and a result array based on user search
 */
const LibrarySearchBar = (props) => {
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
    <div className="input-group mb-3 ">
      <input
        ref={inputBar}
        type="text"
        className="form-control input-text"
        placeholder="Type here to search books"
        onChange={getSearchTerm}
      />
    </div>
    // <div>
    //   <div class="input-group mb-3">
    //     {" "}
    //     <input
    //
    //       type="text"
    //       class="form-control input-text"
    //       placeholder="Search books...."
    //       /*onChange={(event) => {

    //       }}*/
    //
    //     />
    //     <div class="input-group-append">
    //       {" "}
    //       <button
    //         color="black"
    //         class="btn btn-outline-warning btn-lg"
    //         type="button"
    //       >
    //         <i style={{ color: "black" }} class="fa fa-search"></i>
    //       </button>{" "}
    //     </div>
    //   </div>
    // </div>
  );
};

export default LibrarySearchBar;
