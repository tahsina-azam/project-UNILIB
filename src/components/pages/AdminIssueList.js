import React, { Component } from "react";
import axios from "axios";
import AdminIssueCard from "./AdminIssueCard";
import "../../styles/Library.css";
import "./LibrarySearchBar";
import AdminIssueSearchBar from "../AdminIssueSearchBar";
import selectType from "../popups";

class AdminIssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuedbooks: [],
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
      .get("http://localhost:4000/admin/allissuedbooks")
      .then((res) => {
        this.setState({
          issuedbooks: res.data,
          searchResult: res.data,
        });
        // selectType("success", "requested items");
      })
      .catch((err) => {
        selectType("error", "requested items");
        console.log("Error from ShowBookList");
      });
  }

  render() {
    const issuedBooks = this.state.issuedbooks;
    const searchResult = this.state.searchResult;
    let issuedBookList;

    if (!issuedBooks) {
      issuedBookList = "No books have been issued";
    } else if (!searchResult) {
      issuedBookList = issuedBooks.map((issuedBook, k) => (
        <AdminIssueCard issuedBook={issuedBook} key={k} />
      ));
    } else {
      issuedBookList = searchResult.map((issuedBook, k) => (
        <AdminIssueCard issuedBook={issuedBook} key={k} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <AdminIssueSearchBar
              books={this.state.issuedbooks}
              updateParent={this.updateState}
            />
            <div className="list">{issuedBookList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminIssueList;
