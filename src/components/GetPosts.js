import { useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../database/queries";
import { PutComments, TypeComment } from "./PutComments";
import React, { useState } from "react";
import selectType from "./popups";
import Time from "./UuidToTime";
import { EditPost } from "./pages/PutPosts";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import "../styles/Fonts.css";
import "../styles/Sidebar.css";
import { Button } from "react-bootstrap";
import { DeletePosts } from "./Delete";

//show posts
export const Post = ({
  author,
  message,
  created_at,
  registration,
  editid,
  loggedid,
  postid,
}) => {
  const showEditButton = editid === loggedid ? true : false;

  const [editBox, setEditBox] = useState(false);
  const [tool, setTool] = useState("Click here to edit");
  const caption = "Published at: ";
  return (
    <div className="bg-success2 p-3 text-start" style={{ width: "100%" }}>
      {console.log(`post author ${registration}`)}
      <div className="user-info float-container">
        <h3
          className="float-child2 text-capitalize fnt-poster"
          data-toggle="tooltip"
          data-placement="top"
          title={registration}
        >
          {author}{" "}
        </h3>
        <Time
          time={created_at}
          caption={caption}
          className="text-muted float-child2"
        />
        {showEditButton && (
          <div className="float-child1 float-container">
            <DeletePosts postid={postid} />
            <Button
              className="btn btn-success float-child1 mx-1"
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
            </Button>
          </div>
        )}
      </div>
      <br />
      {!editBox && (
        <p className="text-capitalize fnt text-bold p-3">{message}</p>
      )}
      {editBox && <EditPost messageBefore={message} postid={postid} />}
    </div>
  );
};
//fetch posts
const GetPosts = ({ commenter_id }) => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS_QUERY);
  if (loading) return <BoxLoading />;

  if (error) return selectType("error", "please try again");
  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      {/* jokhon chobi up dite hobe post hishabe */}
      {/* <img
          src="https://via.placeholder.com/400x150/FFB6C1/000000"
          className="img-responsive post-image"
        /> */}
      <div className="container content">
        {data.posts.length === 0 ? (
          <div>no posts, sorry</div>
        ) : (
          data.posts.map((p) => (
            <div className="mt-2 justify-content-start mb-3 card">
              <div className="post-text">
                <Post
                  key={p.id}
                  author={p.author.name}
                  editid={p.author.id}
                  registration={p.author.registration}
                  message={p.message}
                  created_at={p.created_at}
                  loggedid={commenter_id}
                  postid={p.id}
                />
                <TypeComment
                  key={p.id}
                  post={p}
                  refetch={refetch}
                  commenter_id={commenter_id}
                />

                <PutComments
                  key={p.id}
                  post={p}
                  refetch={refetch}
                  commenter_id={commenter_id}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default GetPosts;
