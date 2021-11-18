import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Activation from "./components/pages/Activation";
import Forum from "./components/pages/Forum";
import { ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import client from "./config/graphql";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/forum" exact component={Forum} />
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
    </ApolloProvider> //will keep all the routers here.
  );
}

export default App;
