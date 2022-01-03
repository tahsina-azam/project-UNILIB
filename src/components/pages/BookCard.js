import React from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";
import "../../styles/Library.css";
/**
 * @description creates cards when admin adds a book to the library
 * @param {array} props details of individual books
 * @returns cards containing book description
 */
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
            <Link
              to={`/show-book/${book._id}`}
              className="book-links fnt-bookname"
            >
              {book.bookName}
            </Link>
          </Card.Title>

          <Card.Text className="fnt-description ">
            <p>
              <span style={{ color: "#198754" }}>Author: </span>
              {book.writer}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default BookCard;
