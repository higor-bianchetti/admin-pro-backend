require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Creating express server
const app = express();

// CORS Configuration
app.use(cors());

// To read and parser body
app.use(express.json());

// Database
dbConnection();

// Public directories - To test google authentication
// app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});
