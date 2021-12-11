import React from "react";
import { Link } from "react-router-dom";

const BookCard = (props) => {
  const book = props.book;

  return (
    <div className="card-container">
      <img
        src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3"
        alt=""
      />
      <div className="desc">
        <h2>
          <Link to={`/show-book/${book._id}`}>{book.bookName}</Link>
        </h2>
        <h3>{book.writer}</h3>
        <p>{book.text}</p>
      </div>
    </div>
  );
};

export default BookCard;
