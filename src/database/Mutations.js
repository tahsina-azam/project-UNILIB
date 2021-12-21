import gql from "graphql-tag";

export const INSERT_BOOK = gql`
  mutation MyMutation($category_id: uuid, $link: String!, $name: String!) {
    insert_BookLinks_one(
      object: {
        category_id: $category_id
        link: $link
        name: $name
        uploader_id: "d9a9427d-d40a-4796-bf63-926aa74c4972"
      }
    ) {
      id
    }
  }
`;
export const POST_COMMENT = gql`
  mutation MyMutation2($post_id: uuid!, $reply: String!) {
    insert_comments(
      objects: {
        post_id: $post_id
        commenter_id: "d9a9427d-d40a-4796-bf63-926aa74c4972"
        reply: $reply
      }
    ) {
      returning {
        id
      }
    }
  }
`;
export const POST_POST = gql`
  mutation MyMutation($message: String!) {
    insert_posts_one(
      object: {
        author_id: "d9a9427d-d40a-4796-bf63-926aa74c4972"
        message: $message
      }
    ) {
      id
    }
  }
`;
