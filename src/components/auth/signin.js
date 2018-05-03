import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index.js';
import { connect } from 'react-redux'
// import { signinUser } from '../'
// import { ENGINE_METHOD_DIGESTS } from 'constants';

class Signin extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleFormSubmit(e) {
        e.preventDefault()
        // console.log(this.state)
        this.props.signinUser(this.state.email, this.state.password);
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() { 

        return (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input onChange={this.handleEmailChange.bind(this)} 
                           className="form-control" 
                           value={this.state.email}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input onChange={this.handlePasswordChange.bind(this)} 
                           type="password"
                           value={this.state.password}
                           className="form-control"/>
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}
 
export default connect(mapStateToProps, actions)(Signin);