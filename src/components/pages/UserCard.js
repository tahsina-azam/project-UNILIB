import React from "react";
import { Link } from "react-router-dom";
import { Row, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";

const UserCard = (props) => {
  const user = props.user;
  return (
    <div>
      <Card style={{ width: "18rem", height: "30rem" }}>
        <Card.Body>
          {/* <Card.Title>
            <Link to={`/show-book/${book._id}`}>{book.bookName}</Link>
         </Card.Title>*/}
          <h3>{user.name}</h3>
          <Card.Text className="fnt">{user.email}</Card.Text>
          <Card.Text className="fnt">{user.registration}</Card.Text>
        </Card.Body>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default UserCard;
