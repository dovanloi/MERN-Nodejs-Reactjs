import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
//

import { GET_ERRORS, SET_CURRENT_USER } from './types'


export const registeruser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Login
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data
            // Set token to ls
            localStorage.setItem('jwtToken', token)
            // set token to auth header
            setAuthToken(token)
            // Decode tokn to get user data
            const decode = jwt_decode(token)

            // Set current user
            dispatch(setCrurrentUser(decode))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// set logged in user

export const setCrurrentUser = (decode) =>{
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}

// log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // set current user to {}
    dispatch(setCrurrentUser({}))
    
}
