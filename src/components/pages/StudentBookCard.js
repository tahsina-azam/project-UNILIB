import React from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";
import "../../styles/Library.css";

/**
 * @description creates cards of the books available in student library
 * @param {array} props details of individual books
 * @returns cards containing book description
 */
const StudentBookCard = (props) => {
  const book = props.book;

  return (
    <div>
      <Card style={{ width: "18rem", height: "25rem" }}>
        <Card.Img
          variant="top"
          src={window.location.origin + "/images/" + book.image}
        />
        <Card.Body>
          <Card.Title>
            <Link
              to={`/show-book-details/${book._id}`}
              className="book-links fnt-bookname"
            >
              {book.bookName}
            </Link>
          </Card.Title>

          <Card.Text className="fnt-description mt-3">
            <p>
              <span style={{ color: "#198754" }}>Author: </span>
              {book.writer}
            </p>
            {/* <span style={{ color: "#198754" }}>Description: </span>
            {book.text} */}
          </Card.Text>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default StudentBookCard;
