// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

require('dotenv').config();

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const authenticateJWT = require('./middleware/authentication.js');
const isAdmin = require('./middleware/authorization.js');

const app = express();

// mongoose
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(cors())


// routes
app.use('/api/blog', authenticateJWT, blogRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', authenticateJWT, isAdmin, adminRouter);

//hello world
app.get('/hello', function(req, res) {
    res.send('Hello World!');
});

// error handlers

app.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


db.once('open', function() {
    console.log('Connected!');
});

module.exports = app;

// app.listen(3000, function() {
//     console.log('Listening on port 3000!');
// });
