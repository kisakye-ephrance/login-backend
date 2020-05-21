const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//middleware is a function that takes in three items,
const auth = (req, res, next) => {
   const token = req.header("Authorization").replace("Bearer ", "");
   const data = jwt.verify(token, "thelordoftheskies");
   console.log(data);
};

module.exports = auth;