const express = require('express');
const cookiesApp = require('./apps/cookies');
const sessionsApp = require('./apps/sessions');
const redisApp = require('./apps/redisSessions');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome!');
});
app.use('/cookies', cookiesApp);
app.use('/sessions', sessionsApp);
app.use('/redis', redisApp);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
