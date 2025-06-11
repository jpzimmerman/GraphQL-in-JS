import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

// Resolver functions
const root = {
  hello: () => "Hello world!",
  greeting: ({ name }) => `Evening, ${name}!`,
};

// Define the schema
// export const schema = buildSchema(`
//         type Query {
//             hello: String
//             greeting(name: String): String
//         }
//     `);

// export const schema = makeExecutableSchema({
//   typeDefs,
//   root,
// });

export const schema = loadSchemaSync("./schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const app = express();

// Create GraphQL handler and mount it
app.all("/graphql", createHandler({ schema, rootValue: root }));

const port = 4000;
app.listen(port, () => {
  console.log(`Running GraphQL API server at http://localhost:${port}/graphql`);
});
