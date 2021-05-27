import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import { set } from 'mongoose';

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
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [profile, setProfile] = useState()
    const [isDisabled, setDisabled] = useState(true)
    const [edit, setEditDisabled] = useState(false)
    

    useEffect(() => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        axios.get('/profile', {
            headers: {
                'Authorization': bearer,
                'Content-Type':'application/json',
            }
        })
        .then((res) => {
            console.log(res)
            setName(res.data[0].name)
            setEmail(res.data[0].email)
            setAvatar(res.data[0].avatar)  
        })
       
    },[])

    const handleSave=()=>{

        const formData = new FormData();
        
        formData.append("imageFile", profile)
        
        const bearer = 'Bearer ' + localStorage.getItem('token');
      
        axios({
            url: '/imageUpload',
            method: "POST",
            data: formData,
            headers: {Authorization: bearer }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => console.log(err))

    
        const payload={ name: name, email: email}

        axios({
            url: '/profile',
            method: 'PATCH',
            data: payload,
            headers: {Authorization: bearer }
          }).then((res)=>{
                setName(res.data[0].name)
                setEmail(res.data[0].name)
                setAvatar(res.data[0].avatar)
            
          }).catch((err)=>{
            console.log(err)
          })
    }
    const handleEdit=()=>{
        setEditDisabled(true)
        setDisabled(false)
    }

    
        return (
            <div className={classes.root}>
                <Paper >
                <div className={classes.field}><Avatar alt="Remy Sharp" src={`http://localhost:5000/${avatar}`} style={{width: '60px', height: "60px"}} /><input type="file" id="profile" name="profile" style={{display: isDisabled ? "none" : ""}} onChange={(e) => setProfile(e.target.files[0])}  /> </div>
                   <div className={classes.field}>Name: <input className={classes.inputStyle} id="title" name="title" value={name} disabled={isDisabled} onChange={(e) => setName(e.target.value)} /></div>
                   <div className={classes.field}>Email: <input  className={classes.inputStyle} id="email" name="email" value={email} disabled={isDisabled} onChange={(e) => setEmail(e.target.value)} /></div>
    
                   <div className={classes.field}><Button variant="contained" color="primary"  disabled={edit} onClick={handleEdit} >Edit</Button><Button variant="contained" color="primary" onClick={handleSave} disabled={isDisabled}>Save</Button></div>
                   
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