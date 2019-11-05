require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');

const app = express();

app.use(express.urlencoded( { extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.once('open', () => {
    console.log(`connected to mongo db on ${db.host}:${db.port}... `)
})

db.on('error', (err) => {
    console.log(`database error:\n${err}`)
})

app.use('/auth', require('./routes/auth'))

app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`)
})