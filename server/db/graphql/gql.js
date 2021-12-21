const { gql } = require("@apollo/client");

const INSERT_USER = gql`
  mutation MyMutation(
    $department: String
    $email: String
    $session: String
    $name: String
    $registration: bigint
  ) {
    insert_users(
      objects: {
        department: $department
        email: $email
        name: $name
        registration: $registration
        session: $session
      }
    ) {
      returning {
        id
      }
    }
  }
`;
module.exports = {
  INSERT_USER,
};
