/* eslint-disable indent */
'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const data = require('./moviedata');

const app = express();
app.use(morgan('dev'));

app.use(function validateBearerToken(req,res,next){
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization')
    if (!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({ error: 'Unauthorized request' });
    }
    next();
});

function handleGetMovie (req,res){
    const {genre, country, avg_vote} = req.query;

    res.json(data);
}

app.get('/movie', handleGetMovie);

const PORT = 8000;

app.listen(PORT,()=> {
    console.log(`Server is runing at: ${PORT}`);
});
