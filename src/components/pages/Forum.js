import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import "../../styles/Fonts.css";
import "../../styles/Forum.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
const Post = ({ author, message, created_at }) => {
  const date = new Date(created_at);
  const print_time =
    "Published at: " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    "  " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return (
    <div>
      <div className="text-capitalize fnt-calistoga text-bold">
        <span>{author}</span>
        <sub className="show_time mx-2">{print_time}</sub>
        <p className="fnt paddin">{message}</p>
      </div>
    </div>
  );
};
const Comment = ({ replier, reply }) => {
  return (
    <div className="mb-3">
      <h5 className="text-capitalize">{replier}</h5>
      <p className="fw-light fnt">{reply}</p>
    </div>
  );
};
const GET_POSTS_QUERY = gql`
  query MyQuery {
    posts {
      comments {
        commenter {
          name
        }
        reply
        commented_at
      }
      author {
        name
      }
      message
      id
      created_at
    }
  }
`;

function Forum() {
  const { data, loading, error } = useQuery(GET_POSTS_QUERY);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  const get_comments = (post) => {
    if (post.comments.length === 0) {
      return <div className="fw-light fnt text-muted">no comments</div>;
    } else
      return post.comments.map((c) => (
        <Comment
          key={c.id}
          reply={c.reply}
          replier={c.commenter.name}
        ></Comment>
      ));
  };
  return (
    <div className="container-fluid">
      {data.posts.length === 0 ? (
        <div>no posts, sorry</div>
      ) : (
        data.posts.map((p) => (
          <div className="d-flex flex-row mt-2 justify-content-start mb-3">
            <img src="/images/profile-user.png" className="icon" alt="" />
            <div className="">
              <Post
                key={p.id}
                author={p.author.name}
                message={p.message}
                created_at={p.created_at}
              />
              <div className="borderrr border-dark p-2">{get_comments(p)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Forum;
