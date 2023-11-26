const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a') 
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema] // This indicates an array of reactionSchema subdocuments
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;