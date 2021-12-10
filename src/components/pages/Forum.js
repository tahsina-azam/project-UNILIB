import React, { useState, useEffect } from "react";
import GetPosts from "../GetPosts";
import { TypePost } from "../PutPosts";
import Sidebar from "../Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";

function Forum() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [registration, setRegistration] = useState("");

  axios.get("http://localhost:4000/user", { withCredentials: true }).then(
    (response) => {
      console.log(response.data);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setDepartment(response.data.data.department);
      setRegistration(response.data.data.registration);
      setSession(response.data.data.session);
    },
    (error) => {
      alert("You are not logged in.");
    }
  );

  console.log(email); //you can directly address variables now by their names :D

  return (
    <div>
      <Sidebar />
      {/* <div className="wrapper"> */}
      {/* <!-- Page Content  --> */}
      <div className="content">
        <TypePost />
        <GetPosts />
      </div>
    </div>
  );
}

export default Forum;
