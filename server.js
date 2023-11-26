const express = require('express');
const connectToDatabase = require('./config/connection');
const userRoutes = require('./routes/api/userRoutes.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDatabase();

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
