import apolloServerExpress from "apollo-server-express";

const { gql } = apolloServerExpress;

const typeDefs = gql`

  type User {
    _id: ID!,
    name: String!,
    email: String!,
    password: String!,
    salt: String!,
    date: String!,
    role: String!
  }

  input UserInput {
    name: String!,
    email: String!,
    password: String!,
    role: String
  }

  type ErrorResponse {
    type: String!, 
    message: String!
  }

  type UserOutput {
    user: User,
    errors: [ErrorResponse!]
  }

  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    authenticate(email: String!, password: String!): UserOutput!
    createUser(user: UserInput!): UserOutput!
  }
`;

export default typeDefs;
