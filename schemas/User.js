const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    postCode: String
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: Date,
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema
});

module.exports = mongoose.model('User', userSchema); // User collection with userSchema.
