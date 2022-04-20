import './App.css';

import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Routes } from "react-router";
import store from "./store";
import { Provider } from "react-redux";



import Landing from "./components/Layout/Landing";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import Welcome from "./components/User/Welcome";
import SecuredRoute from "./securityUtils/SecuredRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
  // Commented because it was causing the most problem
  // const currentTime = Date.now() / 1000;
  // if (decoded_jwtToken.exp < currentTime) {
  //   store.dispatch(logout());
  //   window.location.href = "/";
  // }
}

class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            
            {
              //Public Routes
            }
          
            <Routes>
              <Route exact path="/" element={<Landing/>} />
              <Route path="/register" element={<Register/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/welcome" element={<Welcome/>} />
            </Routes>
          </div>
          
        </Router>
      </Provider>
    );
  }
}
export default App;
