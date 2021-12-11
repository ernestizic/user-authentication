const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, "Firstname is required"],
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "Lastname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

})

module.exports = mongoose.model("User", UserSchema)