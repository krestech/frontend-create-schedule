import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todo from "./modules/todo";
import schedule from "./modules/schedule";

const client = axios.create({
    //all axios can be used, shown in axios documentation
    //baseURL: "http://localhost:3020",
    responseType: "json",
    headers: {
        // Accept: "application/json",
        // "content-type": "application/json",
        // "Access-Control-Allow-Origin": "*"
        //Authorization: ""
    }
});

const persistConfig = {
    timeout: 10000,
    key: "root",
    storage
};

const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(
    axiosMiddleware(client),
    loggerMiddleware
)(createStore); // apply logger to redux

const reducer = combineReducers({
    schedule,
    todo
});

const configureStore = initialState => {
    let store = createStoreWithMiddleware(reducer);
    // let persistor = persistStore(store)

    return { store };
};
export default configureStore;
