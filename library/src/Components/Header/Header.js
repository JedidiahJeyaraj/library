import React, {	Component } from 'react';

import {
	Link
} from 'react-router-dom';


class Header extends Component {
	render() {
		return (
			<header>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                        Library management
                        </a>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menuCollapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="menuCollapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/genre/add">Add Genre</Link></li>
                            <li><Link to="/genre">View Genre</Link></li>
                            <li><Link to="/book/add">Add Books</Link></li>
                            <li><Link to="/book">View Books</Link></li>

                        </ul>
                    </div>
                </div>
            </nav>
            </header>
		);
	}
}

export default Header;
