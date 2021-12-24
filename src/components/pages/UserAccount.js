import React from "react";
import "../../styles/App.css";
import { Col, Form, Row, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../images/user.png";
import axios from "../../utility";
import { ListGroup } from "react-bootstrap";
import "../../styles/UserProfile.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      registration: "",
      department: "",
      name: "",
      session: "",
    };
  }

  componentDidMount() {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }

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
      });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <Row className="mb-3"></Row>
            <div class="profile-card-4 z-depth-3">
              <div class="card">
                <div class="card-body text-center  rounded-top">
                  <div class="user-box">
                    <Image
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="user avatar"
                    />
                  </div>
                  <h5 class="mb-1 text-white">{this.state.name}</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group shadow-none">
                    <li class="list-group-item">
                      <div class="list-icon">
                        <i class="fa fa-envelope"></i>
                      </div>
                      <div class="list-details">
                        <span>{this.state.email}</span>
                      </div>
                    </li>
                    <li></li>
                  </ul>
                  <ListGroup>
                    <ListGroup.Item>Edit Account Info</ListGroup.Item>
                    <ListGroup.Item>View Other Users</ListGroup.Item>
                    <ListGroup.Item>Recently Added Books</ListGroup.Item>
                    <ListGroup.Item>Contact Support</ListGroup.Item>
                  </ListGroup>
                </div>
                <div class="card-footer text-center"></div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <Row className="mb-3"></Row>
            <div class="card z-depth-3">
              <div class="card-body">
                <ul class="nav nav-pills nav-pills-primary nav-justified">
                  <li class="nav-item">
                    <a
                      href="javascript:void();"
                      data-target="#profile"
                      data-toggle="pill"
                      class="nav-link active show"
                    >
                      <i class="icon-user"></i>{" "}
                      <span class="hidden-xs">Profile</span>
                    </a>
                  </li>
                </ul>
                <div class="tab-content p-3">
                  <div class="tab-pane active show" id="profile">
                    <h5 class="mb-3">User Profile</h5>
                    <div class="row">
                      <div class="col-md-6">
                        <h6>Name</h6>
                        <p>{this.state.name}</p>
                        <h6>Registration Number</h6>
                        <p>{this.state.registration}</p>
                        <h6>Department</h6>
                        <p>{this.state.department}</p>
                      </div>
                      <div class="col-md-6">
                        <h6>Contact</h6>
                        <p>{this.state.email}</p>
                        <h6>Session</h6>

                        <p>{this.state.session}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="col-lg-8" style={{ width: "46rem" }}>
                <div class="card z-depth-3">
                  <div class="card-body">
                    <ul class="nav nav-pills nav-pills-primary nav-justified">
                      <li class="nav-item">
                        <a
                          href="javascript:void();"
                          data-target="#profile"
                          data-toggle="pill"
                          class="nav-link active show"
                        >
                          <i class="icon-user"></i>{" "}
                          <span class="hidden-xs">Borrowed Books</span>
                        </a>
                      </li>
                      <div class="col-md-12">
                        <table class="table table-hover table-striped">
                          <tbody>
                            <tr>
                              <td>
                                <strong>{this.state.name}</strong> Borrowed book
                                "A great Romance" with id{" "}
                                <strong>"12345fgdfgg345"</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
