import React,{Component, useEffect} from 'react';
import { useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router, withRouter, BrowserRouter } from 'react-router-dom';
import { signupUser, loginUser, logoutUser, getProfile } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    signupUser: (creds, history) => dispatch(signupUser(creds,history)),
    loginUser: (creds, history) => dispatch(loginUser(creds, history)),
    getProfile: () => dispatch((getProfile())),
    logoutUser: () => dispatch(logoutUser()),
})


function Main(props){

    useEffect(() => {
       props.getProfile()
       console.log(props.auth)
    },[])
    return (
        
             <Switch>
                <Route exact path = '/login' component={(props) => ( <Login loginUser={props.loginUser} {...props} />)} />
                <Route exact path = '/signup' component= {(props) => ( <Signup signupUser={props.signupUser}  /> )} />
                <Route exact path = '/profile' component={(props) => (<Profile auth={props.auth}/> )} />
            
                <Redirect to = '/login' />
             </Switch>
       
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


