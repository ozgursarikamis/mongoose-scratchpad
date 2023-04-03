const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        // ref: 'Person'
    },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

run();

async function run() {
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
      });
      
    const savedAuthor = await Person.create(author);
    console.log('Author saved', savedAuthor);

    const story1 = new Story({
        title: 'Casino Royale',
        author: savedAuthor._id    // assign the _id from the person
    });
    const savedStory = await story1.save();
    console.log('Story saved', savedStory);
}