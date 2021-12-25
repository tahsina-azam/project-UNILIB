import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentBookCard from "./StudentBookCard";
import "../../styles/Library.css";
import "./LibrarySearchBar";
import LibrarySearchBar from "./LibrarySearchBar";

class StudentBookList extends Component {
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
            <div className="col-md-12">
              <br />
              <card className="card mx-auto" style={{ width: "18rem" }}>
                <h2 className="fnt-sheeva text-center">Books</h2>
              </card>
            </div>

            <div className="col-md-11">
              {/* <Link
                to="/create-book"
                className="btn btn-outline-warning float-right"
              >
                + Add New Book
           </Link>*/}
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{bookList}</div>
        </div>
      </div>
    );
  }
}

export default StudentBookList;
