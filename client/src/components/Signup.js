import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { signupUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '100px',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: theme.spacing(50),
            height: theme.spacing(30),
        },
    },

    paper: {
        height: '400px'

    },

    field: {
        marginTop: '20px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center",
    },

    inputStyle: {
        // fontWeight: 'bold'
    }
}));



function Signup(props) {
    const classes = useStyles();
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")

    const handleSignup = () => {
        if (password == confirmPwd) {
            console.log(props)
            props.signupUser({ username: username, name: name, password: password, email: username }, props.history);
        }

        else if (password != confirmPwd) {
            alert("Password and Confirm Password do not match");
        }
    }
    return (
        <div className={classes.root}>
            <header style={{ marginTop: '-30px', marginBottom: '50px', width: '100%', height: '20%', fontSize: '40px', color: '#dc143c', fontFamily: 'monospace' }}>Mern App</header>
            <Paper className={classes.paper} >
                <div className={classes.field}><TextField id="name" name="name" label="Name*" variant="outlined" onChange={(e) => setName(e.target.value)} /></div>
                <div className={classes.field}><TextField id="username" name="username" label="Email*" variant="outlined" onChange={(e) => setUsername(e.target.value)} /></div>
                <div className={classes.field}><TextField id="password" name="password" type="password" label="Password*" variant="outlined" onChange={(e) => setPassword(e.target.value)} /></div>
                <div className={classes.field}><TextField id="confirmPwd" name="confirmPwd" type="password" label="Confirm Password*" variant="outlined" onChange={(e) => setConfirmPwd(e.target.value)} /></div>

                <div className={classes.field}><Button variant="contained" color="primary" onClick={handleSignup}>Sign up</Button></div>
                <div style={{ cursor: 'pointer' }} onClick={() => props.history.push('/login')}>Already a member, Login!</div>
            </Paper>
        </div>
    );

}


const mapStateToProps = state => {
    return {
        auth: state.auth,

    }
}

const mapDispatchToProps = (dispatch) => ({
    signupUser: (creds, history) => dispatch(signupUser(creds,history)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))


//Issues
//1. the dispatch fucntion loginUser signUp were undefind when passed through Main to login signup but worked when called directly from login sign up
//2. the url in fetch or axios when simply mentioned as /users/login was taking the localhost:3000 instaead of 5000 even after mentioning the proxy in package.json
//3. the app was not updated coz it was still using the function i cleared and wrote consol.log but then i thought of npm start once again and i was not calling the action creator then sp why was it delayed
//4. file upload 500 internal server error
