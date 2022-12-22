const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'This username is already registered'],
        minLength: [5, 'Usernames should be longer than 5 characters.']
    },
    password: {
        type: String,
        required : true,
    },

},{timestamps:true})

const User = mongoose.model('User', userSchema);

module.exports = User;