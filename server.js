/* eslint-disable indent */
'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use((req, res) => {
    res.send('Hello, world!');
});

app.get('movie', (req,res) => {

});

const PORT = 8000;

app.listen(PORT,()=> {
    console.log(`Server is runing at: ${PORT}`);
});
