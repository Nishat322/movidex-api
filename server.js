/* eslint-disable indent */
'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const data = require('./moviedata.json');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());



app.use(function validateBearerToken(req,res,next){
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
    if (!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({ error: 'Unauthorized request' });
    }
    next();
});

function handleGetMovie (req,res){
    const {genre, country, avg_vote} = req.query;
    let filterData = data;

    if(genre){
        filterData = filterData.filter(movie =>
            movie.genre.toLowerCase().includes(genre.toLowerCase())
        );
    }

    if(country){
        filterData = filterData.filter(movie => 
            movie.country.toLowerCase().includes(country.toLowerCase())
        );
    }

    if(avg_vote){
        filterData = filterData.filter(movie => 
            Number(movie.avg_vote) >= Number(req.query.avg_vote)
        );
    }

    res.json(filterData);
}

app.get('/movie', handleGetMovie);

const PORT = 8000;

app.listen(PORT,()=> {
    console.log(`Server is runing at: ${PORT}`);
});
