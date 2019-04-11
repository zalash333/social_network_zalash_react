import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import checkUserLoginReducer from "./reducer/checkUserLoginReducer";
import addMessageMyWallReducer from "./reducer/addMessageMyWallReducer";
import loginIdReducer from "./reducer/loginIdReducer";
import addMessageReducer from "./reducer/addMessageReducer";
import setDialogIdReducer from "./reducer/setDialogIdReducer";
import dialogPageReducer from "./reducer/dialogPageReducer";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";
import dataPostMyWallReducer from "./reducer/dataPostMyWallReducer";
import messageCallReducer from "./reducer/messageCallReducer";
import usersReducer, {authMeRender} from "./reducer/usersReducer";
import statusReducer from "./reducer/statusReducer";
import axiosInstance from "./dal/axios-instance";
import Loading from "./component/loading/Loading";
import {reducer as formReducer} from "redux-form";
import followingReducer from "./reducer/followngReducer";

let superReducer = combineReducers({
    loginId:loginIdReducer,
    addMessage:addMessageReducer,
    addMessageMyWall:addMessageMyWallReducer,
    setDialogId:setDialogIdReducer,
    checkUserLogin:checkUserLoginReducer,
    dialogsPage: dialogPageReducer,
    dataCheck: dataPostMyWallReducer,
    callMessage: messageCallReducer,
    users: usersReducer,
    status: statusReducer,
    auth: authReducer,
    following:followingReducer,
    form: formReducer

});
let store2 = createStore(superReducer, applyMiddleware(thunk));
let pp=false;
let ppp=true;

ReactDOM.render(<div><Loading/></div>,
    document.getElementById('root'));
axiosInstance.get('auth/me').then((r) => { if(r.data.resultCode === 0){ReactDOM.render(<Provider store={store2}>
        <BrowserRouter><App pprops={ppp}/></BrowserRouter></Provider>,
    document.getElementById('root'));}else{
    ReactDOM.render(<Provider store={store2}>
            <BrowserRouter><App pprops={pp}/></BrowserRouter></Provider>,
        document.getElementById('root'));
}});


serviceWorker.unregister();
