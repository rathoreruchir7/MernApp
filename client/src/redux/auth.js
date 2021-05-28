import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Auth = (state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        // user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                // user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.token,
                user: action.user
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
            case ActionTypes.PROFILE_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: false,
                    // user: action.creds
                };
            case ActionTypes.PROFILE_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    errMess: '',
                    user: action.user
                };
            case ActionTypes.PROFILE_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMess: action.message
                };

            case ActionTypes.PROFILE_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: false,
                    // user: action.creds
                };
            case ActionTypes.PROFILE_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    errMess: '',
                    user: action.user
                };
            case ActionTypes.PROFILE_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMess: action.message
                };
            case ActionTypes.UPLOAD_REQUEST:
                return {...state,
                    isLoading: true,
                    // user: action.creds
                };
            case ActionTypes.UPLOAD_SUCCESS:
                return {...state,
                    isLoading: false,
                    errMess: '',
                    user: action.user
                };
            case ActionTypes.UPLOAD_FAILURE:
                return {...state,
                    isLoading: false,
                    errMess: action.message
                };

            case ActionTypes.UPDATE_REQUEST:
                return {...state,
                    isLoading: true,
                    // user: action.creds
                };
            case ActionTypes.UPDATE_SUCCESS:
                return {...state,
                    isLoading: false,
                    errMess: '',
                    user: action.user
                };
            case ActionTypes.UPDATE_FAILURE:
                return {...state,
                    isLoading: false,
                    errMess: action.message
                };
        default:
            return state
    }
}