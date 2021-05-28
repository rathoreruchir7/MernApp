import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { set } from 'mongoose';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logoutUser, getProfile, uploadProfile, updateProfile } from '../redux/ActionCreators';


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
            height: theme.spacing(40),
        },
    },

    loaderRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    
        '& > * + *': {
          marginLeft: theme.spacing(2),
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
    const [open, setOpen] = useState(false);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
       
        setSpinner(true)
        if(props.auth.user!=undefined){
            // console.log(props.auth)
            setAvatar(props.auth.user.avatar)
            setName(props.auth.user.name)
            setEmail(props.auth.user.email)
            setSpinner(false)
        }    
    },[])

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const handleSave=()=>{
        setSpinner(true)
        const formData = new FormData();
        formData.append("imageFile", profile)
        if(profile){
          
            // console.log(spinner)
            props.uploadProfile(formData, props.history)
            
           
        }
        
        const payload={ name: name, email: email}
        setSpinner(true)
        props.updateProfile(payload, props.history)
       
        // axios({
        //     url: '/profile',
        //     method: 'PATCH',
        //     data: payload,

        //     headers: {Authorization: bearer }
        //   }).then((res)=>{
        //         setName(res.data[0].name)
        //         setEmail(res.data[0].email)
        //         setAvatar(res.data[0].avatar)
        //         setEditDisabled(false)
        //         setDisabled(true)
        //         alert("Profile Updated successfully!")
            
        //   }).catch((err)=>{
        //     console.log(err)
        //   })
    }

    const handleEdit=()=>{
        setEditDisabled(true)
        setDisabled(false)
    }

        if(!spinner){
            return (
                <div className={classes.root}>
                    <Dialog open={open} onClose={handleClose}>
                        <Avatar alt={name} src={`${avatar}`} style={{width: '100%', height: "100%"}} variant="square" />
                    </Dialog>
                    <Paper >
                    <div className={classes.field}><Avatar alt="Remy Sharp" src={`${avatar}`} style={{width: '100px', height: "100px"}} onClick={handleClickOpen}/><input type="file" id="profile" name="profile" style={{display: isDisabled ? "none" : ""}} onChange={(e) => setProfile(e.target.files[0])}  /> </div>
                       <div className={classes.field}>Name: <input className={classes.inputStyle} id="title" name="title" value={name} disabled={isDisabled} onChange={(e) => setName(e.target.value)} /></div>
                       <div className={classes.field}>Email: <input  className={classes.inputStyle} id="email" name="email" value={email} disabled={isDisabled} onChange={(e) => setEmail(e.target.value)} /></div>
        
                       <div className={classes.field}><Button variant="contained" color="primary"  disabled={edit} onClick={handleEdit} >Edit</Button><Button variant="contained" color="primary" onClick={handleSave} disabled={isDisabled}>Save</Button></div>
                       <span onClick={() => props.logoutUser(props.history)} style={{fontWeight: "bold", cursor: "pointer"}}>Logout</span>
                    </Paper>
                   
                </div>
            );
        }

        else{
            return (
                <div className={classes.loaderRoot} style={{marginTop: '300px'}}>
                  <CircularProgress />
                </div>        
                 );
        }
       
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: (history) => dispatch(logoutUser(history)),
    getProfile: (history) => dispatch((getProfile(history))),
    uploadProfile: (formData, history) => dispatch((uploadProfile(formData, history))),
    updateProfile: (payload, history) => dispatch((updateProfile(payload, history)))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))