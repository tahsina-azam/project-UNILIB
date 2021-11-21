import gql from "graphql-tag";
export const GET_POSTS_QUERY = gql`
  query MyQuery {
    posts {
      comments {
        commenter {
          name
        }
        reply
        commented_at
        id
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
