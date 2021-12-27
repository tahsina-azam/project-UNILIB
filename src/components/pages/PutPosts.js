import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../../database/queries";
import { POST_POST } from "../../database/Mutations";
import "../../styles/Sidebar.css";
import { useState } from "react";
import Sidebar from "../Sidebar";
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
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
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
        <Sidebar />
      </Col>
      <Col className="col-sm-100 content">
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            className="form-control"
            placeholder="write something..."
            onChange={(e) => {
              setShowWarning("");
            }}
          ></textarea>
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
export default TypePost;
