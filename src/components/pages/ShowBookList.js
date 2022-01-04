import React, { Component } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "../../styles/Fonts.css";
import "../../styles/Library.css";
import AdminLibrarySearch from "../AdminLibrarySearch";
import selectType from "../popups";

/**
 * it is a class for showing the list of books
 * @class
 * @constructor
 * @public
 */
class ShowBookList extends Component {
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
    axios
      .get("http://localhost:4000/allbooks")
      .then((res) => {
        this.setState({
          books: res.data,
          searchResult: res.data,
        });
        // selectType("success", "requested items");
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }

  render() {
    const books = this.state.books;
    const searchResult = this.state.searchResult;
    console.log("PrintBook: " + books);
    let bookList;

    if (!books) {
      bookList = "there is no book record!";
    } else if (!searchResult) {
      bookList = books.map((book, k) => <BookCard book={book} key={k} />);
    } else {
      bookList = searchResult.map((book, k) => (
        <BookCard book={book} key={k} />
      ));
    }

    return (
      <div className="ShowBookList mt-5">
        <div className="container mt-5">
          <div className="row mt-5">
            <AdminLibrarySearch
              books={this.state.books}
              updateParent={this.updateState}
            />
          </div>

          <div className="list">{bookList}</div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;
