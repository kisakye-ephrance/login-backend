//require mongoose
const mongoose = require("mongoose");

//require bcrypt,
const bcrypt = require("bcrypt");

//import the jsonwebtoken,
const jwt = require("jsonwebtoken");



//create a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

//to hash the password,
userSchema.pre("save", async function (next) {
    const user = this;
    if(user.isModified("password")) {
    user.password =  await bcrypt.hash(user.password, 8); //reassign the user password
    }
    next();
});

userSchema.statics.findbyCredentials = async (name, password) => {
    //find a user
    const user = await User.findOne({name}); // use await because the user.findone function is an async fuction
    if (!user) {
        return {error: "invalid login credentials"}
    }
    //if the user is found, compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return {error: "invalid login credentials"}
    }
    return user;
};

//how to create methods that are got drom an instance and not a model,
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    //generate a token so as to enable authentication and moving from one page to another by calling the jwt,
const token = jwt.sign(
    {id: user._id, name: user.name}, 
    "thelordoftheskies"
    ); 
// lord of the skies is the secret key
return token;
};

//create a model
const User = mongoose.model("User", userSchema);

//export the model
module.exports = User;
