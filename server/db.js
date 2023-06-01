const { connect, connection } = require('mongoose');
require('dotenv').config();
async function connectToDatabase() {
  try {
    await connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}
function getDatabase() {
  return connection.db;
}
module.exports = { connectToDatabase, getDatabase };