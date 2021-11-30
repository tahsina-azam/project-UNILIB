import React from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./styles/App.css";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Activation from "./components/pages/Activation";
import Forum from "./components/pages/Forum";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import StudentBooks from "./components/pages/StudentBooks";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <div className="pt-5">
          <Routes>
            <Route path="/forum" element={<Forum />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forum/getBooks" element={<StudentBooks />} />
            <Route
              path="/authentication/activation/:token"
              exact
              component={Activation}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider> //will keep all the routers here.
  );
}

export default App;
