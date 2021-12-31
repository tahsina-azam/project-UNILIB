import gql from "graphql-tag";

export const INSERT_BOOK = gql`
  mutation MyMutation(
    $category_id: uuid!
    $link: String!
    $name: String!
    $description: String
    $uploader_id: uuid
  ) {
    insert_BookLinks_one(
      object: {
        category_id: $category_id
        link: $link
        name: $name
        uploader_id: $uploader_id
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
export const EDIT_POST = gql`
  mutation MyMutation($id: uuid!, $message: String!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: { message: $message }) {
      id
    }
  }
`;
export const DELETE_POST = gql`
  mutation MyMutation($id: uuid!) {
    delete_posts_by_pk(id: $id) {
      message
    }
  }
`;
export const DELETE_BOOK = gql`
  mutation MyMutation($id: uuid!, $link: String!) {
    delete_BookLinks_by_pk(id: $id, link: $link) {
      name
    }
  }
`;
