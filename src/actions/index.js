import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER, 
    FETCH_MESSAGE 
} from './types';

const API_URL = "http://localhost:3000";

export function signinUser( email, password ) {
    
    return function(dispatch) {
        // submit email and password to server
        axios.post(`${API_URL}/signin`, { email, password })
            .then(response => {
                // if request is good, //
                //update state, 
                dispatch({ type: AUTH_USER })
                //save jwt token, 
                localStorage.setItem('token', response.data.token);
                // redirect to /feature
                browserHistory.push("/feature");
            })
            .catch(error => {
                dispatch(authError("Could not authenticate."))
            })
    }

}

export function signupUser( email, password ) {
    return function(dispatch) {
        console.log('creating a user')
        axios.post(`${API_URL}/signup`, {email, password})
            .then(response => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', response.data.token);
                browserHistory.push("/feature")
            })
            .catch(response => {
                // console.log("sign up error")
                // console.log(response.error)
                dispatch(authError("Email is already in use."))
            })
    }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(`${API_URL}/`, {
            headers: { authorization: localStorage.getItem('token') }
        }) 
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE, 
                    message: response.data.message
                })
            })
            .catch(response => {
                console.log(response)
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem("token");
    return {
        type: UNAUTH_USER,
    }
}