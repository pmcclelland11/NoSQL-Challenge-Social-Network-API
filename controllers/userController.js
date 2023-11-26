const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// Get a single user
async function getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' });
    }

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Add a thought to a user
async function addThought(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body.id } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Remove thought from a user (Note: Actual thought deletion will be handled in thoughtController)
async function removeThought(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thoughts: req.params.thoughtId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(50    ).json(err);
  }
}

// Add a friend to a user's friend list
async function addFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Remove a friend from a user's friend list
async function removeFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
// Update a user's information
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
  addFriend,
  removeFriend,
  updateUser
};
0