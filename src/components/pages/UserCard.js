import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Fonts.css";
import axios from "axios";

const UserCard = (props) => {
  const user = props.user;
  const [state, setState] = useState("");
  let menu;

  const requireAuth = () => {
    const path = window.location.pathname;
    const words = path.split("/");
    console.log(words[0]);
    if (words[1] === "unilib") {
      menu = (
        <div>
          <button
            type="button"
            className="btn btn-outline-danger btn-lg btn-block"
            onClick={onDeleteClick.bind(this, user._id)}
          >
            Delete User
          </button>
        </div>
      );
    } else if (words[1] === "show-book") {
      menu = (
        <div>
          <button
            type="button"
            className="btn btn-outline-danger btn-lg btn-block"
          >
            Issue This Book
          </button>
        </div>
      );
    } else {
      menu = (
        <div>
          {" "}
          <button
            type="button"
            className="btn btn-outline-danger btn-lg btn-block"
          >
            View
          </button>
        </div>
      );
    }
  };

  const onDeleteClick = (id) => {
    axios
      .delete("http://localhost:4000/api/delete/user/" + id)
      .then((res) => {
        this.props.history.push("/unilib/admin/library");
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  };

  requireAuth();

  return (
    <div>
      <Card style={{ width: "18rem", height: "17rem" }}>
        <Card.Body>
          {/* <Card.Title>
            <Link to={`/show-book/${book._id}`}>{book.bookName}</Link>
         </Card.Title>*/}
          <h3>{user.name}</h3>
          <Card.Text className="fnt">{user.email}</Card.Text>
          <Card.Text className="fnt">{user.registration}</Card.Text>
        </Card.Body>
        <div>{menu}</div>
      </Card>
      <Row className="mb-5"></Row>
    </div>
  );
};

export default UserCard;
