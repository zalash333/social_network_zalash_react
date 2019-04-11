import axiosInstance from "../dal/axios-instance";
import {setIsAuth} from "./authReducer";
import {setStatus, statuses} from "./statusReducer";
import {authMeAction} from "./usersReducer";


//action creator

// export const statuses = {
//     INIT: 'INIT',
//     ERROR: 'ERROR',
//     INPROGRESS: 'INPROGRESS',
//     CAPTCHAREQUIRED: 'CAPTCHAREQUIRED',
//     SUCCESS: 'SUCCESS'
// };

let initialStateLoginId = {
    id: '123',
    location: true,
    error: false,
    // status: statuses.INIT,
    message: '',
    captcha: ''
};

const LOGIN_USER = 'LOGIN_USER';
// const SET_STATUS = 'SET_STATUS';
const SET_MESSAGE = 'SET_MESSAGE';
const URL_CAPTCHA = 'URL_CAPTCHA';


// export const setStatus = (status) => ({type: SET_STATUS, status});
export const setMessage = (message) => ({type: SET_MESSAGE, message});
export const getCaptcha = (captcha) => ({type: URL_CAPTCHA, captcha});




export const loginAction = (l, p, rm, c) => (d) => {
    d(setStatus(statuses.INPROGRESS));
    axiosInstance.post('auth/login', {
        email: l,
        password: p,
        rememberMe: rm,
        captcha: c

    }).then((res) => {
        if (res.data.resultCode === 0) {
            d(setStatus(statuses.SUCCESS));
            d(setIsAuth(true))
            d(authMeAction())
        } else {
            d(setStatus(statuses.ERROR));
            axiosInstance.get('security/get-captcha-url').then(r =>{
                d(setStatus(statuses.CAPTCHAREQUIRED));
                d(getCaptcha(r.data.url))});
            d(setMessage(res.data.messages[0]));
        }
    });
    // return {
    //     type: LOGIN_USER,
    //     id
    // }
};


// const LOGIN_USER = 'LOGIN_USER';
// export const loginAction = (id) => {
//     return {
//         type: LOGIN_USER,
//         id
//     }
// };
const ERROR_LOGIN_USER = 'ERROR_LOGIN_USER';
export const ErrorAction = () => {
    return {
        type: ERROR_LOGIN_USER,
    }
};

const FALSE_ERROR_LOGIN_USER = 'FALSE_ERROR_LOGIN_USER';
export const falseErrorAction = () => {
    return {
        type: FALSE_ERROR_LOGIN_USER,
    }
};

let loginIdReducer = (state = initialStateLoginId, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {...state, message: action.message};
        case LOGIN_USER:
            let locationEl = !state.location;
            return {...state, id: action.id, location: locationEl};
        case ERROR_LOGIN_USER:
            return {...state, error: true};
        case FALSE_ERROR_LOGIN_USER:
            return {...state, error: false};
        case URL_CAPTCHA:
            return {...state, captcha: action.captcha};
        default:
            return state;
    }
};
export default loginIdReducer