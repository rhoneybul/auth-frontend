import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <ul className="nav navbar-nav">
                    { !this.props.authenticated && <li className="nav-item">
                        <Link to="/signin" className="nav-link">Sign in</ Link>
                    </li> }
                    { !this.props.authenticated && <li className="nav-item">
                        <Link to="/signup" className="nav-link">Sign Up</ Link>
                    </li> }
                    { this.props.authenticated && <li className="nav-item">
                        <Link to="/signout" className="nav-link">Sign Out</ Link>
                    </li> }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header); 