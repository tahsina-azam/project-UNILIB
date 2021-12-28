import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../src/styles/App.css";

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
  onChangeFile = (e) => {
    this.setState({
      fileName: e.target.files[0],
    });
    console.log(e.target.files[0]);
  };

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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
        //this.props.history.push("/show-book/" + bookRef[2]);
      })
      .catch((err) => {
        console.log("Error in UpdateUserInfo!");
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
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Your Account</h1>
              <p className="lead text-center">Update Personal Info</p>
            </div>
          </div>
          {/*here begins */}
          {/* <div class="mx-auto">
            <div>
              <form enctype="multipart/form-data">
                <div class="form-group  mx-sm-3 mb-2">
                  <label for="exampleFormControlFile1">Add A Image</label>{" "}
                  <div className="input-group">
                    <span className="input-group-text border-0">
                      <i className="fa fa-cloud-upload p-0 m-0" />
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control border-0 align-center pl-0 ml-0"
                      filename="image"
                      onChange={this.onChangeFile}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    class="btn btn-success"
                    type="submit"
                    align="center"
                    onClick={this.handleClick}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
         </div>*/}
          {/*here stops */}
          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
