const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const videoRouter = require('./routes/videos');
const commentRouter = require('./routes/comments');
const errorHandler = require('./error');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser());
app.use(express.json());
//ROUTE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/video', videoRouter);
app.use('/api/v1/comment', commentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  connect();
  console.log(`Listening on port ${PORT}`);
});
