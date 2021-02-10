const mongoose = require('mongoose');
require('dotenv').config();
const db = mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });
module.exports = db;