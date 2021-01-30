/* eslint-disable indent */
'use strict';
const express = require('express');
const morgan = require('morgan');
const data = require('./moviedata');

const app = express();
app.use(morgan('dev'));

function handleGetMovie (req,res){
    res.json(data);
}

app.get('/movie', handleGetMovie);

const PORT = 8000;

app.listen(PORT,()=> {
    console.log(`Server is runing at: ${PORT}`);
});
