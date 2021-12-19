const { ApolloClient, InMemoryCache, HttpLink } = require("@apollo/client");
const fetch = require("cross-fetch");

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://hasura-reddit.herokuapp.com/v1/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});

module.exports = client;
