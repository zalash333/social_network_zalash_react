import axiosInstance from "../dal/axios-instance";
import {setStatus, statuses} from "./statusReducer";
import axiosImg from "../dal/axios-img";

let initialStateUsers = {
    users: [],
    login: '',
    username: '',
    statusUser: null,
    id: '',
    flagStatus: true,
    page: 1,
    loginCheck: false,
    myFriendsCheck: true,
    isAnswerServer: true,
    totalCount: '',
    information: {
        aboutMe: null,
        contacts: {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null
        },
        lookingForAJob: true,
        lookingForAJobDescription: null,
        fullName: null
    },
    photo: null,
    toggleInformation: 'CONTACTS',
    toggle: false,
};


const GET_STATUS_USER = 'GET_STATUS_USER';
export const currentGetUser = (status) => ({type: GET_STATUS_USER, status});

const FLAG_STATUS = 'FLAG_STATUS';
export const flagStatusAction = () => ({type: FLAG_STATUS});

export const putStatusAction = (status) => (d) => {
    d(setStatus(statuses.INPROGRESS));
    axiosInstance.put('profile/status', {
        status
    }).then(r => {
        console.log(r)
        d(currentGetUser(status));
        d(setStatus(statuses.SUCCESS))
    })
};
const CONTACTS_FORM = 'CONTACTS_FORM';
export const contactsFormAction = information => ({type: CONTACTS_FORM, information});


const INFORMATION_FORM = 'INFORMATION_FORM';
export const informationFormAction = information => ({type: INFORMATION_FORM, information});

const PHOTO_FORM = 'PHOTO_FORM';
export const photoFormAction = photo => ({type: PHOTO_FORM, photo});


export const putInformationOfForm = (inf) => (dispatch, getState) => {
    let toggleInformation = getState().users.toggleInformation;
    if (toggleInformation === 'CONTACTS') {
        dispatch(contactsFormAction(inf))
    } else if (toggleInformation === 'PHOTO') {
        // dispatch(photoFormAction(inf.attachment));
        let photoForm = getState().users.photo;
        let formData = new FormData();
        formData.append('image', inf.attachment);
        // console.log(photoForm)
        dispatch(setStatus(statuses.INPROGRESS));
        axiosInstance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.resultCode === 0) {
                let idUser = getState().users.id;
                debugger
                axiosInstance.get(`profile/${idUser}`).then(r => {
                    console.log(r)
                    dispatch(photoFormAction(r.data.photos));
                })
            } else if (res.data.resultCode === 1) {
                alert('error')
            }
            console.log(res)
            dispatch(setStatus(statuses.SUCCESS))
        })
    } else if (toggleInformation === 'INFORMATION') {
        dispatch(informationFormAction(inf))
    }
    let information = getState().users.information;
    axiosInstance.put('profile', information).then(rus => {
        console.log(rus);
    })
};


const GET_INFORMATION_USER = 'GET_INFORMATION_USER';
const getInformationUserAction = (information) => ({type: GET_INFORMATION_USER, information});

// const GET_PHOTO_USER = 'GET_PHOTO_USER';
// const getPhotoUserAction = (photo) => ({type: GET_PHOTO_USER, photo});


export const getInformationUser = () => async (dispatch) => {
    let promise= await axiosInstance.get('auth/me');
    axiosInstance.get(`profile/${promise.data.data.id}`).then(response => {
        dispatch(getInformationUserAction(response.data))
        console.log(response.data)
        // dispatch(getPhotoUserAction(response.data))
    })
};
export const setInformationUser = () => (dispatch, getState) => {
    let information = getState().users.information;
    axiosInstance.put('profile', information).then(rus => {
        console.log(rus);
    })
};
export const getStatusAction = (id) => async (d) => {
   let promise= await axiosInstance.get('auth/me');
    d(setStatus(statuses.INPROGRESS));
    axiosInstance.get(`profile/status/${promise.data.data.id}`).then(r => {
        // axiosInstance.get(`users`).then(r=>{
        console.log(r);
        d(currentGetUser(r.data));
        d(setStatus(statuses.SUCCESS))
    })
};

export const authLogout = ()=>(dispatch) =>{
    axiosInstance.post('auth/logout')
        .then(res=>console.log(res))
};


const AUTH_ME = 'AUTH_ME';
export const informationUserMe = (id) => ({type: AUTH_ME, id});

export const authMeAction = () => (d) => {
    axiosInstance.get('auth/me')
        .then(r => {
            console.log(r)
            if (r.data.resultCode === 0) {
                d(informationUserMe(r.data.data.id));
                d(loginAuthorized(true));
                axiosInstance.get('users').then(rus => {
                    console.log(rus);
                    // d(currentGetUser(rus.data.items[r.data.data.id].status))
                })
            } else if (r.data.resultCode === 1) {
                // alert('asdasdadsa')
                d(isAnswerServerAction(false))
                d(loginAuthorized(false));

            }
        })
        .catch((error) => {
            console.log(error);
            d(isAnswerServerAction(false))
        })
};

const IS_ANSWER_SERVER = 'IS_ANSWER_SERVER';
export const isAnswerServerAction = (isAnswerServer) => ({type: IS_ANSWER_SERVER, isAnswerServer})

const LOGIN_CHECK_AUTHORIZED = 'LOGIN_CHECK_AUTHORIZED';
export const loginAuthorized = (bool) => ({type: LOGIN_CHECK_AUTHORIZED, bool});

const TOGGLE_FORM = 'TOGGLE_FORM';
export const toggleInformation = (toggleInformation) => ({type: TOGGLE_FORM, toggleInformation});

const TOGGLE = 'TOGGLE';
export const toggle = () => ({type: TOGGLE});

const GET_USERS = 'GET_USERS';
export const usersAction = () => async (d, getState) => {
    let page = getState().users.page;
    let request = await axiosInstance.get(`users?page=${page}&count=6`);
    d(getUsers(request.data.items, request.data.totalCount))

};
const getUsers = (users, totalCount) => ({type: GET_USERS, users, totalCount});

let usersReducer = (state = initialStateUsers, action) => {
    let copyUsers = [...state.users];
    let copyState = {...state};
    switch (action.type) {
        case GET_USERS:
            if (state.users && state.users.length <= action.totalCount) {
                for (let i = 0; i < action.users.length; i++) {
                    copyUsers.push(action.users[i]);
                }
            } else if (state.users.length > action.totalCount) {
                alert('error')
            }
            return {
                ...state,
                users: copyUsers,
                myFriendsCheck: false,
                page: state.page + 1,
                totalCount: action.totalCount
            };
        case GET_STATUS_USER:
            return {...state, status: action.status};
        case AUTH_ME:
            return {...state, id: action.id};
        case FLAG_STATUS:
            return {...state, flagStatus: !state.flagStatus};
        case LOGIN_CHECK_AUTHORIZED:
            return {...state, loginCheck: action.bool};
        case IS_ANSWER_SERVER:
            return {...state, isAnswerServer: action.isAnswerServer};
        case GET_INFORMATION_USER:
            return {...state, information: action.information};
        case INFORMATION_FORM:
            copyState.information.aboutMe = action.information.aboutMe;
            copyState.information.lookingForAJob = action.information.lookingForAJob;
            copyState.information.lookingForAJobDescription = action.information.lookingJob;
            copyState.information.fullName = action.information.fullName;
            return copyState;
        case CONTACTS_FORM:
            copyState.information.contacts = action.information;
            return copyState;
        case PHOTO_FORM:
            copyState.photo = action.photo;
            return copyState;
        case TOGGLE_FORM:
            return {...state, toggleInformation: action.toggleInformation};
        case TOGGLE:
            return {...state, toggle: !state.toggle};
        default:
            return state;
    }
};
export default usersReducer