import React, { Component } from "react";
import "../../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";
import "../../styles/UserProfile.css";
import "../../styles/Fonts.css";

class CommonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      registration: "",
      department: "",
      name: "",
      session: "",
      role: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/user", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        this.setState({
          email: response.data.data.email,
          name: response.data.data.name,
          department: response.data.data.department,
          session: response.data.data.session,
          registration: response.data.data.registration,
        });
        axios
          .get("http://localhost:4000/user/" + this.state.email)
          .then((res) => {
            this.setState({
              id: res.data.data._id,
              role: res.data.data.role,
            });
          });
      });
  }
  render() {
    return (
      <div className="content m-10">
        <div className="text-capitalize">
          <div>
            <p className="fnt grading text-white">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              Name
            </p>
            <p className="m-2 fnt-user text-success">{this.state.name}</p>
          </div>

          <p className="fnt grading text-white">
            <i className="fas fa-list-ol fa-lg me-3 fa-fw" />
            Registration Number
          </p>
          <p className="m-2 fnt-user text-success">{this.state.registration}</p>
          <p className="fnt grading text-white">
            <i className="fas fa-book-reader fa-lg me-3 fa-fw" />
            Department
          </p>
          <p className="m-2 fnt-user text-success">{this.state.department}</p>
        </div>
        <p className="fnt grading text-white">
          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
          Contact
        </p>
        <p className="m-2 fnt-user text-success">{this.state.email}</p>
        <p className="fnt grading text-white">
          <i class="fas fa-calendar-alt fa-lg me-3 fa-fw" />
          Session
        </p>

        <p className="m-2 fnt-user text-success">{this.state.session}</p>
      </div>
    );
  }
}

export default CommonProfile;
