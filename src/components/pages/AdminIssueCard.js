import { React, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../styles/Fonts.css";
import axios from "axios";
import selectType from "../popups";

/**
 * @description creates cards when admin issues a book
 * @param {array} props details of individual books
 * @returns cards containing book description and issue history
 */
const AdminIssueCard = (props) => {
  const issuedBook = props.issuedBook;

  /**
   * @description deletes the specific issue with provided id
   * @param {String} id unique id of every books
   */
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

  /**
   * @description changes the status of the person with specified id
   * @param {String} id unique id of every books
   */
  const onChangeClick = (id) => {
    axios.post("http://localhost:4000/admin/changeStatus/" + id, {
      status: "returned",
      book: issuedBook.issued_book,
      email: issuedBook.issued_user,
      date: issuedBook.issue_date,
      time: issuedBook.issue_time,
    });
    selectType("small");
    window.location.reload();
  };
  return (
    <div>
      <Card style={{ width: "auto", height: "22rem" }}>
        <Card.Body>
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
        <Card.Footer className="border-0">
          {" "}
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={onChangeClick.bind(this, issuedBook._id)}
            data-toggle="tooltip"
            data-placement="top"
            title=" Mark As Returned"
          >
            <i class="fas fa-check-circle"></i>
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AdminIssueCard;
