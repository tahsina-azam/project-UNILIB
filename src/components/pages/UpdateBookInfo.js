import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../src/styles/App.css";
/**
 * its a class for updating book info
 * @class
 * @constructor
 * @public
 */
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
  /**
   * lifecycle method in which request is made to the backend for data
   * @method
   */

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
  /**
   * @description gets called when file is changes
   * @param {event} e keeps tract of any changes in the file
   */
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /**
   * handles form submission
   * @param {event} e  event function
   */
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
        window.history.back();
        //this.props.history.push("/show-book/" + bookRef[2]);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="UpdateBookInfo mt-5">
        <div className="container mt-5">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group pt-5">
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

            <div className="form-group mb-3">
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

            <div className="form-group mb-3">
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

            <div className="form-group mb-3">
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

            <div className="form-group mb-3">
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

            <button type="submit" className="btn btn-success btn-block">
              Update Book
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBookInfo;
