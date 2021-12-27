import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HistoryCard from "./HistoryCard";
import "../../styles/Fonts.css";
import "../../styles/ManageUser.css";
import AdminUserSearch from "../AdminUserSearch";

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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <card className="card mx-auto" style={{ width: "18rem" }}>
                <h2 className="fnt-sheeva text-center">Issued books</h2>
              </card>
            </div>

            <div className="col-md-11">
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{issuedBookList}</div>
        </div>
      </div>
    );
  }
}

export default UserHistory;
