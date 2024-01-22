const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const redisClient = createClient({
    host: '127.0.0.1',
    port: 6379,
    password:
        'bVnNkQ9vDoUY1jSBagRudjk1O30WR8MBqWRNdeFxSOzbfAEISggWgdYB9dyXUUgK787DNYK1RlVSKxcL',
});

redisClient.connect().catch(console.error);

redisClient.on('connect', () => {
    console.log('[Redis] client connected');
});

redisClient.on('error', err => {
    console.error('[Redis] client error:', err);
});

const redisApp = express();
redisApp.use(
    session({
        store: new RedisStore({
            client: redisClient,
            ttl: 540 * 60 * 1000,
        }),
        resave: false,
        secret: 'your-secret-key',
        saveUninitialized: true,
    })
);

redisApp.get('/', (req, res) => {
    res.send('Welcome to the homepage via redis sessions!');
});

redisApp.get('/login', (req, res) => {
    // Simulate user login
    req.session.user = {
        id: 1,
        username: 'redisUser',
    };
    res.send('Logged in successfully via redis sessions!');
});

redisApp.get('/dashboard', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.send(
            `Welcome to the dashboard via redis sessions ${user.username}!`
        );
    } else {
        res.send('Unauthorized. Please log in first.');
    }
});

module.exports = redisApp;
