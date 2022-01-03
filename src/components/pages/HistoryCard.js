import React from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";
import "../../styles/Library.css";
/**
 * @description creates cards when admin issues a book
 * @param {array} props details of individual books
 * @returns cards containing book description and issue history
 */
const HistoryCard = (props) => {
  const history = props.book;
  return (
    <div>
      <Card style={{ width: "18rem", height: "auto" }}>
        <Card.Body>
          <Card.Title>
            <Link
              to={`/show-book-details/${history.issued_book}`}
              className="book-links fnt-description"
            >
              Book id: {history.issued_book}
            </Link>
          </Card.Title>
          <sub className=" subs mx-2 text-capitalize">
            <i class="fas fa-calendar-alt" />
            {history.issue_date} <i class="fas fa-clock ms-2" />{" "}
            {history.issue_time}
          </sub>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default HistoryCard;
