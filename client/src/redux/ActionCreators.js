import * as ActionTypes from './ActionTypes';
import axios from 'axios'

/*================AUTH FUNCTIONALITY==================*/
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        user: response.response[0]
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds, history) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    console.log(localStorage.getItem("token"));
    
    return fetch('/users/login',{
        method: 'POST',
        headers: { 
        
            'Content-Type':'application/json',
    },
        body: JSON.stringify(creds),
    
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            console.log(error)
            throw error;
        }
        },
        error => {
            console.log(error)
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            console.log(response.response)
            // localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            
            dispatch(receiveLogin(response));
            history.push('/profile')
        }
        else {
            var error = new Error('Error ' + response.status);
            alert(error);
            error.response = response;
            console.log(error)
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};
/*======================Profile Fetch =================*/
export const requestProfile = () => {
    return {
        type: ActionTypes.PROFILE_REQUEST,
    }
}

export const receiveProfile = (response) => {
    return {
        type: ActionTypes.PROFILE_SUCCESS,
        user: response
    }
}

export const profileError = (message) => {
    return {
        type: ActionTypes.PROFILE_FAILURE,
        message
    }
}
export const getProfile = () => (dispatch) => {
    dispatch(requestProfile())
    const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log(bearer);
    axios.get('/profile', {
        headers: {
            Authorization: bearer,
            'Content-Type':'application/json',
        }
    })
    .then((res) => {
        console.log(res)
        dispatch(receiveProfile(res.data[0]))
    })
    .catch((err) => {console.log(err)
        dispatch(profileError(err.message))});


}
/*======================================================*/
/********SIGNUP ***************************************/
export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}
  
export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (creds, history) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup(creds))
    console.log(JSON.stringify(creds));
    return fetch('/users/signup', {
        method: 'POST',
        headers: { 
        
            'Content-Type':'application/json',
    },
        body: JSON.stringify(creds),
    
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            // localStorage.setItem('token', response.token);
            // localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            
            dispatch(receiveSignup(response));
            history.push('/login')
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(signupError(error.message)))
};


//*------------------------------------------------------------*/
export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = (history) => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    history.push('/login');
    
    dispatch(receiveLogout())
}
/*----------------------------------------------------------------------*/