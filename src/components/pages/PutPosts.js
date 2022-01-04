import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../../database/queries";
import { EDIT_POST, POST_POST } from "../../database/Mutations";
import "../../styles/Sidebar.css";
import { useState } from "react";
import Sidebar from "../Sidebar";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import selectType from "../popups";
import { Col, Row } from "react-bootstrap";
//type post insert
function TypePost() {
  const author_id = localStorage.getItem("id"); //hasura_id
  console.log(author_id);
  console.log(typeof author_id);
  const { refetch } = useQuery(GET_POSTS_QUERY);
  const [showWarning, setShowWarning] = useState("");
  const [postPost, { error, loading }] = useMutation(POST_POST);
  if (loading) return <BoxLoading />;
  if (error) selectType("error", "please try again");
  const onSubmit = (e) => {
    setShowWarning("");
    e.preventDefault();
    const message = e.target[0].value;
    if (e.target[0].value !== "") {
      postPost({
        variables: {
          message: message,
          author_id: author_id,
        },
      });
      refetch();
      selectType("success", "post");
    } else {
      setShowWarning("write something to post");
    }
    e.target[0].value = "";
  };
  return (
    <Row>
      <Col className="col-sm-2 m-0 p-0 sidebar">
        <Sidebar type={"1"} />
      </Col>
      <Col className="col-sm-100 content mt-5">
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            className="form-control mt-5"
            placeholder="write something..."
            onChange={(e) => {
              setShowWarning("");
            }}
          />
          <div style={{ color: "red", fontSize: "12px" }} className="ml-auto">
            {showWarning}
          </div>
          <button
            className="btn btn-success mt-2 ml-auto"
            style={{ width: "auto", height: "auto" }}
            type="submit"
          >
            Post now
          </button>
        </form>
      </Col>
    </Row>
  );
}
export function EditPost({ messageBefore, postid }) {
  const [showWarning, setShowWarning] = useState("");
  const [showForm, setshowForm] = useState(true);
  const [postPost, { error, loading }] = useMutation(EDIT_POST);
  if (loading) return <BoxLoading />;
  if (error) selectType("error", "please try again");
  const onSubmit = (e) => {
    setShowWarning("");
    const message = e.target[0].value;
    if (e.target[0].value !== "") {
      postPost({
        variables: {
          message: message,
          id: postid,
        },
      }).then(window.location.reload());
      setshowForm(false);
      selectType("success", "post");
    } else {
      return setShowWarning("write something to post");
    }
    e.target[0].value = "";
  };
  return (
    <div>
      {showForm && (
        <form onSubmit={onSubmit} className="m-2">
          <textarea
            type="text"
            className="form-control"
            defaultValue={messageBefore}
            onChange={(e) => {
              setShowWarning("");
              // setVal(e.target[0].value);
            }}
          />
          <div style={{ color: "red", fontSize: "12px" }} className="ml-auto">
            {showWarning}
          </div>
          <button
            className="btn btn-success mt-2 ml-auto"
            style={{ width: "auto", height: "auto" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
export default TypePost;
