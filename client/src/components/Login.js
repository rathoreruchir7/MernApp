import React,{Component, useEffect} from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Link,withRouter } from 'react-router-dom';
import { loginUser } from '../redux/ActionCreators';
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

function Login(props){
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin=()=>{
        props.loginUser({ username: username, password: password}, props.history)
    }
    return (
        <div className={classes.root}>
            <header style={{marginTop: '-30px', marginBottom: '50px' ,width: '100%',height: '20%', fontSize: '40px', color: '#dc143c', fontFamily: 'monospace'}}>Mern App</header>
            <Paper  className={classes.paper} >
                <div className={classes.field}><TextField id="username" name="username" label="Email*" variant="outlined" onChange={(e) => setUsername(e.target.value)}/></div>
                <div className={classes.field}><TextField id="password" name="password" label="Password*" type='password' variant="outlined" onChange={(e) => setPassword(e.target.value)}/></div>

                <div className={classes.field}><Button variant="contained" color="primary" onClick={handleLogin}>Login</Button></div>
                <div style={{cursor: 'pointer'}} onClick={() => props.history.push('/signup')}>Not a member, Register!</div>
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
    loginUser: (creds, history) => dispatch(loginUser(creds,history)),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))