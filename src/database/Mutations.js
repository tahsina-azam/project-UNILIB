import gql from "graphql-tag";

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
