import React, {	Component } from 'react';
import Request from 'superagent';
import Dash from 'lodash';
import { Redirect } from 'react-router'


class ViewBook extends Component {

	constructor() {
        super();
        this.state = {
            _id :'',
            redirect: false,
            edit:false,
    };
        this._onDelete = this._onDelete.bind(this)
        this._onEdit = this._onEdit.bind(this)
        this._onIssue = this._onIssue.bind(this)
        this._onRecieve = this._onRecieve.bind(this)
    }


    _onDelete(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        var arr = state.books;
        var index = e.target.id;
        var url = "http://localhost:3001/books/"+this.state._id;
        Request.del(url).then((response) => {
            var response = JSON.parse(response.text);
            if(response.Status === "Success") {
                arr.splice(index, 1);
                this.setState({books:arr});
                alert(response.Message);
            }
            else{
                alert(response.Message);
            }
        });
    }


    _onIssue(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        var arr = state.books;
        var index = e.target.id;
        var url = "http://localhost:3001/books/issue/"+this.state._id;
        Request.put(url).then((response) => {
            var response = JSON.parse(response.text);
            if(response.Status === "Success") {
                this.state.books[index].current_status = 0;
                this.setState({books:arr});
                alert(response.Message);
            }
            else{
                alert(response.Message);
            }
        });
    }


    _onRecieve(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        var arr = state.books;
        var index = e.target.id;
        var url = "http://localhost:3001/books/recieve/"+this.state._id;
        Request.put(url).then((response) => {
            var response = JSON.parse(response.text);
            if(response.Status === "Success") {
                this.state.books[index].current_status = 1;
                this.setState({books:arr});
                alert(response.Message);
            }
            else{
                alert(response.Message);
            }
        });
    }

    componentWillMount() {
        var url = "http://localhost:3001/books";
        Request.get(url).then((response) => {
            var books = JSON.parse(response.text);
            this.setState({
                books: books.Books
            });
        });
    }

    _onEdit(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ edit: true });
    }

	render() {
        const { edit } = this.state;
        if (edit) {
            return <Redirect to={"/book/edit/" + this.state._id} />;
        }
      	var bookRows = Dash.map(this.state.books, (book,index) => {
            if (index>=0){
            return( <tr key={book._id} index={book._id}>
                        <td>
                            {index+1}
                        </td>
                        <td>
                            {book.book_name}
                        </td>
                        <td>
                        	{book.author_name}
                        </td>
                        <td>
                        	{book.current_status ? 'Available' : 'Issued'}
                        </td>
                        <td>
                        	<button className="btn btn-warning bookEdit" data-id={book._id} onClick = {this._onEdit} name='_id' value={book._id}>Edit</button>
                            <button className="btn btn-danger bookDelete" data-id={book._id} id={index} index={index} key={index} name='_id' value={book._id} onClick = {this._onDelete}>Delete</button>
                           	{book.current_status ?  <button class="btn btn-primary bookIssue" data-id={book._id} id={index} index={index} key={index} name='_id' value={book._id} onClick = {this._onIssue}>Issue</button> : <button className="btn btn-success bookRecieve" data-id={book._id} id={index} index={index} key={index} name='_id' value={book._id} onClick = {this._onRecieve}>Recieve</button>}
                        </td>
                    </tr>
                );
            } else {
                <tr>
                    <td colspan="5" className="center">
                                No Book Found
                    </td>
                </tr>
            }
        });
		return (
            <div className="wrap container">
            	<div className="row">
        			<table className="table-responsive table ">
            			<thead>
                			<tr>
			                    <th>
			                        #
			                    </th>
			                    <th>
			                        Book Name
			                    </th>
			                    <th>
			                        Author name
			                    </th>
			                    <th>
			                        Availability
			                    </th>
			                    <th>

			                    </th>
                			</tr>
           				 </thead>
           				 <tbody>
           				 	{bookRows}
           				 </tbody>
           			</table>
            	</div>
            </div>
		);
	}
}



export default ViewBook;