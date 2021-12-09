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
export const GET_CATAGORIES_QUERY = gql`
  query MyQuery {
    categories(order_by: { name: asc }) {
      name
      id
    }
  }
`;
export const GET_BOOK_LIST_QUERY = gql`
  query MyQuery {
    BookLinks {
      id
      name
      link
    }
  }
`;
