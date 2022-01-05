import React, { Component, useState } from "react";
import axios from "axios";
import HistoryCard from "./HistoryCard";
import { Card } from "react-bootstrap";
import "../../styles/Library.css";

import "../../styles/Fonts.css";
import selectType from "../popups";
import { USER_HISTORY, BOOK_HISTORY } from "../../database/queries";
import { useQuery } from "@apollo/client";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import Time from "../UuidToTime";
import { DeletePosts, DeleteBooks } from "../Delete";
import { EditPost } from "./PutPosts";
import "../../styles/Comment.css";
const UserPost = ({ message, created_at, postid }) => {
  const [editBox, setEditBox] = useState(false);
  const [tool, setTool] = useState("Click here to edit");
  const caption = "Published at: ";
  return (
    <div className="bg-success2 p-3 text-start m-3" style={{ width: "100%" }}>
      <div className="user-info float-container">
        <Time
          time={created_at}
          caption={caption}
          className="text-muted float-child2"
        />
        <div className="float-child1 float-container">
          <DeletePosts postid={postid} />
          <button
            className="btn btn-success float-child1 mx-1 buttons"
            data-toggle="tooltip"
            data-placement="top"
            title={tool}
            onClick={() => {
              setEditBox(!editBox);
              setTool(
                tool === "Click here to edit"
                  ? "Click again to close the edit"
                  : "Click here to edit"
              );
            }}
          >
            <i class="fas fa-edit" style={{ color: "white" }} />{" "}
          </button>
        </div>
      </div>
      <br />
      {!editBox && (
        <p className="text-capitalize fnt text-bold p-3">{message}</p>
      )}
      {editBox && <EditPost messageBefore={message} postid={postid} />}
    </div>
  );
};
const AllPostsByUser = () => {
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("Show Posts");
  const { data, loading, error } = useQuery(USER_HISTORY, {
    variables: { id: localStorage.getItem("id") },
  });
  console.log(data);
  if (loading) return <BoxLoading />;
  if (error) return selectType("error", "please try again");
  return (
    <div className="text-left">
      {" "}
      {console.log(data)}
      <br />
      <br />
      <button
        className="btn btn-outline-success"
        onClick={() => {
          setShow(!show);
          setButtonText(
            buttonText === "Hide Posts" ? "Show Posts" : "Hide Posts"
          );
        }}
      >
        {buttonText}
      </button>
      {data.posts_aggregate.nodes.count === 0 ? (
        <div>No posts!</div>
      ) : (
        <div>
          {data.posts_aggregate.nodes.map(
            (n) =>
              show && (
                <UserPost
                  key={n.id}
                  message={n.message}
                  created_at={n.created_at}
                  postid={n.id}
                  registration={n.author.registration}
                  editid={localStorage.getItem("id")}
                  loggedid={localStorage.getItem("id")}
                  author={n.author.name}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};
const UserBook = ({
  name,
  link,
  description,
  cat_name,
  uploaded_at,
  bookid,
}) => {
  return (
    <Card style={{ width: "18rem", height: "25rem" }} className="mt-5">
      <Card.Body>
        <Card.Title
          className="text-success"
          onClick={() => {
            window.open(link);
          }}
        >
          {name}
          <br /> <Time time={uploaded_at} caption="uploaded at" />
        </Card.Title>
        <Card.Text className="fnt-description mt-3">
          <span style={{ color: "#198754" }}>Description: {description}</span>
          <br />
        </Card.Text>
      </Card.Body>{" "}
      <Card.Footer className="border-0">
        <DeleteBooks id={bookid} link={link} />
      </Card.Footer>
    </Card>
  );
};
const AllBooksByUser = () => {
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("Show Uploaded Books");
  const { data, loading, error } = useQuery(BOOK_HISTORY, {
    variables: { id: localStorage.getItem("id") },
  });
  console.log(data);
  if (loading) return <BoxLoading />;
  if (error) return selectType("error", "please try again");
  return (
    <div className="text-left">
      {" "}
      {console.log(data)}
      <br />
      <br />
      <button
        className="btn btn-outline-success"
        onClick={() => {
          setShow(!show);
          setButtonText(
            buttonText === "Hide Books"
              ? "Show Uploaded Books"
              : "Hide Uploaded Books"
          );
        }}
      >
        {buttonText}
      </button>
      {data.BookLinks_aggregate.nodes.count === 0 ? (
        <div>No books!</div>
      ) : (
        <div className="list-user">
          {data.BookLinks_aggregate.nodes.map(
            (n) =>
              show && (
                <UserBook
                  key={n.id}
                  name={n.name}
                  link={n.link}
                  uploaded_at={n.uploaded_at}
                  bookid={n.id}
                  description={n.description}
                  cat_name={n.category.name}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};
class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowed_books: [],
      show: false,
      buttonText: "Show issued books",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/user/" + this.props.emailHistory)
      .then((res) => {
        this.setState({
          borrowed_books: res.data.data.books,
        });
        console.log(res.data.data.books);
        selectType("success", "your infos");
      })
      .catch((err) => {
        console.log("Error from UserHistory" + err);
      });
  }

  render() {
    const books = this.state.borrowed_books;
    let issuedBookList;

    if (!books) {
      issuedBookList = "there is no record!";
    } else {
      issuedBookList = books.map((book, k) => (
        <HistoryCard book={book} key={k} />
      ));
    }

    return (
      <div className="text-success text-center pt-5">
        <div className="pt-5">
          <button
            className="btn btn-outline-success buttons btn-block"
            onClick={() => {
              this.setState({
                show: !this.state.show,
                buttonText:
                  this.state.buttonText === "Hide issued books"
                    ? "Show issued books"
                    : "Hide issued books",
              });
            }}
          >
            {this.state.buttonText}
          </button>
          {this.state.show && <div className="list">{issuedBookList}</div>}
        </div>

        <AllPostsByUser />
        <AllBooksByUser className="list-user text-center" />
      </div>
    );
  }
}

export default UserHistory;
