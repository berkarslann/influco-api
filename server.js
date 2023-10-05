const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cookieParser())
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth'); 
const feedRoutes = require('./routes/feed')
const activityRoutes = require('./routes/activity')
const postRoutes = require('./routes/post')
const serieRoutes = require('./routes/serie')

app.use('/', feedRoutes)
app.use('/auth', authRoutes)
app.use('/activity', activityRoutes)
app.use('/post', postRoutes)
app.use('/serie', serieRoutes)


const PORT = 3000;

mongoose
    .connect(
       process.env.MONGO_URI
    )
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => console.log(err))