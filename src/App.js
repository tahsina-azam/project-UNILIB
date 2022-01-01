import { useEffect, useState } from "react";
import * as React from "react";
import Navbar from "./components/Navbar";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useNavigate,
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
import EditUser from "./components/pages/EditUser";
import UserViewAll from "./components/pages/UserViewAll";
import UserHistory from "./components/pages/UserHistory";
import ContactAdmin from "./components/pages/ContactAdmin";
import CheckReport from "./components/pages/CheckReport";
import ShowUserList from "./components/pages/ShowUserList";
import SendEmail from "./components/pages/SendEmail";
import RecentBooks from "./components/pages/RecentBooks";
import Auth from "./Auth";
import { SearchForum } from "./components/pages/SearchForum";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap, CSSPlugin } from "gsap/all";

function App() {
  const [state, setState] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [emailHistory, setEmailHistory] = useState("");
  const [id, setID] = useState("");
  const [auth, setAuth] = useState(Auth.getAuth());

  const path = window.location.pathname;
  const words = path.split("/");
  console.log(words[0]);

  const requireAuth = () => {
    const path = window.location.pathname;
    const words = path.split("/");
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
      await setAuth(Auth.getAuth());
      if (response) {
        axios.get("http://localhost:4000/user", { withCredentials: true }).then(
          (response) => {
            setRole(response.data.data.role);
            setEmailHistory(response.data.data.email);
            setID(response.data.data._id);
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

            <div className="mt-5">
              <Routes>
                <Route
                  path="/unilib/forum"
                  element={auth ? <Forum /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/forum/ContactAdmin"
                  element={auth ? <ContactAdmin /> : <Navigate to="/" />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/unilib/forum/search"
                  element={auth ? <SearchForum /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/user/:username"
                  element={<UserAccount role={role} id={id} />}
                />
                <Route
                  path="/unilib/library"
                  element={auth ? <Library /> : <Navigate to="/" />}
                />

                <Route
                  path="/authentication/activation/:token"
                  element={<Activation />}
                />
                <Route
                  path="/unilib/admin/:username"
                  element={auth ? <AdminAccount /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/forum/:category"
                  element={auth ? <StudentBooks /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/forum/writepost"
                  element={auth ? <TypePost /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/admin/library"
                  element={auth ? <AdminLibrary /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/admin/add-books/"
                  element={auth ? <AddBooks /> : <Navigate to="/" />}
                />

                <Route
                  path="/edit-book/:id"
                  element={auth ? <UpdateBookInfo /> : <Navigate to="/" />}
                />
                <Route
                  path="/show-book/:id"
                  element={auth ? <ShowBookDetails /> : <Navigate to="/" />}
                />
                <Route
                  path="/show-book-details/:id"
                  element={auth ? <BookDetails /> : <Navigate to="/" />}
                />
                <Route
                  path="/edit-user/:id"
                  element={
                    auth ? (
                      <EditUser email={emailHistory} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/view-all"
                  element={auth ? <UserViewAll /> : <Navigate to="/" />}
                />
                <Route
                  path="/check-report"
                  element={auth ? <CheckReport /> : <Navigate to="/" />}
                />
                <Route
                  path="/unilib/admin/manage-users"
                  element={auth ? <ManageUsers /> : <Navigate to="/" />}
                />
                <Route
                  path="/user-history"
                  element={
                    auth ? (
                      <UserHistory emailHistory={emailHistory} id={id} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  to=" /show-book/issue"
                  element={auth ? <ShowUserList /> : <Navigate to="/" />}
                />
                <Route
                  path="/recently-added-books"
                  element={auth ? <RecentBooks /> : <Navigate to="/" />}
                />

                <Route
                  path="/send-email/:id"
                  element={
                    auth ? (
                      <SendEmail email={emailHistory} id={id} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
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
