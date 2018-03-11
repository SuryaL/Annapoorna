const express = require('express');
const app = express();
const config = require('./config');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');


// static folder
app.use(express.static('public'));

// Examples ////
/**
 * https://codesandbox.io/s/jvlrl98xw3
 * https://github.com/codediger/graphql-mutation-example
 */


// /* Here a simple schema is constructed using the GraphQL schema language. 
//    More information can be found in the GraphQL spec release */
// let schema = buildSchema(`
//   type Query {
//     postTitle: String,
//     blogTitle: String
//   }
// `);

// // Root provides a resolver function for each API endpoint
// let root = {
//   postTitle: () => 'Build a Simple GraphQL Server With Express and NodeJS',
//   blogTitle: () => 'scotch.io'
// };

// app.use('/', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true//Set to false if you don't want graphiql enabled
// }));




app.listen(config.port, _ => console.log(`Listening on ${config.port}`))