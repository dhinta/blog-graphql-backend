import apolloServerExpress from "apollo-server-express";

const { gql } = apolloServerExpress;

const typeDefs = gql`

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    salt: String!
    date: String!
    role: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    role: String
  }

  type UserResponse implements Response {
    user: User,

    success: Boolean!
    messages: [ResponseMessage]
  }

  type AuthenticationResponse implements Response {
    token: String!
    success: Boolean!
    messages: [ResponseMessage]
  }

  extend type Query {
    """ users: UserResponse! """
    user(id: String!): UserResponse!
  }

  extend type Mutation {
    authenticate(email: String!, password: String!): AuthenticationResponse!
    createUser(user: UserInput!): UserResponse!
  }
`;

export default typeDefs;
