import { useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../database/queries";
import { PutComments, TypeComment } from "./PutComments";
import { Accordion } from "react-bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import Time from "./UuidToTime";
// import "../styles/post.css";
import "../styles/Fonts.css";
import "../styles/Sidebar.css";
//show posts
const Post = ({ author, message, created_at }) => {
  const caption = "Published at: ";
  return (
    <div className="bg-success2 p-3" style={{ width: "100%" }}>
      <div className="user-info flex-row">
        {/* <img
          src="https://bootdey.com/img/Content/avatar/avatar6.png"
          alt="user"
          className="profile-photo pull-left "
        /> */}
        <h3 className="text-capitalize fnt-poster col-lg-10">{author} </h3>
        <Time time={created_at} caption={caption} className="text-muted" />
      </div>

      <p className="text-capitalize fnt text-bold p-3">{message}</p>
    </div>
  );
};
//fetch posts
const GetPosts = ({ commenter_id }) => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS_QUERY);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
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
                  message={p.message}
                  created_at={p.created_at}
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
