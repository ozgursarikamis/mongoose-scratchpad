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
        ref: 'Person'
    },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    updatedAt: {
        type: Date
    },
});

storySchema.methods.sayHi = function() {
    console.log("====================================");
    console.log('Hi');
    console.log("====================================");
}

storySchema.statics.findByName = function(name) {
    return this.where({ title: new RegExp(name, 'i') });
}

storySchema.virtual('titleAuthor').get(function() {
    return `${this.title} <${this.id}>`;
});

// MIDDLEWARES:
storySchema.pre('save', function(next) {
    console.log("====================================");
    console.log('MIDDLEWARE: Pre save');
    console.log("====================================");
    this.updatedAt = Date.now();
    next();
});

storySchema.post('save', function(doc, next) {
    console.log("====================================");
    console.log('MIDDLEWARE: Post save');
    console.log("====================================");
    next();
})

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
    // console.log('Author saved', savedAuthor);

    const story1 = new Story({
        title: 'Casino Royale',
        author: savedAuthor._id    // assign the _id from the person
    });
    // story1.sayHi();
    
    // console.log("====================================");
    // const storyWithCustomMethod = await Story.findByName('Casino');
    // console.log('storyWithCustomMetgod', storyWithCustomMethod);
    // console.log("====================================");

    const savedStory = await story1.save();
    console.log('Story saved', savedStory);

    console.log("====================================");
    const storyWithVirtual = await Story.findOne({ title: 'Casino Royale' });
    // console.log('storyWithVirtual', storyWithVirtual);
    // console.log('storyWithVirtual.titleAuthor === ', storyWithVirtual.titleAuthor);
    // const wholeStory = await Story
    //     .findOne({ title: 'Casino Royale' })
    //     .populate('author', 'name').exec(); // just populate the name

    //     console.log('Whole story', wholeStory);
    //     console.log('Author', wholeStory.author.name);
}