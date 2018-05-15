var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('library');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


router.get('/home', function(req, res, next) {
	db.collection("genre").find(function(err, docs) {
		if (err) {
			res.json({
				"Status": "Error",
				"Message": "Book Not Found"
			});
		}
		var genres = docs;
		res.json({
			"Status": "Success",
			"Genres": genres
		});
	});
});


router.get('/search/:term', function(req, res, next) {
	//	recieveing the url parameter
	var id = req.params.term;

	// 	Creating a regular expression for the input searched text
	var idRegex = new RegExp(id);

	//	Finding the bookName in the db and sending the result
	db.collection('books').find({
		book_name: {
			$regex: id,
			'$options': 'i'
		}
	}, function(err, docs) {
		if (err) {
			res.json({
				"Status": "Error",
				"Message": "Book Not Found"
			});
		}
		var result = docs;
		//	returning json data to the ajax call
		res.json({
			"Status": "Success",
			"Book": result
		});
	});
});


/* GET method for populating data as per the genre selected */
router.get('/view/:id', function(req, res, next) {

	//	recieveing the url parameter
	var id = req.params.id;

	//	converting the recieved id to mongodb id
	id = mongojs.ObjectId(id);

	db.collection("books").find({
			genre: id
		},
		function(err, docs) {
			if (err) {
				res.json({
					"Status": "Error",
					"Message": err
				});
			}
			var books = docs;
			//	finding the book and rendering the data in the table
			res.json({
				"Status": "Success",
				"Books": books
			});
		});
});

module.exports = router;