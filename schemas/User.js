const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    postCode: String
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema
}); 

module.exports = mongoose.model('User', userSchema); // User collection with userSchema.
