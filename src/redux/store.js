import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import pagesReducer from './pagesReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    pages: pagesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;