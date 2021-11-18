import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Activation from "./components/pages/Activation";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" exact component={Services} />
          <Route path="/log-in" exact component={LogIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route
            path="/authentication/activation/:token"
            exact
            component={Activation}
          />
        </Switch>
      </Router>
    </> //will keep all the routers here.
  );
}

export default App;
