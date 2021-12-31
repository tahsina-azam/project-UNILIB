import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowUserList from "./ShowUserList";

class showBookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    //console.log("Print id: " + this.props.match.params.id);
    const path = window.location.pathname;
    const id = path.split("/");
    //console.log(words[0]);
    axios
      .get("http://localhost:4000/api/books/" + id[2])
      .then((res) => {
        // console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
          book: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowBookDetails");
      });
  }

  onDeleteClick(id) {
    axios
      .delete("http://localhost:4000/api/books/" + id)
      .then((res) => {
        this.props.history.push("/unilib/admin/library");
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  }

  render() {
    const book = this.state.book;
    let BookItem = (
      <div>
        <table className="table table-hover border-success">
          <tbody>
            <tr>
              <td>Title</td>
              <td>{book.bookName}</td>
            </tr>
            <tr>
              <td>Author</td>
              <td>{book.writer}</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>{book.number}</td>
            </tr>
            <tr>
              <td>Pdf Link</td>
              <td
                className="text-success"
                onClick={() => {
                  window.open(book.pdfLink);
                }}
              >
                {" "}
                Click here to read the book
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{book.text}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-10 m-auto">
              <br /> <br />
              <Link
                to="/unilib/admin/library"
                className="btn btn-outline-warning float-left"
              >
                Show Book List
              </Link>
            </div> */}
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-success">
                Book's Informations
              </h1>
              <hr /> <br />
            </div>
          </div>
          <div className="row">{BookItem}</div>

          <div className="row m-5 text-center">
            <div className="col-md-6">
              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-warning btn-block"
              >
                Edit Book
              </Link>
            </div>
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={this.onDeleteClick.bind(this, book._id)}
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center text-success mt-3">
            Issue This Book To Users
          </h1>
          <hr /> <br />
        </div>
        <ShowUserList />
      </div>
    );
  }
}

export default showBookDetails;
