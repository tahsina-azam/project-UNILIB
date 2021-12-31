import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../src/styles/App.css";

class UpdateBookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      writer: "",
      number: "",
      image: "",
      link: "",
      text: "",
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    const path = window.location.pathname;
    const bookRef = path.split("/");

    axios
      .get("http://localhost:4000/api/books/" + bookRef[2])
      .then((res) => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          bookName: res.data.bookName,
          writer: res.data.writer,
          number: res.data.number,
          image: res.data.image,
          link: res.data.pdfLink,
          text: res.data.text,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateBookInfo");
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    const bookRef = path.split("/");

    const data = {
      bookName: this.state.bookName,
      writer: this.state.writer,
      number: this.state.number,
      image: this.state.image,
      link: this.state.link,
      text: this.state.text,
    };

    axios
      .put("http://localhost:4000/api/books/" + bookRef[2], data)
      .then((res) => {
        //this.props.history.push("/show-book/" + bookRef[2]);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">Update Book's Info</p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="bookName"
                  className="form-control"
                  value={this.state.bookName}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="isbn">Author</label>
                <input
                  type="text"
                  placeholder="author"
                  name="writer"
                  className="form-control"
                  value={this.state.writer}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Number of Books Available</label>
                <input
                  type="text"
                  placeholder="number"
                  name="number"
                  className="form-control"
                  value={this.state.number}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="text"
                  className="form-control"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="published_date">Pdf Link</label>
                <input
                  type="text"
                  placeholder="pdf link"
                  name="pdfLink"
                  className="form-control"
                  value={this.state.pdfLink}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update Book
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBookInfo;
