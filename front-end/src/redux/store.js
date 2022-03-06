import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user";
import thunk from "redux-thunk";

const reducers = combineReducers({
    user: userReducer          
});

const persistConfig = {
    timeout: 250,
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store;