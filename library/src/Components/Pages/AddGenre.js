import React, {	Component } from 'react';
import Request from 'superagent';
import Dash from 'lodash';
import { Redirect } from 'react-router'



class AddGenre extends Component {
    constructor() {
        super();
        this.state = {
          genre_name: '',
          redirect: false,
        };
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    _onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    _onSubmit(e) {
        e.preventDefault();
        const { genre_name } = this.state;
        var url = "http://localhost:3001/genre";
        Request.post(url, { genre_name }).then((response) => {
            if(JSON.parse(response.text).Status=== 'Success') {
                alert(JSON.parse(response.text).Message);
                this.setState({ redirect: true });
            }
        });

    }
    render() {
        const { genre_name } = this.state;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/genre'/>;
        }
		return (
            <div className="wrap container">
                <div className="row ">
                    <div className="col-md-6 col-md-offset-3 form">
                        <div className="row pageHead " id="genre-add-header">
                            <div className="col-md-6 col-md-offset-3">
                                <h2>Add Genre</h2>
                            </div>
                        </div>
                        <form role="add-genre" id="add-genre" onSubmit={this._onSubmit}>
                            <div className="form-group">
                                <label htmlFor="genre_name">Genre Name: *</label>
                                <input type="text" className="form-control" placeholder="Genre Name*" id="genre_name" name="genre_name" ref="genre_name" autoFocus value={genre_name} onChange={this._onChange} ></input>
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

export default AddGenre;
