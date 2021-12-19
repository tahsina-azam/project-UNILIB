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
import client from "./config/graphql";
import UserAccount from "./components/pages/UserAccount";
import Library from "./components/pages/Library";
import AdminAccount from "./components/pages/Admin";
import LogOut from "./components/pages/LogOut";
import AdminLibrary from "./components/pages/AdminLibrary";
import AddBooks from "./components/pages/AddBooks";
import StudentBooks from "./components/pages/StudentBooks";
import UpdateBookInfo from "./components/pages/UpdateBookInfo";
import ShowBookDetails from "./components/pages/ShowBookDetails";
import FileProvider from "./contexts/file";

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
    <div className="container">
      <ApolloProvider client={client}>
        <FileProvider>
          <BrowserRouter>
            <Navbar state={state} setState={setState} />
            <Routes>
              <Route path="/forum" element={<Forum />} />
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />

              <Route path="/unilib/user/:username" element={<UserAccount />} />
              <Route path="/unilib/library" element={<Library />} />

              <Route
                path="/authentication/activation/:token"
                element={<Activation />}
              />
              <Route
                path="/unilib/admin/:username"
                element={<AdminAccount />}
              />
              <Route path="/forum/:category" element={<StudentBooks />} />
              <Route path="/unilib/admin/library" element={<AdminLibrary />} />
              <Route path="/unilib/admin/add-books/" element={<AddBooks />} />

              <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
              <Route path="/show-book/:id" element={<ShowBookDetails />} />

              <Route path="/logout/" element={<LogOut />} />
            </Routes>
          </BrowserRouter>
        </FileProvider>
      </ApolloProvider>
      {/* //will keep all the routers here. */}
    </div>
  );
}

export default App;
