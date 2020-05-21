//require express
const express = require("express");

//require the middleware
const auth = require('../middleware/auth');

//import the user model,
const User = require("../models/User");

//create a variable router from express
const router = express.Router();

//create a new user
router.post("/users/create", async (req, res) => {
       const userData = req.body;
       try {
           //to create a new user use the user model,
           const newuser = new User(userData);
           await newuser.save();
           res.status(201).send({message: "user created successfully!", user: newuser});
           
       } catch (error) {
           res.status(400).send({error});
       }
});

//login user
router.post("/users/login", async (req, res) => {
const {name, password} = req.body;
const user = await User.findbyCredentials(name, password);
if (user.error) {
    res.status(400).send({error: user.error})
}
const token = await user.generateAuthToken();
res.status(201).send({message: "logged in successfully!", user, token });
});

//viewing user profile
router.get("/users/profile", auth, async(req, res) => {

});

//export the router so it can be use elsewhere;
module.exports = router;