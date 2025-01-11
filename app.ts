import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import indexRouter from './routes/index';
import postRouter from './routes/post_routes';
import commentRouter from './routes/comment_routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
    console.log(`Post and comment app listening to port ${port}`);
});