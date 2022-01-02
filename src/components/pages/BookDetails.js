import React, { Component } from "react";
import axios from "axios";
import "../../styles/Library.css";

class BookDetails extends Component {
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
        this.props.history.push("/");
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
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-success">
                Book's Informations
              </h1>
              <hr /> <br />
            </div>
          </div>
          <div>{BookItem}</div>
        </div>
      </div>
    );
  }
}

export default BookDetails;
