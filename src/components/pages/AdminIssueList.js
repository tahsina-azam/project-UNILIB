import React, { Component } from "react";
import axios from "axios";
import AdminIssueCard from "./AdminIssueCard";
import "../../styles/Library.css";
import "./LibrarySearchBar";
import AdminIssueSearchBar from "../AdminIssueSearchBar";
import selectType from "../popups";
/**
 * it is a class for showing all the information of issued books to admin
 * @class
 * @constructor
 * @public
 */
class AdminIssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * stores all the data of issued books
       * @property {array}
       *
       */
      issuedbooks: [],
      /**
       * stores the result from the searches that user makes
       * @property {array}
       */
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
   * lifecycle method for requesting the issued book list from the backend
   * @method
   */
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
