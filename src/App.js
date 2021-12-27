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
import BookDetails from "./components/pages/BookDetails";
import FileProvider from "./contexts/file";
import axios from "./utility";
import TypePost from "./components/pages/PutPosts";
import ManageUsers from "./components/pages/ManageUsers";
import ContactAdmin from "./components/pages/ContactAdmin";

function App() {
  const [state, setState] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const path = window.location.pathname;
  const words = path.split("/");
  console.log(words[0]);

  const requireAuth = () => {
    const path = window.location.pathname;
    const words = path.split("/");
    console.log(words[0]);
    /*if (words[1] === "unilib") {
      return true;
    } else {
      return false;
    }*/
    if (
      words[1] === "" ||
      words[1] === "services" ||
      words[1] === "log-in" ||
      words[1] === "sign-up" ||
      words[1] === "logout" ||
      words[1] === "authentication"
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      const response = requireAuth();
      setState(response);
      if (response) {
        axios.get("http://localhost:4000/user", { withCredentials: true }).then(
          (response) => {
            console.log(response.data);
            setRole(response.data.data.role);
            const email = response.data.data.email;
            var id = email.split("@");
            setName(id[0]);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    })();
  });

  return (
    <div className="container">
      <ApolloProvider client={client}>
        <FileProvider>
          <BrowserRouter>
            <Navbar
              state={state}
              setState={setState}
              role={role}
              setRole={setRole}
              name={name}
              setName={setName}
            />

            <div className="wrap ml-0 mt-0">
              <Routes>
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/ContactAdmin" element={<ContactAdmin />} />
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route
                  path="/unilib/user/:username"
                  element={<UserAccount />}
                />
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
                <Route path="/forum/writepost" element={<TypePost />} />
                <Route
                  path="/unilib/admin/library"
                  element={<AdminLibrary />}
                />
                <Route path="/unilib/admin/add-books/" element={<AddBooks />} />

                <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
                <Route path="/show-book/:id" element={<ShowBookDetails />} />
                <Route
                  path="/show-book-details/:id"
                  element={<BookDetails />}
                />
                <Route
                  path="/unilib/admin/manage-users"
                  element={<ManageUsers />}
                />
                <Route path="/logout/" element={<LogOut />} />
              </Routes>
            </div>
          </BrowserRouter>
        </FileProvider>
      </ApolloProvider>
      {/* //will keep all the routers here. */}
    </div>
  );
}

export default App;
