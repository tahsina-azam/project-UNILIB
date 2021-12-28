import React, { Component } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "../../styles/Fonts.css";
import "../../styles/Library.css";
import AdminLibrarySearch from "../AdminLibrarySearch";
import selectType from "../popups";

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchResult: [],
    };
  }

  updateState = (obj) => {
    this.setState({ searchResult: obj }, () =>
      console.log(this.state.searchResult)
    );
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/allbooks")
      .then((res) => {
        this.setState({
          books: res.data,
          searchResult: res.data,
        });
        selectType("success", "requested items");
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
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
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
