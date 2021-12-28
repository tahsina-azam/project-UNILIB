import React from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";

const BookCard = (props) => {
  const book = props.book;
  console.log(book.image);
  return (
    <div>
      <Card style={{ width: "18rem", height: "30rem" }}>
        <div>
          <Card.Img
            variant="top"
            src={window.location.origin + "/images/" + book.image}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <Link to={`/show-book/${book._id}`}>{book.bookName}</Link>
          </Card.Title>
          <h3>{book.writer}</h3>
          <Card.Text className="fnt">{book.text}</Card.Text>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default BookCard;
