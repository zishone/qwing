import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(username: String!, password: String!, client: String!): User
  }

  type Query{
    user: User
  }

  type User {
    username: String
    email: String
    client: String
    jwt: String
  }
`;

export { typeDefs };
