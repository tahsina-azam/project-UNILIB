import React from "react";
import { Link } from "react-router-dom";
import { Row, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";

const StudentBookCard = (props) => {
  const book = props.book;

  return (
    <div>
      <Card style={{ width: "18rem", height: "30rem" }}>
        <Card.Img
          variant="top"
          src={window.location.origin + "/images/" + book.image}
        />
        <Card.Body>
          <Card.Title>
            <Link to={`/show-book-details/${book._id}`}>{book.bookName}</Link>
          </Card.Title>
          <h3>{book.writer}</h3>
          <Card.Text className="fnt">{book.text}</Card.Text>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default StudentBookCard;
