import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import UserAccount from "./components/pages/UserAccount";
import Library from "./components/pages/Library";

function App() {
  const [state, setState] = useState(false);

  const path = window.location.pathname;
  const words = path.split("/");
  console.log(words[0]);

  const requireAuth = () => {
    const path = window.location.pathname;
    const words = path.split("/");
    console.log(words[0]);
    if (words[1] === "unilib") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const response = requireAuth();

      setState(response);
    })();
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar state={state} setState={setState} />
        <div className="pt-5">
          <Routes>
            <Route path="/forum" element={<Forum />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/unilib/user/:username"
             element={<UserAccount/>}
            />
            <Route path="/unilib/library" element={<Library />} />
            <Route
              path="/authentication/activation/:token"
             element={<Activation/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider> //will keep all the routers here.
  );
}

export default App;
