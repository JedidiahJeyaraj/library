import React, {	Component } from 'react';
import Request from 'superagent';
import Dash from 'lodash';
import { Redirect  } from 'react-router';
import {
    Link
} from 'react-router-dom';


class Home extends Component {
    constructor() {
        super();
        this.state = { 
        };
        
    }

    componentWillMount() {
        var url = "http://localhost:3001/home";
        Request.get(url).then((response) => {
            var genres = JSON.parse(response.text);
            this.setState({
                genres: genres.Genres
            });
        });
    }

    
	render() {
        const { view } = this.state;

        var genresAnchor = Dash.map(this.state.genres, (genre) => {
            return <Link to={'/genre/view/'+ genre._id}><span class="label label-default"> {genre.genre_name}</span></Link>
        });
		return (
            <div className="wrap">
            
            <div class="row" id="genre">
                <div class="col-md-10 col-md-offset-1">
                        {genresAnchor}
                </div>
            </div>
            </div>
		);
	}
}

export default Home;
