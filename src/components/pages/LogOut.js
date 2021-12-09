import React from "react";
import axios from "../../utility";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  componentDidMount() {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 2) {
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
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div>
        <Row className="mb-5"></Row>
        <button>hello</button>
        <p>You are logged out.Please log in again.</p>
        <p>You are logged out.Please log in again.</p>
        <p>You are logged out.Please log in again.</p>
        <p>You are logged out.Please log in again.</p>
      </div>
    );
  }
}

export default App;
