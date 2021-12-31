import React from "react";
import axios from "../../utility";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "../../Auth";
import selectType from "../popups";

class App extends React.Component {
  componentDidMount() {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }

    axios
      .post("http://localhost:4000/logout", {
        withCredentials: true,
      })
      .then(
        (response) => {
          selectType("message", "Logging you out ");
          window.localStorage.clear();
          console.log(window.localStorage.getItem("token") + "from logout");
          Auth.signout();
          console.log(response.data);
        },
        (error) => {
          Auth.signout();
          console.log(error);
        }
      );
    console.log(Auth.getAuth() + "from logout.js");
  }

  render() {
    return (
      <div>
        <Row className="mb-5"></Row>
        <p>You are logged out.Please log in again.</p>
      </div>
    );
  }
}

export default App;
