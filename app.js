const express = require('express');
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.port;

const indexRouter = require('./routes/index')
app.use('/', indexRouter);

const postRouter = require('./routes/post_routes')
app.use('/post', postRouter);

app.listen(port, () => {
    console.log('Post and comment app listening to port ${port}');
})