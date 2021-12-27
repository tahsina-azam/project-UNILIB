import React from "react";
import { Link } from "react-router-dom";
import { Row, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";

const HistoryCard = (props) => {
  const history = props.book;
  return (
    <div>
      <Card style={{ width: "18rem", height: "17rem" }}>
        <div></div>
        <Card.Body>
          <Card.Title>
            <Link to={`/show-book-details/${history.issued_book}`}>
              {history.issued_book}
            </Link>
          </Card.Title>
          <h3>{history.issue_date}</h3>
          <Card.Text className="fnt">{history.issue_time}</Card.Text>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default HistoryCard;
