// 3rd party libraries
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Local components
const schema = require('./schema/schema');

const app = express();

// Allow cross origin requests
app.use(cors());

// Connect to the MongoDB Atlas database
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
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

    // Listen for a connection
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server is up & running on port ${port}`);
    });
});

// Serve static files for React client\
app.use(express.static(path.join(__dirname, "/client/build")));

// Forward API requests to GraphQLHTTP middleware
app.use("/graphql", graphqlHTTP({ schema }));

// Forward any other API requests to React client
// Production mode
if(process.env.NODE_ENV === 'production') {
    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "/client/build/index.html"));
    });
} else {
    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "/client/public/index.html"));
    });
}
