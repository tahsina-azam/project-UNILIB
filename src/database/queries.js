import gql from "graphql-tag";
export const GET_POSTS_QUERY = gql`
  query MyQuery {
    posts {
      comments {
        commenter {
          name
          registration
        }
        reply
        commented_at
        id
      }
      author {
        name
        registration
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
      description
      category {
        name
      }
      uploader {
        name
      }
      uploaded_at
    }
  }
`;
export const SEARCH_USER = gql`
  query MyQuery($text1: String, $text2: String) {
    posts(
      where: {
        message: { _ilike: $text1 }
        _or: { author: { name: { _gt: $text2 } } }
      }
    ) {
      id
      author {
        name
        registration
      }
      comments {
        commenter {
          name
          registration
        }
        reply
        commented_at
        id
      }
      message
      created_at
    }
  }
`;
export const SEARCH_BOOKS = gql`
  query MyQuery($name: String) {
    BookLinks(
      where: {
        name: { _ilike: $name }
        _or: { uploader: { name: { _ilike: $name } } }
      }
    ) {
      name
      link
      description
      uploaded_at
      uploader {
        name
      }
    }
  }
`;
