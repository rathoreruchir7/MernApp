import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '100px',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: theme.spacing(50),
            height: theme.spacing(30),
        },
    },

    paper: {
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
        paddingLeft: "20px",
        
    },

    field: {
        marginTop: '20px',
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
    },

    inputStyle: {
        // fontWeight: 'bold'
    }
}));


function Profile(props){

    const classes = useStyles()
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [profile, setProfile] = useState()
    const [isDisabled, setDisabled] = useState(true)
    const [edit, setEditDisabled] = useState(false)
    

    useEffect(() => {
        console.log(props.auth)
    },[])

    const handleSave=()=>{

        const formData = new FormData();
        
        formData.append("imageFile", profile)
        console.log(formData.get("imageFile"));
        const bearer = 'Bearer ' + localStorage.getItem('token');
        console.log(bearer)
        fetch("http://localhost:5000/" + 'imageUpload', {
        method: "POST",
        headers: {
            'Authorization': bearer,
            'Content-Type':'multipart/form-data',
            },

            body: formData
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))


        


    }
    
    const handleEdit=()=>{
        setEditDisabled(true)
        setDisabled(false)
    }

    return (
        <div className={classes.root}>
            <Paper >
            <div className={classes.field}><Avatar alt="Remy Sharp" src="" style={{width: '60px', height: "60px"}} /><input type="file" id="profileUrl" name="profile" style={{display: ''}} onChange={(e) => setProfile(e.target.files[0])} /> </div>
               <div className={classes.field}>Name: <input className={classes.inputStyle} id="title" name="title"  /></div>
               <div className={classes.field}>Email: <input  className={classes.inputStyle} id="description" name="description"  /></div>

               <div className={classes.field}><Button variant="contained" color="primary"  disabled={edit} onClick={handleEdit} >Edit</Button><Button variant="contained" color="primary" onClick={handleSave}>Save</Button></div>
               
            </Paper>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default withRouter(connect(mapStateToProps, null)(Profile))