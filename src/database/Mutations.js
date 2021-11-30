import gql from "graphql-tag";

export const INSERT_BOOK = gql`
  mutation MyMutation($category_id: uuid, $link: String!, $name: String) {
    insert_BookLinks_one(
      object: {
        category_id: "0b1666c9-cd69-444f-bbf4-7453db836e5d"
        link: $link
        name: "owishi"
        uploader_id: "aff58d89-41c6-46d8-82a5-85590c106129"
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
        commenter_id: "aff58d89-41c6-46d8-82a5-85590c106129"
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
        author_id: "aff58d89-41c6-46d8-82a5-85590c106129"
        message: $message
      }
    ) {
      id
    }
  }
`;
