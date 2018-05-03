import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            verify_password: '',
            errors: null
        }
    }

    handleEmail(e) {
        e.preventDefault();
        this.setState({email: e.target.value})
    }

    handlePassword(e) {
        e.preventDefault();
        this.setState({password: e.target.value})
    }

    handleVerifyPassword(e) {
        e.preventDefault();
        this.setState({verify_password: e.target.value})
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.verify_password) {
            this.setState({email: '', password: '', verify_password: '', errors: "passwords must match"})
            return;
        }
        this.props.signupUser(this.state.email, this.state.password);
    }

    renderErrors() {
        if (this.state.errors)
            return (
                <div className="alert alert-danger">
                    <strong>Error:</strong> { this.state.errors }
                </div>
            )
        if (this.props.errorMessage)
            return (
                <div className="alert alert-danger">
                    <strong>Error:</strong> { this.props.errorMessage }
                </div>
            )
    }

    render() { 
        return (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" 
                           type="email" 
                           value={this.state.email}
                           onChange={this.handleEmail.bind(this)}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" 
                           type="password" 
                           value={this.state.password}
                           onChange={this.handlePassword.bind(this)}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Verify Password:</label>
                    <input className="form-control" 
                           type="password" 
                           value={this.state.verify_password}
                           onChange={this.handleVerifyPassword.bind(this)}/>
                </fieldset>
                {this.renderErrors()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error}
}
 
export default connect(mapStateToProps, actions)(Signup);