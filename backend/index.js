const express = require('express');
const cors = require('cors');

const {getScreens} = require('./controller/ScreenController');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/v1/:screenType', getScreens);

app.post('/api/v1/:screenType', getScreens);

const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);