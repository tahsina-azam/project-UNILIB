import { React, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../styles/Fonts.css";
import axios from "axios";

const ReportCard = (props) => {
  const report = props.report;

  const onDeleteClick = (id) => {
    axios
      .delete("http://localhost:4000/api/delete/report/" + id)
      .then((res) => {
        this.props.history.push("/unilib/admin/library");
      })
      .catch((err) => {
        console.log("Error form report card");
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
            {report.user_email}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              category:{" "}
            </span>
            {report.type}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              Subject:{" "}
            </span>
            {report.body}
          </Card.Text>
        </Card.Body>
        <div>
          <button
            type="button"
            className="btn btn-danger btn-lg btn-block"
            onClick={onDeleteClick.bind(this, report._id)}
          >
            Delete User
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ReportCard;
