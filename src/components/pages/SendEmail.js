import React from "react";
import { useState } from "react";
import axios from "axios";
import selectType from "../popups";

/**
 * sending email to the user
 * @param {String} props user email and id
 * @return email sent to the user
 */
const SendEmail = (props) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  /**
   * Sending email to the users
   * @param {String} email
   */
  const onSubmitClick = (email) => {
    const path = window.location.pathname;
    const userRef = path.split("/");
    console.log(userRef[2]);
    if (text === "") {
      alert("Please write something first before submitting");
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
    <form className="text-center" style={{ height: "100%" }}>
      <textarea
        type="text"
        className="form-control mb-5"
        placeholder="Write the subject of the email"
        style={{ height: "40px" }}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      />
      <textarea
        type="text"
        className="form-control"
        placeholder="Write the body of the email"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        className="btn btn-success mt-5"
        type="submit"
        onClick={onSubmitClick.bind(this, props.email)}
      >
        <i class="far fa-share-square" /> Send
      </button>
    </form>
  );
};
export default SendEmail;
