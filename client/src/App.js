import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCrurrentUser, logoutUser } from './actions/authActions'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

// check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token
  const decode = jwt_decode(localStorage.jwtToken)
  // Set user and isAu
  store.dispatch(setCrurrentUser(decode))
  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decode.exp < currentTime){
    // Login user
    store.dispatch(logoutUser())
    //Todo:  Clear current Profile
    //Redirect to login
    window.location.href ='/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
