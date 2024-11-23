const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.port;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log('Post and comment app listening to port ${port}');
})