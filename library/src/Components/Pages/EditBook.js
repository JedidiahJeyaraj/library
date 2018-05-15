import React, {	Component } from 'react';
import Request from 'superagent';
import Dash from 'lodash';
import { Redirect } from 'react-router'



class EditBook extends Component {
    constructor(props) {
        super();
        this.state = {
        	book_name : '',
        	author_name : '',
        	genre : '',
            redirect: false,
            _id : props.match.params.id,
        };
        
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    componentWillMount() {
        var url = "http://localhost:3001/genre";
        Request.get(url).then((response) => {
            var genres = JSON.parse(response.text);
            this.setState({
                genres: genres.Genres
            });
        });
        var bookUrl ="http://localhost:3001/books/"+this.state._id;
        Request.get(bookUrl).then((response) => {
            var book = JSON.parse(response.text);
            this.setState({
                book_name : book.Book.book_name,
                author_name : book.Book.author_name,
                genre : book.Book.genre
            });
        });


    }

    _onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        console.log(state);
    }

    _onSubmit(e) {
        e.preventDefault();
        const { book_name, author_name, genre } = this.state;
        var url = "http://localhost:3001/books/"+this.state._id;
        Request.put(url, { book_name, author_name, genre }).then((response) => {
            if(JSON.parse(response.text).Status=== 'Success') {
                alert(JSON.parse(response.text).Message);
                this.setState({ redirect: true });
            }
        });
    }


    render() {
        const { book_name, author_name, genre  } = this.state;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/book'/>;
        }

        var genresOptions = Dash.map(this.state.genres, (genre,index) => {
            return( <option value={genre._id}>{genre.genre_name}</option>
                ); 
        });

		return (
            <div className="wrap container">
                <div className="row ">
                    <div className="col-md-6 col-md-offset-3 form">
                        <div className="row pageHead " id="genre-add-header">
                            <div className="col-md-6 col-md-offset-3">
                                <h2>Add Book</h2>
                            </div>
                        </div>
                        <form role="add-book" id="add-book" onSubmit={this._onSubmit}>
                            <div class="form-group">
                            	<label for="book_name">Book Name: *</label>
                            	<input type="text" class="form-control" placeholder="Book Name" id="book_name" value={book_name} name="book_name" autofocus onChange={this._onChange}></input>
                        	</div>
	                        <div class="form-group">
	                            <label for="author_name">Author Name: *</label>
	                            <input type="text" class="form-control" placeholder="Author Name" id="author_name" value={author_name} name="author_name" required onChange={this._onChange}></input>
	                        </div>
	                        <div class="form-group">
	                            <label for="genre_name">Genre: *</label>
	                            <select id="genre_name" name="genre" class="form-control" required onChange={this._onChange} value={this.state.genre}>
	                                <option value="">---</option>
	                                {genresOptions}
	                            </select>
	                        </div>
                            <div className="text-center" id="buttonHolder">
                                <button type="submit" className="btn btn-success" id="addButton">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		);
	}
}

export default EditBook;
