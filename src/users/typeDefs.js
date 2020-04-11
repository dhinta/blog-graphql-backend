import apolloServerExpress from "apollo-server-express";

const { gql } = apolloServerExpress;

const typeDefs = gql`

  type User {
    _id: ID!,
    name: String!,
    email: String!,
    password: String!,
    date: String!,
    role: String!
  }

  input UserInput {
    name: String!,
    email: String!,
    password: String!
  }

  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    createUser(user: UserInput!): User
  }
`;

export default typeDefs;
