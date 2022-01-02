import { React, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../styles/Fonts.css";
import axios from "axios";

const AdminIssueCard = (props) => {
  const issuedBook = props.issuedBook;

  const onDeleteClick = (id) => {
    axios
      .delete("http://localhost:4000/api/delete/issue/" + id)
      .then((res) => {
        this.props.history.push("/unilib/admin/library");
      })
      .catch((err) => {
        console.log("Error form report card");
      });
  };
  const onChangeClick = (id) => {
    axios.post("http://localhost:4000/admin/changeStatus/" + id, {
      status: "returned",
    });
  };
  return (
    <div>
      <Card style={{ width: "auto", height: "20rem" }} className="p-2">
        <Card.Body className="text-start">
          <Card.Text className="fnt-showUser text-capitalize">
            <span className="text-success " style={{ fontWeight: "bold" }}>
              User Email:{" "}
            </span>
            {issuedBook.issued_user}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              Issued Book:{" "}
            </span>
            {issuedBook.issued_book}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              date:{" "}
            </span>
            {issuedBook.issue_date}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              time:{" "}
            </span>
            {issuedBook.issue_time}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              status:{" "}
            </span>
            {issuedBook.status}
          </Card.Text>
        </Card.Body>
        <div>
          {" "}
          <button
            type="button"
            className="btn btn-danger btn-lg btn-block"
            onClick={onChangeClick.bind(this, issuedBook._id)}
          >
            Mark As Returned
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminIssueCard;
