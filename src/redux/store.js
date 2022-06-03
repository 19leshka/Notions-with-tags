import { createStore, combineReducers } from "redux";
import pagesReducer from './pagesReducer';

const reducers = combineReducers({
    pages: pagesReducer
});

export const store = createStore(reducers);

export default store;