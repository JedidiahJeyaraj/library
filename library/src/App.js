import React, {	Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Components/Pages/Home';
import ViewGenre from './Components/Pages/ViewGenre';
import AddGenre from './Components/Pages/AddGenre';
import EditGenre from './Components/Pages/EditGenre';
import ViewBook from './Components/Pages/ViewBook';
import AddBook from './Components/Pages/AddBook';
import EditBook from './Components/Pages/EditBook';
import ViewGenreBook from './Components/Pages/ViewGenreBook';


class App extends Component {
	render() {
		return (
			<Router>
				<div className = "App container-fluid background">
	                <Header />
					<Route exact path='/' component={Home} />
					<Route exact path='/genre' component={ViewGenre} />
					<Route exact path='/genre/edit/:id' component={EditGenre} />
					<Route exact path='/genre/view/:id' component={ViewGenreBook} />

					<Route exact path='/genre/add' component={AddGenre} />
					<Route exact path='/book' component={ViewBook} />
					<Route exact path='/book/edit/:id' component={EditBook} />
					<Route exact path='/book/add' component={AddBook} />
					
					
				</div>
			</Router>
		);
	}
}

export default App;
