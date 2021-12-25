import React from "react";
import "../../styles/App.css";
import { Row, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";
import { ListGroup } from "react-bootstrap";
import "../../styles/UserProfile.css";
import "../../styles/Fonts.css";
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
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Row className="mb-3"></Row>
            <div className="profile-card-4 z-depth-3">
              <div className="card">
                <div className="card-body text-center  rounded-top">
                  <div className="user-box">
                    <Image
                      src="https://cdn-icons.flaticon.com/png/512/560/premium/560277.png?token=exp=1640441048~hmac=98f88c50b4ff97a562830cf5332adeae"
                      alt="user avatar"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <ListGroup>
                    <ListGroup.Item className="text-white">
                      Edit Account Info
                    </ListGroup.Item>
                    <ListGroup.Item className="text-white">
                      View Other Users
                    </ListGroup.Item>
                    <ListGroup.Item className="text-white">
                      Recently Added Books
                    </ListGroup.Item>
                    <ListGroup.Item className="text-white">
                      Your account history
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                {/* <div className="card-footer text-center"></div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card z-depth-3">
              <div className="card-body">
                <ul className="nav nav-pills nav-pills-primary nav-justified">
                  <li className="nav-item">
                    {/* <a
                      href="javascript:void();"
                      data-target="#profile"
                      data-toggle="pill"
                      className="nav-link active show"
                    > */}
                    {/* <i className="icon-user"></i>{" "} */}
                    {/* <span className="hidden-xs">Profile</span> */}
                    {/* </a> */}
                  </li>
                </ul>
                <div className="tab-content p-3 ">
                  <div className="tab-pane active show" id="profile">
                    <div className="text-capitalize">
                      <div>
                        <p className="fnt grading text-white">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          Name
                        </p>
                        <p className="m-2 fnt-user text-success">
                          {this.state.name}
                        </p>
                      </div>

                      <p className="fnt grading text-white">
                        <i className="fas fa-list-ol fa-lg me-3 fa-fw" />
                        Registration Number
                      </p>
                      <p className="m-2 fnt-user text-success">
                        {this.state.registration}
                      </p>
                      <p className="fnt grading text-white">
                        <i className="fas fa-book-reader fa-lg me-3 fa-fw" />
                        Department
                      </p>
                      <p className="m-2 fnt-user text-success">
                        {this.state.department}
                      </p>
                    </div>
                    <p className="fnt grading text-white">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                      Contact
                    </p>
                    <p className="m-2 fnt-user text-success">
                      {this.state.email}
                    </p>
                    <p className="fnt grading text-white">
                      <i class="fas fa-calendar-alt fa-lg me-3 fa-fw" />
                      Session
                    </p>

                    <p className="m-2 fnt-user text-success">
                      {this.state.session}
                    </p>
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
