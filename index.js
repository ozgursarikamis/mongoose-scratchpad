const mongoose = require('mongoose');
const User = require('./schemas/User');

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

run();

async function run() {
    const user = new User({ name: 'John', age: 20 });
    await user.save();
    // or:
    // await User.create({ name: 'John', age: 20 });
    console.log('User saved', user);
}