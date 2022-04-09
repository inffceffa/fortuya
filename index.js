const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false})); 
app.use(express.json());

dotenv.config({path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect(err => {
    if(err) {
        console.log(err);
    }else{
        console.log('MYSQL холболт амжилттай...')
    }
});
app.use('/', require('./routes/page')); 
app.use('/auth', require('./routes/auth'));


app.listen(8080, () => {
    console.log('8080 port дээр сервэр аслаа...');
});