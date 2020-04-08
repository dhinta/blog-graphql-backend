import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import graphql from "graphql";
import mongoose from "mongoose";

const app = express();
const { buildSchema } = graphql;
app.use(bodyParser.json());

app.get("/", (req, res) => res.status(401).end())

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is up & running")
);
