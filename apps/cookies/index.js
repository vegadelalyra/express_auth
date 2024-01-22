const express = require('express');
const cookieParser = require('cookie-parser');

const cookiesApp = express();
cookiesApp.use(cookieParser());

cookiesApp.get('/', (req, res) => {
    res.send('Welcome to the homepage via cookies!');
});

cookiesApp.get('/login', (req, res) => {
    // Simulate user login
    res.cookie('user', 'cookiesUser');
    res.send('Logged in successfully via cookies!');
});

cookiesApp.get('/dashboard', (req, res) => {
    const user = req.cookies.user;

    if (user) {
        res.send(`Welcome to the dashboard via cookies, ${user}!`);
    } else {
        res.send('Unauthorized. Please log in first.');
    }
});

module.exports = cookiesApp;
