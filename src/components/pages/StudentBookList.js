import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentBookCard from "./StudentBookCard";
import "../../styles/Library.css";

class StudentBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/allbooks")
      .then((res) => {
        this.setState({
          books: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }

  render() {
    const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if (!books) {
      bookList = "there is no book record!";
    } else {
      bookList = books.map((book, k) => (
        <StudentBookCard book={book} key={k} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div class="input-group mb-3">
              {" "}
              <input
                type="text"
                class="form-control input-text"
                placeholder="Search books...."
                onChange={(event) => {}}
              />
              <div class="input-group-append">
                {" "}
                <button
                  color="black"
                  class="btn btn-outline-warning btn-lg"
                  type="button"
                >
                  <i style={{ color: "black" }} class="fa fa-search"></i>
                </button>{" "}
              </div>
            </div>
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
