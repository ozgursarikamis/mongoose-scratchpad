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
        const user = await User.findById('642b3e6307b74c0fe2004f3a');
        console.log(user);
        console.log("====================================");
        const user2 = await User.find({ name: 'Halime', age: 25 });
        console.log(user2);

        await User.deleteMany({ name: 'Ozgur' })
        .gte('age', 20).where('address.city').eq('London');
    } catch (error) {
        console.log();
        console.log('Error saving user', error.message);
        console.log();
    }
}