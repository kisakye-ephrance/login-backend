const mongoose = require("mongoose");

//use mongoose to connect to the database
//url for localhost db,
const url = "mongodb://localhost:27017/authdata"
mongoose.connect(url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//checking if there is an established connection to the database
const db = mongoose.connection;
if (db) {
    console.log("successfully connected to the database");
} else {
    console.log(
        "could not connect to database. check your connection string"
    );
}