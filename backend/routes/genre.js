var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('library');


router.get('/', function(req, res, next) {
	//	collecting all the genre from the db and Rendering the genre list in table format
	db.collection("genre").find(function(err, docs) {
		var genres = docs;
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




router.post('/', function(req, res, next) {
	var genreName = req.body.genre_name || null;
	if (!genreName) {
		res.json({
			"Status": "Error",
			"Message": "Please fill in all the columns"
		});
	} else {
		// Checking if genreName is already present in the genre List
		var compareGenreName = {
			genre_name: genreName
		};
		db.collection('genre').find({
			compareGenreName
		}, function(err, docs) {
			// Checking for errors
			if (err) {
				res.json({
					"Status": "Error",
					"Message": err
				});
			} else {
				//  If genre is already present sending an error message to the client side
				if (docs[0]) {
					res.json({
						"Status": "Error",
						"Message": "Genre name is already present. Please Enter a different genre"
					});
				} else {
					//  Adding the newly created genre to the database
					var newGenre = {
						genre_name: genreName
					}
					db.collection('genre').insert(newGenre, function(err, docs) {
						// Checking for errors
						if (err) {
							res.json({
								"Status": "Error",
								"Message": err
							});
						} else {
							// on SUCCESS
							// Redirecting to the Genre List Page with a URL success message
							res.json({
								"Status": "Success",
								"Message": "Genre is successfully added"
							});
						}
					});
				}
			}
		});

	}
});


router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	db.collection('genre').find({
		_id: mongojs.ObjectId(id)
	}, function(err, docs) {
		// Checking for errors
		if (err) {
			// console.log(err);
			res.json({
				"Status": "Error",
				"Message": err
			});
		} else {
			// Getting the genre details from the database and passing it into the view
			genreDetail = docs[0]
			res.json({
				"Status": "Success",
				"genre": genreDetail,
			});
		}
	});
});

router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	//	Checking if any books are linked with the requested genre.
	db.collection('genre').aggregate([{
		$match: {
			_id: mongojs.ObjectId(id)
		}
	}, {
		$lookup: {
			from: 'books',
			localField: '_id',
			foreignField: 'genre',
			as: 'books'
		}
	}], function(err, docs) {
		if (docs[0].books[0] != undefined) {
			//	on find of genre
			// 	sending an error message and a status to the client side
			res.json({
				"Status": "Error",
				"Message": "There are some Books Linked with this Genre. Please change their genre and try again"
			});
		} else {
			//	if no books are linked
			// Removing the genre details from the database
			db.collection("genre").remove({
					_id: mongojs.ObjectId(id)
				},
				function(err, result) {
					if (err) {
						//	error
						res.json({
							"Status": "Error",
							"Message": err
						});
					} else {
						// on success
						// sending a success message
						res.json({
							"Status": "Success",
							"Message": "Genre Successfully Deleted"
						});
					}
				});
		}
	});

});


router.put('/:id', function(req, res, next) {
	// Getting mongodb ObjectId from url
	var id = req.params.id;
	var genreName = req.body.genre_name || null;
	// Checking if genreName is not empty
	if (!genreName) {
		res.json({
			"Status": "Error",
			"Message": "Please fill in all the columns"
		});
	} else {
		//  on success
		//  Replacing in the genre database
		var compareId = {
			_id: mongojs.ObjectId(id)
		};

		//  Creating updated genre object
		var updatedGenreName = {
			genre_name: genreName
		};

		//  Updating the database with the new value
		db.collection('genre').update(compareId, {
			$set: updatedGenreName
		}, function(err, docs) {
			// Checking for errors
			if (err) {
				res.json({
					"Status": "Error",
					"Message": err
				});
			} else {
				//  success
				//  Redirecting to the genre list page with success message
				res.json({
					"Status": "Success",
					"Message": "Genre is Updated"
				});
			}
		});
	}
});


module.exports = router;
