const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    login(
    email: String!
    password: String!
    ): String
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      role: Role!
      level: Int
      subject: String
    ): String
  }
`;
