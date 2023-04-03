const mongoose = require('mongoose');
const User = require('./schemas/User');

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

run();

async function run() {
    try {
        const user = new User({ name: 'John', age: 66 });
        user.name = 'Ozgur'
        user.email = 'OZGUR@'
        user.hobbies = ['Reading', 'Writing', 'Coding'];
        user.address = {
            city: 'London',
            country: 'United Kingdom',
            postCode: 'W1 1AA'
        };
        user.bestFriend = '5e9b1b5b1c9d440000a1e1b1';
        user.createdAt = new Date();
        await user.save();
        // or:
        // await User.create({ name: 'John', age: 20 });
        console.log('User saved', user);
    } catch (error) {
        console.log();
        console.log('Error saving user', error.message);
        console.log();
    }
}