const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log('Connect to MongoDB');
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(PORT, () => {
  connect();
  console.log(`Listening on port ${PORT}`);
});
