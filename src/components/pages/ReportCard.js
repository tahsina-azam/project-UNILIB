import { React, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../styles/Fonts.css";
import axios from "axios";
/**
 * @description creates cards when a report is made by the user
 * @param {array} props details of individual reports
 * @returns cards containing report description
 */
const ReportCard = (props) => {
  const report = props.report;
  /**
   * deletes the report with specified id
   * @param {String} id
   */
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
      <Card className="p-2">
        <Card.Body className="text-start">
          <Card.Text className="fnt-showUser text-capitalize">
            <span className="text-success " style={{ fontWeight: "bold" }}>
              User Email:{" "}
            </span>
            {report.user_email}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              Report Type:{" "}
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
        <div className="text-end">
          <Link to={`/send-email/${report.user_email}`}>
            {" "}
            <button
              type="button"
              className="btn btn-info btn-block m-2"
              data-toggle="tooltip"
              data-placement="top"
              title="click to reply"
            >
              <i class="fas fa-comment-dots" style={{ color: "white" }} />
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-block m-2"
            data-toggle="tooltip"
            data-placement="top"
            title="Click to delete the report"
            onClick={onDeleteClick.bind(this, report._id)}
          >
            <i class="fas fa-trash-alt" style={{ color: "white" }} />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ReportCard;
