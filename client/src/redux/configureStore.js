import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth } from './auth';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}
