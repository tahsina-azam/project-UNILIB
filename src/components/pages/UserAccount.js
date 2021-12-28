import React from "react";
import "../../styles/App.css";
import { Row, Image, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";
import { ListGroup } from "react-bootstrap";
import "../../styles/UserProfile.css";
import "../../styles/Fonts.css";
import { Link } from "react-router-dom";
import CommonProfile from "./CommonProfile";
class App extends React.Component {
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
      sideBar: "",
      userimg: "",
    };
  }
  componentDidMount() {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 1) {
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
        axios
          .get("http://localhost:4000/user/" + this.state.email)
          .then((res) => {
            this.setState({
              id: res.data.data._id,
              role: res.data.data.role,
            });
            console.log("this is response " + res.data.data.role);
            axios.get("http://localhost:4000/img/" + this.state.email).then(
              (res) => {
                this.setState({
                  userimg: res.data.data.image,
                });
                console.log(res.data.data.image);
              },
              (error) => {
                this.setState({
                  //userimg: "",
                });
              }
            );
            if (this.state.role === "admin") {
              this.setState({
                sideBar: (
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
                            <Link to={`/edit-user/${this.state.id}`}>
                              Edit Account Info
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item className="text-white">
                            <Link to="/unilib/admin/manage-users">
                              Manage Users
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item className="text-white">
                            <Link to="/check-report">Check Reports</Link>
                          </ListGroup.Item>
                          <ListGroup.Item className="text-white">
                            <Link to="/user-history">
                              {" "}
                              Your account history
                            </Link>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                      {/* <div className="card-footer text-center"></div> */}
                    </div>
                  </div>
                ),
              });
            } else {
              this.setState({
                sideBar: (
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
                            <Link to={`/edit-user/${this.state.id}`}>
                              Edit Account Info
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item className="text-white">
                            <Link to="/view-all">View Other Users</Link>
                          </ListGroup.Item>
                          <ListGroup.Item className="text-white">
                            Recently Added Books
                          </ListGroup.Item>
                          <ListGroup.Item className="text-white">
                            <Link to="/user-history">
                              {" "}
                              Your account history
                            </Link>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                      {/* <div className="card-footer text-center"></div> */}
                    </div>
                  </div>
                ),
              });
            }
          });
      });
    console.log(this.state.role);
    console.log(this.state.userimg);
  }

  //design of side card component is inside sidebar inside componentdidmount method
  //and the other card is in CommonProfile.js

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Row className="mb-3"></Row>
            {this.state.sideBar}
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
                <CommonProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
