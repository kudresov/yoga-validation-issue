import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import express from "express";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello World!",
      },
    },
  }),
});

const server = createServer(yoga);
const app = express();
app.use("/graphql", yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
