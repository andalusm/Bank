const mongoose = require('mongoose')
const Schema = mongoose.Schema
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'last Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last Name is required']
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        match: [emailRegex, 'Please provide a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
    },
    balance:{
        type: Number,
        default: 0
    }
});
const User = mongoose.model("user", userSchema)
module.exports = User