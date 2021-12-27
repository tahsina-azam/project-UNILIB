import gql from "graphql-tag";

export const INSERT_BOOK = gql`
  mutation MyMutation(
    $category_id: uuid
    $link: String!
    $name: String!
    $description: String
  ) {
    insert_BookLinks_one(
      object: {
        category_id: $category_id
        link: $link
        name: $name
        uploader_id: "d9a9427d-d40a-4796-bf63-926aa74c4972"
        description: $description
      }
    ) {
      id
    }
  }
`;
export const POST_COMMENT = gql`
  mutation MyMutation2($post_id: uuid!, $reply: String!, $commenter_id: uuid) {
    insert_comments(
      objects: { post_id: $post_id, commenter_id: $commenter_id, reply: $reply }
    ) {
      returning {
        id
      }
    }
  }
`;
export const POST_POST = gql`
  mutation MyMutation($message: String!, $author_id: uuid) {
    insert_posts_one(object: { author_id: $author_id, message: $message }) {
      id
    }
  }
`;
