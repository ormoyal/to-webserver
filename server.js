"use strict";
const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `Request At: ${now},\nAction: ${req.method}, Url: ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err) => {
       if(err) console.log(err);
    });
    next();
});

// app.use((req,res,next) => { 
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentTime', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream-it', (text) => {
    return text.toUpperCase();
})

app.get('/bad', (req,res) => {
    res.send({
        err: 'error handling request'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle:'about You',
    });
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'About Page',
        welcomeMsg:'Welcome To Homepage'
    });
})

app.listen(3000, () => {
    console.log('server is up on port 3000'); 
});
