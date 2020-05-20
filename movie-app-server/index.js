//======================= MODULES =======================

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//===================== EXPRESS SETUP ====================

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===================== ROUTES ====================

app.get('/', (req, res) => res.send('Hello from backend'));
app.use('/api/movieDB', require('./routes/movieDB'));

//===================== START SERVER ====================

const port = 3001;
app.listen(port, () => console.log(`Movie App backend server listening on port ${port} `));
