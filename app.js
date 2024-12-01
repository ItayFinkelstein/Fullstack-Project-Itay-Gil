const express = require('express');
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.port;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const postRouter = require('./routes/post_routes');
app.use('/post', postRouter);

const commentRouter = require('./routes/comment_routes');
app.use('/comments', commentRouter);

app.listen(port, () => {
    console.log(`Post and comment app listening to port ${port}`);
})