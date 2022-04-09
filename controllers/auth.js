const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');
const res = require('express/lib/response');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
exports.register = (req, res) => {
    console.log(req.body);
    const {firstname, lastname, age, studentCode} = req.body;
    db.query("SELECT firstname FROM students WHERE firstname =?", [firstname], async (error, result) => {
        if(error) {
            console.log(error);
        }
        if(result.length > 0){
            return res.render('register', {
                message: 'Аль хэдийн бүртгүүлсэн байна!'
            });
        }
        
        db.query('INSERT INTO students SET ?', {firstname: firstname, lastname: lastname, age: age, studentCode: studentCode}, (error, results) => {
            if(error) {
                console.log(error);
            }else{
                console.log(results);
                return res.render('register', {
                    message: 'Бүртгэл амжилттай!'
                });
            }
        });
    });
};  
