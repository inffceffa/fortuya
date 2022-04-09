const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.post('/register', authController.register);
router.post('/search', function(request, response) {
	var id = request.body.id;
	if (id) {
		db.query('SELECT * FROM students WHERE id = ?', [id], function(error, results, fields) {
			if (error) throw error; 
			if (results.length > 0) {
                response.render('search', {data: results})
				console.log(results);
                
			} else {
				response.send('Мэдээлэл олдсонгүй!');
			}			
			
		});
	} else {
		response.send('Id оруулна уу!');
	}
});

module.exports = router;