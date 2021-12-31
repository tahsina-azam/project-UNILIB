import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
import HistoryCard from "./HistoryCard";
import "../../styles/Fonts.css";
import selectType from "../popups";
import { USER_HISTORY } from "../../database/queries";
import { useQuery } from "@apollo/client";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import Time from "../UuidToTime";
import { Button } from "react-bootstrap";
import DeletePosts from "../DeletePosts";
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
            to="/forum/writepost"
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
  if (loading) return <BoxLoading />;
  if (error) return selectType("error", "please try again");
  return (
    <div className="text-left">
      {" "}
      {console.log(data.posts_aggregate)}
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
class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowed_books: [],
      show: false,
      buttonText: "show books",
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
      <>
        <div className="text-success text-center">
          <div>
            <button
              className="btn btn-outline-success buttons btn-block"
              onClick={() => {
                this.setState({
                  show: !this.state.show,
                  buttonText:
                    this.state.buttonText === "Hide Books"
                      ? "Show Books"
                      : "Hide Books",
                });
              }}
            >
              {this.state.buttonText}
            </button>
            {this.state.show && <div className="list">{issuedBookList}</div>}
          </div>

          <AllPostsByUser />
        </div>
      </>
    );
  }
}

export default UserHistory;
