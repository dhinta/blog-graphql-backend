import express from "express";
import mongoose from "mongoose";
import apolloServerExpress from "apollo-server-express";

import User from "./src/app/users/index.js";
import Blog from "./src/app/blogs/index.js";

const { ApolloServer, gql } = apolloServerExpress;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  type Query
  type Mutation

  enum AllowedResponseMessageType {
    ERROR,
    SUCCESS
  }

  interface Response {
    success: Boolean!
    messages: [ResponseMessage]
  }

  type ResponseMessage {
    type: AllowedResponseMessageType!
    message: String!
  }
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, User.typeDefs, Blog.typeDefs],
  resolvers: [User.resolvers, Blog.resolvers],
});

const app = express();
server.applyMiddleware({ app });

app.get("/", (req, res) => res.status(401).end());
app.get("/api", (req, res) =>
  res.send({
    data: "REST service end-point",
  })
);

const run = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    app.listen({ port: process.env.PORT || 3000 }, () =>
      console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
    );
  } catch (e) {
    console.log(e);
  }
};

run();
