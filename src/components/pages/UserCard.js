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
        <div className="text-end">
          <button
            type="button"
            className="btn btn-danger btn-lg btn-block"
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
            onClick={onIssueClick.bind(this, user._id)}
          >
            Issue This Book
          </button>
        </div>
      );
    } else {
      menu = <div></div>;
    }
  };

  const onIssueClick = (id) => {
    const path = window.location.pathname;
    const bookRef = path.split("/");
    axios
      .post("http://localhost:4000/issue-book", {
        email: user.email,
        book: bookRef[2],
      })
      .then(
        (success) => {
          console.log("sucessfully issued this book");
        },
        (error) => {
          console.log(error);
        }
      );
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
      <Card style={{ width: "auto", height: "20rem" }} className="p-2">
        <Card.Body className="text-start">
          {/* <Card.Title>
            <Link to={`/show-book/${book._id}`}>{book.bookName}</Link>
         </Card.Title>*/}
          <Card.Text className="fnt-showUser text-capitalize">
            <span className="text-success " style={{ fontWeight: "bold" }}>
              Name:{" "}
            </span>
            {user.name}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              Email:{" "}
            </span>
            {user.email}
          </Card.Text>
          <Card.Text className="fnt-showUser">
            <span className="text-success" style={{ fontWeight: "bold" }}>
              Reg. number:{" "}
            </span>
            {user.registration}
          </Card.Text>
          <Card.Text className="fnt-showUser text-uppercase">
            <span
              className="text-success text-capitalize"
              style={{ fontWeight: "bold" }}
            >
              Department:{" "}
            </span>
            {user.department}
          </Card.Text>
        </Card.Body>
        <div>{menu}</div>
      </Card>
    </div>
  );
};

export default UserCard;
