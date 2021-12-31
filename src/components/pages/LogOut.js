import React from "react";
import axios from "../../utility";
import Home from "./Home";
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
    return <Home />;
  }
}

export default App;
