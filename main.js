const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const shrinkRay = require('shrink-ray-current');
const compression = require('compression');

const { PORT } = require('./config.json');
const database = require('./utils/database');
const api = require('./api/api');

app.use(cors());
//app.use(shrinkRay());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

api(app, database);

app.listen(PORT, async () => {
    console.log("Server online...");
    await database.connect()
        .then((result) => console.log(result))
        .catch((error) => console.log("Connection error -> " + error));
});
