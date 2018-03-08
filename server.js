"use strict";
const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
console.log(port);

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

app.use((req,res,next) => { 
    // res.render('maintenance.hbs');
    next();
});

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
        pageTitle:'About You',
    });
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg:'Welcome To Homepage'
    });
})

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        pageTitle:' Projects Page!'
    });
});

app.listen(port, () => {
    console.log(`server is up on port: ${port}`); 
});
