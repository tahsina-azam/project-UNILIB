import React, { Component } from "react";
import axios from "axios";
import StudentBookCard from "./StudentBookCard";
import "../../styles/Library.css";
import "./LibrarySearchBar";
import LibrarySearchBar from "./LibrarySearchBar";
import selectType from "../popups";
import BoxLoading from "react-loadingg/lib/BoxLoading";

/**
 * it is a class for showing all the books in student library
 * @class
 * @constructor
 * @public
 */
class StudentBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchResult: [],
    };
  }

  /**
   *updates the state variable searchResult if it is passed as props to other components
   * @param {array} obj result from the searches made by the user
   */
  updateState = (obj) => {
    this.setState({ searchResult: obj }, () =>
      console.log(this.state.searchResult)
    );
  };

  /**
   * lifecycle method in which request is made to the backend for data
   * @method
   */
  componentDidMount() {
    // selectType("success", "requested items");
    axios
      .get("http://localhost:4000/allbooks")
      .then((res) => {
        this.setState({
          books: res.data,
          searchResult: res.data,
        });

        //
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }

  render() {
    const books = this.state.books;
    const searchResult = this.state.searchResult;
    let bookList;

    if (!books) {
      bookList = "there is no book record!";
    } else if (!searchResult) {
      bookList = books.map((book, k) => (
        <StudentBookCard book={book} key={k} />
      ));
    } else {
      bookList = searchResult.map((book, k) => (
        <StudentBookCard book={book} key={k} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <LibrarySearchBar
              books={this.state.books}
              updateParent={this.updateState}
            />
            <div className="list">{bookList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentBookList;
