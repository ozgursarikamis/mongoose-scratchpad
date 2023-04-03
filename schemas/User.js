const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: {
        city: String,
        country: String,
        postCode: String
    }
}); 

module.exports = mongoose.model('User', userSchema); // User collection with userSchema.
