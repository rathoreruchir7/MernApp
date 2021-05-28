import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth } from './auth';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
        }),
        composeEnhancers(applyMiddleware(thunk,logger))
        
    );

    return store;
}
