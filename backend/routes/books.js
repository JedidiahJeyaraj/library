var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('library');


// api for fetching all the books available
router.get('/', function(req, res, next) {
	
	db.collection("books").find().sort({
		"genre": 1
	}, function(err, docs) {
		var books = docs;
		if (err) {
			res.json({
				"Status": "Error",
				"Message": "Book Not Found"
			});
		}
		res.json({
			"Status": "Success",
			"Books": books
		});
	});
});


/*  POST method to recieve form data and add into the database  */
router.post('/', function(req, res, next) {

	// 	recieving the form data
	var bookName = req.body.book_name || null;
	var authorName = req.body.author_name || null;
	var genre = req.body.genre || null;

	//	Checking for null data
	if (!bookName || !authorName || !genre) {
		db.collection("genre").find(function(err, docs) {
			var genres = docs;
			res.json({
			"Status": "Error",
			"Message": "Please fill in all the columns"
			});
		});
	} else {
		//	Checking if a book is already present with same bookName and authorName
		var compareBookName = {
			book_name: bookName
		};

		var compareAuthorName = {
			author_name: authorName
		}

		db.collection('books').find({
			$and: [compareBookName, compareAuthorName]
		}, function(err, docs) {
			//	if book is found then not added to db but an error message is raised
			// NOTE: future improvement is to increase the count of the books available
			if (docs[0] != undefined) {
				db.collection("genre").find(function(err, docs) {
					var genres = docs;
					res.json({
						"Status": "Error",
						"Message": "Book detail is already present"
					});
				});
			} else {
				//	converting genreId recieved to the mongoDB ObjectId for aggregate function matching
				genre = new mongojs.ObjectId(genre);

				//	creating new book object
				var newBook = {
					book_name: bookName,
					author_name: authorName,
					genre: genre,
					current_status: 1
				};

				//	inserting to the database
				db.collection('books').insert(newBook, function(err, docs) {
					//	if Error
					//	showing an error message
					if (err) {
						// db.collection("genre").find(function(err, docs) {
						// 	var genres = docs;
							res.json({
								"Status": "Error",
								"Message": err
							});
						// });
					} else {
						//	is success then sending success message
						res.json({
							"Status": "Success",
							"Message": "Book is successfully added"
						});
					}

				});
			}
		});

	}
});


router.get('/:id', function(req, res, next) {
	//	recieveing the url parameter
	var id = req.params.id;

	/*	using mongodb aggregate function for collecting all the details of the book both from the book collection as well as the genre collection using the ObjectId of the genre kept in the books document.*/
	db.collection('books').aggregate([{
		$match: {
			_id: mongojs.ObjectId(id)
		}
	}, {
		$lookup: {
			from: 'genre',
			localField: 'genre',
			foreignField: '_id',
			as: 'genreList'
		}
	}], function(err, docs) {
		if (err) {
			res.json({
				"Status": "Error",
				"Message": err
			});
		} else {
			var bookDetail = docs[0];
			if (bookDetail) {
				db.collection("genre").find(function(err, docs) {
					var genres = docs;
					res.json({
						"Status": "Success",
						"Book": bookDetail,
						"Genres": genres,
					});
				});
			} else {
				res.json({
					"Status": "Error",
					"Message": "Book Not Found"
				});
			}
			
		}		
	});
});



/*  DELETE method to delete a book record with the :id from url */
router.delete('/:id', function(req, res, next) {
	//	recieveing the url parameter
	var bookId = req.params.id;

	var removeBook = {
		_id: mongojs.ObjectId(bookId)
	}

	//	removing the book by it's specfic ObjectId
	db.collection("books").remove(removeBook, function(err, result) {
		if (err) {
			//	pushing error (304) to the ajax call
			res.json({
				"Status": "Error",
				"Message": err
			});
		} else {
			//	pushing success (200) to the ajax call
			res.json({
				"Status": "Success",
				"Message": "Book Successfully Deleted"
			});
		}
	});
});



/*  POST method to recieve form data and update the database  */
router.put('/:id', function(req, res, next) {
	//	recieveing the url parameter
	var id = req.params.id;

	var bookName = req.body.book_name || null;
	var authorName = req.body.author_name || null;
	var genre = req.body.genre || null;

	//	Checking for null data
	if (!bookName || !authorName || !genre) {
		res.json({
			"Status": "Error",
			"Message": "Please fill in all the columns"
		});
	} else {
		var compareBookId = {
			_id: mongojs.ObjectId(id)
		};
		genre = new mongojs.ObjectId(genre);

		var updatedBook = {
			book_name: bookName,
			author_name: authorName,
			genre: genre
		}
		//	comparing the specific book using the ObjectId and the updating the details in the book
		db.collection('books').update(compareBookId, {
			$set: updatedBook
		}, function(err, docs) {
			if (err) {
				//	if Error
				//	showing an error message
				res.json({
					"Status": "Error",
					"Message": err
				});
			} else {
				//	if success
				//	showing an success message
				res.json({
					"Status": "Success",
					"Message": "Book is successfully Edited and Saved"
				});
			}
		});

	}
});


/*  PUT method to update the current status of the book to 0 */
router.put('/issue/:id', function(req, res, next) {
	//	recieveing the url parameter
	var bookId = req.params.id;

	var issueBook = {
		_id: mongojs.ObjectId(bookId)
	};

	//	when book is issued then we change the current_status to 0;
	// NOTE: future improvement is that this variable will have the number of books available and for issueing the number will come down one by one.
	var updateData = {
		current_status: 0
	}

	//	updating the book detail with the updated current_status
	db.collection("books").update(issueBook, {
		$set: updateData
	}, function(err, result) {
		if (err) {
			//	pushing error (304) to the ajax call
			res.json({
				"Status": "Error",
				"Message": err
			});
		} else {
			//	pushing success (200) to the ajax call
			res.json({
				"Status": "Success",
				"Message": "Book issued successfully"
			});
		}
	});
});



/*  PUT method to update the current status of the book to 1 */
router.put('/recieve/:id', function(req, res, next) {
	//	recieveing the url parameter
	var bookId = req.params.id;

	var issueBook = {
		_id: mongojs.ObjectId(bookId)
	};

	//	when book is returned then we change the current_status to 1;
	// NOTE: future improvement is that this variable will have the number of books available and for recieving the number will increase one by one upto the available book numbers.
	var updateData = {
		current_status: 1
	}

	//	updating the book detail with the updated current_status
	db.collection("books").update(issueBook, {
		$set: updateData
	}, function(err, result) {
		if (err) {
			//	pushing error (304) to the ajax call
			res.json({
				"Status": "Error",
				"Message": err
			});
		} else {
			//	pushing success (200) to the ajax call
			res.json({
				"Status": "Success",
				"Message": "Book recieved successfully"
			});
		}
	});
});

module.exports = router;