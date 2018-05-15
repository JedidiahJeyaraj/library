import React, {	Component } from 'react';
import Request from 'superagent';
import Dash from 'lodash';
import { Redirect } from 'react-router';



class ViewGenre extends Component {
    constructor() {
        super();
        this.state = {
            _id :'',
            redirect: false,
            edit:false,
            view:false,
    };
        this._onDelete = this._onDelete.bind(this)
        this._onEdit = this._onEdit.bind(this)
        this._onView = this._onView.bind(this)
    }


    componentWillMount() {
        var url = "http://localhost:3001/genre";
        Request.get(url).then((response) => {
            var genres = JSON.parse(response.text);
            this.setState({
                genres: genres.Genres
            });
        });
    }

    _onDelete(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        var arr = state.genres;
        var index = e.target.id;
        var url = "http://localhost:3001/genre/"+this.state._id;
        Request.del(url).then((response) => {
            var response = JSON.parse(response.text);
            if(response.Status === "Success") {
                arr.splice(index, 1);
                this.setState({genres:arr});
                alert(response.Message);
            }
            else{
                alert(response.Message);
            }
        });
    }

    _onEdit(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ edit: true });
    }

    _onView(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ view: true });
    }
	render() {
        const { _id } = this.state;
        const { edit } = this.state;
        const { view } = this.state;
        if (edit) {
            return <Redirect to={"/genre/edit/" + this.state._id} />;
        }
        if (view) {
            return <Redirect to={"/genre/view/" + this.state._id} />;
        }
        var genresRows = Dash.map(this.state.genres, (genre,index) => {
            return( <tr key={genre._id} index={genre._id}>
                        <td>
                            {index+1}
                        </td>
                        <td>
                            {genre.genre_name}
                        </td>
                        <td>
                            <button className="btn btn-primary genreBookView" id={index} data-id={genre._id} name='_id' value={genre._id} onClick = {this._onView} >View Books</button>
                            <button className="btn btn-warning genreEdit" id={index} data-id={genre._id} name='_id' value={genre._id} onClick = {this._onEdit} >Edit</button>
                            <button className="btn btn-danger genereDelete" id={index} data-id={genre._id} index={index} key={index} name='_id' value={genre._id} onClick = {this._onDelete}>Delete</button>
                        </td>
                    </tr>
                );
        });
		return (
            <div className="wrap container">
            <div className="row">
                <table className="table-responsive table">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Genre Name
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {genresRows}
                    </tbody>
                </table>
            </div>

            </div>
		);
	}
}

export default ViewGenre;
