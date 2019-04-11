import {loginAction} from "./loginIdReducer";

let initialStateForAuthPage = {
    isLoggedIn: false,
    isAuth: false,
    userInfo: {
        userId: null,
        userName: null,
        avatarUrl: ''
    }
};
const SET_IS_AUTH = 'SET_IS_AUTH';
export const setIsAuth = (value) => {
    return {
        type: SET_IS_AUTH,
        value
    }
};
//action creator
const PRE_LOADING_LOGIN = 'PRE_LOADING_LOGIN';
export const preloadingAction = (isLoading) => {
    return {
        type: PRE_LOADING_LOGIN,
        isLoading
    }
};

//thunk creator
export const LoginAuth = (action) => (dispatch) => {
    dispatch(preloadingAction('progress'));
    setTimeout(() => {
        dispatch(action);
        dispatch(preloadingAction('finish'));
    }, 3000)
};

let authReducer = (state = initialStateForAuthPage, action) => {
    let copyState = {...state};
    switch (action.type) {
        case PRE_LOADING_LOGIN:
            if (action.isLoading === 'progress') {
                copyState.isLoggedIn = true;
            } else if (action.isLoading === 'finish') {
                copyState.isLoggedIn = false;
            }
            return copyState;
        case SET_IS_AUTH:
            copyState.isAuth = action.value;
            return copyState;
        default:
            return state;
    }
};
export default authReducer