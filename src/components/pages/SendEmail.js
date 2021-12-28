import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import selectType from "../popups";

const SendEmail = (props) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const onSubmitClick = (email) => {
    const path = window.location.pathname;
    const userRef = path.split("/");
    console.log(userRef[2]);
    if (text === "") {
      alert("please write something first before submitting");
    } else {
      axios
        .post("http://localhost:4000/api/admin/send-email", {
          subject: subject,
          message: text,
          email: userRef[2],
        })
        .then(
          (success) => {
            selectType("success", "account");
            console.log("sucessfully sent email");
          },
          (error) => {
            selectType("error", "cookies");
            console.log(error);
          }
        );
    }
  };

  return (
    <div className="text-start">
      <div className="m-5">
        <form>
          <textarea
            type="text"
            className="form-control"
            placeholder="Please specify a subject... ..."
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            style={{ height: "200px" }}
          ></textarea>
          <textarea
            type="text"
            className="form-control"
            placeholder="write whatever you want to inform this student... ..."
            onChange={(e) => {
              setText(e.target.value);
            }}
            style={{ height: "200px" }}
          ></textarea>
          <div
            style={{ color: "red", fontSize: "12px" }}
            className="ml-auto"
          ></div>
          <button
            className="btn btn-success mt-2 ml-auto"
            style={{ width: "auto", height: "auto" }}
            type="submit"
            onClick={onSubmitClick.bind(this, props.email)}
          >
            <i class="far fa-share-square" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default SendEmail;

{
  /*function SendEmail() {
  return (
    <div>
      <h1>send email will go here</h1>
    </div>
  );
}

export default SendEmail;*/
}
