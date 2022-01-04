import React, { Component } from "react";
import axios from "axios";
import "../../../src/styles/App.css";
import selectType from "../popups";

/**
 * it is a class for the users to update their account info
 * @class
 * @constructor
 * @public
 */
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      registration: "",
      department: "",
      session: "",
      id: "",
      fileName: "",
    };
  }

  /**
   * @description gets called when file is changes
   * @param {event} e keeps tract of any changes in the file
   */
  onChangeFile = (e) => {
    this.setState({
      fileName: e.target.files[0],
    });
    console.log(e.target.files[0]);
  };

  /**
   * lifecycle method in which request is made to the backend for data
   * @method
   */
  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    const path = window.location.pathname;
    const userRef = path.split("/");

    axios
      .get("http://localhost:4000/api/users/" + userRef[2])
      .then((res) => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          name: res.data.name,
          email: res.data.email,
          registration: res.data.registration,
          department: res.data.department,
          session: res.data.session,
          id: res.data._id,
        });
      })
      .catch((err) => {
        console.log("Error from UpdatUserInfo");
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
   *@description contains action if update button gets clicked
   */
  handleClick = () => {
    if (this.state.fileName) {
      const formData = new FormData();
      formData.append("image", this.state.fileName);
      formData.append("email", this.state.email);
      formData.append("id", this.state.id);
      axios.post("http://localhost:4000/addImage", formData).then(
        (res) => {
          console.log(res.data);
        },
        (error) => {
          alert("wrong username or password");
        }
      );
    }
  };

  /**
   * handles form submission
   * @param {event} e  event function
   */
  onSubmit = (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    const userRef = path.split("/");

    const data = {
      name: this.state.name,
      email: this.state.email,
      registration: this.state.registration,
      department: this.state.department,
      session: this.state.session,
    };

    axios
      .put("http://localhost:4000/api/users/" + userRef[2], data)
      .then((res) => {
        //selectType("success", "info");
        window.history.back();
      })
      .catch((err) => {
        console.log("Error in UpdateUserInfo!");
        console.log(err);
        selectType("invalid", "Cannot save your changes!");
      });
  };

  render() {
    return (
      <div className="vh-90 border-0">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="align-items-center mb-4">
            <i className="fas fa-user fa-lg me-1 fa-fw" />
            <label>Name </label>
            <input
              type="text"
              placeholder="Title of the Book"
              name="name"
              className="form-control"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>

          <div className="align-items-center mb-4">
            <i class="fas fa-calendar-alt fa-lg me-1 fa-fw" />
            <label htmlFor="published_date">Session</label>
            <input
              type="text"
              placeholder="session"
              name="session"
              className="form-control"
              value={this.state.session}
              onChange={this.onChange}
            />
          </div>

          <div className="align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-1 fa-fw" />
            <label htmlFor="isbn">Email</label>
            <input
              type="text"
              placeholder="email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="align-items-center mb-4">
            <i className="fas fa-list-ol fa-lg me-1 fa-fw" />
            <label htmlFor="author">Registration Number</label>
            <input
              type="text"
              placeholder="registration"
              name="registration"
              className="form-control"
              value={this.state.registration}
              onChange={this.onChange}
            />
          </div>
          <div className="align-items-center mb-4">
            <i className="fas fa-book-reader fa-lg me-1 fa-fw" />
            <label htmlFor="description">Department</label>
            <input
              type="text"
              placeholder="Department"
              name="department"
              className="form-control"
              value={this.state.department}
              onChange={this.onChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success text-align-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser;
