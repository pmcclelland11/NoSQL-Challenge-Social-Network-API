const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB');

const seedDatabase = async () => {
  try {
    // Seed users
    const users = await User.create([
      { username: 'JohnDoe', email: 'john@gmail.com' },
      { username: 'PatrickMac', email: 'patrick@gmail.com' },
      { username: 'TomArnold', email: 'tom@gmail.com' },
      { username: 'BruceWillis', email: 'bruce@gmail.com' },
      { username: 'CharlieBrown', email: 'charlie@gmail.com' },
    ]);

    // Seed thoughts
    const thoughts = await Thought.create([
      { thoughtText: 'Just discovered a new coding technique!', username: users[0].username },
      { thoughtText: 'Cant wait to graduate my bootcamp!', username: users[1].username },
      { thoughtText: 'Completed a challenging algorithm problem!', username: users[2].username },
      { thoughtText: 'Reflecting on the importance of clean code.', username: users[3].username },
      { thoughtText: 'Good Grief!', username: users[4].username },
    ]);
    
    // Seed reactions
    await Thought.findByIdAndUpdate(
      thoughts[0]._id,
      { $push: { reactions: { reactionBody: 'That sounds awesome! Keep up the good work!', username: users[1].username } } },
      { new: true }
    );

    await Thought.findByIdAndUpdate(
      thoughts[1]._id,
      { $push: { reactions: { reactionBody: 'Congradulations Patrick!', username: users[2].username } } },
      { new: true }
    );

    await Thought.findByIdAndUpdate(
      thoughts[2]._id,
      { $push: { reactions: { reactionBody: 'Great job! Hopefully that will better prepare you for your next technical interview!', username: users[3].username } } },
      { new: true }
    );

    await Thought.findByIdAndUpdate(
      thoughts[3]._id,
      { $push: { reactions: { reactionBody: 'Clean code is crucial for maintainability!', username: users[4].username } } },
      { new: true }
    );

    await Thought.findByIdAndUpdate(
      thoughts[4]._id,
      { $push: { reactions: { reactionBody: 'Classic Charlie!', username: users[0].username } } },
      { new: true }
    );

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
  }
};

// Run the seed function
seedDatabase();
