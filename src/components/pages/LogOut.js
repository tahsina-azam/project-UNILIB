import React from "react";
import axios from "../../utility";
import { Row } from "react-bootstrap";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

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
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return <Home />;
  }
}

export default App;
