import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Card } from "react-bootstrap";

const Post = ({ author, message }) => {
  return (
    <Card className="text-center border mx-1 my-2">
      <Card.Header>{author}</Card.Header>
      <Card.Body>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
};
const GET_POSTS_QUERY = gql`
  query MyQuery {
    posts {
      message
      id
      author {
        name
        id
      }
      created_at
    }
  }
`;

function Forum() {
  const { data, loading, error } = useSubscription(GET_POSTS_QUERY);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <>
      {data.posts.length === 0 ? (
        <div>no posts, sorry</div>
      ) : (
        data.posts.map((p) => (
          <>
            <></>
            <Post key={p.id} author={p.author.name} message={p.message} />
          </>
        ))
      )}
    </>
  );
}

export default Forum;
