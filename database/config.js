require('dotenv').config();

const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('DB Online');
  } catch (error) {
    console.error(error);
    throw new Error(
      'Error to connect the database. Please see logs for more details'
    );
  }
};

module.exports = {
  dbConnection,
};
