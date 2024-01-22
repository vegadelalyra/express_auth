const express = require('express');
const session = require('express-session');

const sessionsApp = express();
sessionsApp.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

sessionsApp.get('/', (req, res) => {
    res.send('Welcome to the homepage via sessions!');
});

sessionsApp.get('/login', (req, res) => {
    // Simulate user login
    req.session.user = {
        id: 1,
        username: 'sessionUser',
    };
    res.send('Logged in successfully via sessions!');
});

sessionsApp.get('/dashboard', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.send(`Welcome to the dashboard via sessions, ${user.username}`);
    } else {
        res.send('Unauthorized. Please log in first.');
    }
});

module.exports = sessionsApp;
