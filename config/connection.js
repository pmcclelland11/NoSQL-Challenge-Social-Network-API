const { connect } = require('mongoose');

const connectToDatabase = () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB';
  connect(connectionString);
};

module.exports = connectToDatabase;