// 3rd party libraries
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

// Local components
const schema = require('./schema/schema');

const app = express();

// Allow cross origin requests
app.use(cors());

// Connect to the MongoDB Atlas database
const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USER}` + 
    `:${process.env.DB_PASS}@cluster0-8vewa.mongodb.net/book-manager`;
mongoose.connect(
    DB_CONNECTION_STRING,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    (err) => {
        if(err) {
            console.log("error occured while connecting to database");
            // console.log(err);
        }
    });
mongoose.connection.once("open", () => {
    console.log("connected to mongodb database");
});

// Forward API requests to GraphQLHTTP middleware
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

// Listen for a connection
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});