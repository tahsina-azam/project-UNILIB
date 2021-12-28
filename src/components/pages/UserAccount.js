import React from "react";
import "../../styles/App.css";
import { Row, Image, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";
import "../../styles/UserProfile.css";
import "../../styles/Fonts.css";
import CommonProfile from "./CommonProfile";
import Sidebar from "../Sidebar";
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
      val: "",
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
                val: "2",
              });
            } else {
              this.setState({
                val: "3",
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
      <div className="wrapper">
        <Sidebar type={this.state.val} pageid={this.state.id} />
        <CommonProfile className="content" />
      </div>
    );
  }
}

export default App;
