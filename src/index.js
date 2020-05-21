//this is the entry point of the server
//require express
const express = require("express");

//to cater for the cors error
const cors = require("cors");

//to connect the router to index.js
const userRouter = require("./routes/userRouter");

//require the database file,
require("./config/database");


//create a port
const port = process.env.PORT || 5000;

//intialise the express server
const app = express();

//to send the data in json format,
app.use(express.json());
app.use(userRouter);
app.use(cors()); //catered for cross origin resource sharing error

//add the first end point 
app.get("/", (req, res) => {
    res.status(200).send ({message: "welcome to my hackathon api"})
});

app.listen(port, () => {
    console.log('server running on port 5000');
});