import apolloServerExpress from "apollo-server-express";

const { gql } = apolloServerExpress;

const typeDefs = gql`
  """
  Blog Schema
  Contains CRUD Operations schemas & types
  """
  type Blog {
    _id: ID!
    topic: String!
    details: String!
    date: String!
    createdBy: String!
  }

  input BlogInput {
    topic: String!
    details: String!
    createdBy: String!
  }

  type BlogResponse implements Response {
    blog: Blog

    success: Boolean!
    errors: [ResponseMessage]
  }

  type BlogListResponse implements Response {
    blogs: [Blog!]!

    success: Boolean!
    errors: [ResponseMessage]
  }

  type BlogDeleteResponse implements Response {
    success: Boolean!
    errors: [ResponseMessage]
  }

  extend type Query {
    blogs: BlogListResponse!
    blog(id: String!): BlogResponse!
  }

  extend type Mutation {
    createBlog(blog: BlogInput!): BlogResponse!
    updateBlog(id: String!, blog: BlogInput!): BlogResponse!
    deleteBlog(id: String!): BlogDeleteResponse!
  }
`;

export default typeDefs;
