const { connect } = require('mongoose');

const connectToDatabase = () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';
  connect(connectionString);
};

module.exports = connectToDatabase;