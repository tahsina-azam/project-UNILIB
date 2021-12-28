import React, { Component } from "react";
import axios from "axios";
import HistoryCard from "./HistoryCard";
import "../../styles/Fonts.css";
import "../../styles/ManageUser.css";
import selectType from "../popups";

class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowed_books: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/user/" + this.props.emailHistory)
      .then((res) => {
        this.setState({
          borrowed_books: res.data.data.books,
        });
        console.log(res.data.data.books);
        selectType("success", "issued book Information");
      })
      .catch((err) => {
        console.log("Error from UserHistory" + err);
      });
  }

  render() {
    const books = this.state.borrowed_books;
    let issuedBookList;

    if (!books) {
      issuedBookList = "there is no record!";
    } else {
      issuedBookList = books.map((book, k) => (
        <HistoryCard book={book} key={k} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="list">{issuedBookList}</div>
      </div>
    );
  }
}

export default UserHistory;
