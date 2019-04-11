import axiosInstance from "../dal/axios-instance";
import {setStatus, statuses} from "./statusReducer";
import {currentGetUser} from "./usersReducer";

let initialStateUsers = {
    users: [],
    login: '',
    username: '',
    statusUser: null,
    id: '',
    flagStatus: true,
    page: 1,
    loginCheck: false,
    isAnswerServer: true,
    totalCount: '',
    information: {
        "aboutMe": "я круто чувак 1001%",
        "contacts": {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": 'не ищу',
        "fullName": null,
        photos: {
            small: null
        }
    },
    status: null,
    photo: null,
    toggleInformation: 'CONTACTS',
    followingBool: false,
};

const GET_INFORMATION_FRIENDS = 'GET_INFORMATION_FRIENDS';
const getInformationFriendAction = (information, status) => ({type: GET_INFORMATION_FRIENDS, information, status});

const GET_STATUS_FRIENDS = 'GET_STATUS_FRIENDS';
const getStatusFriendAction = (status) => ({type: GET_STATUS_FRIENDS, status});

const GET_FOLLOWING_FRIENDS = 'GET_FOLLOWING_FRIENDS';
const getFollowingFriendAction = (bool) => ({type: GET_FOLLOWING_FRIENDS, bool});

export const getInformationFriends = (id) => (dispatch) => {
    // dispatch(setStatus(statuses.INPROGRESS));
    axiosInstance.get(`profile/status/${id}`).then(r => {
        dispatch(setStatus(statuses.INPROGRESS));
        dispatch(getStatusFriendAction(r.data));
    });
    axiosInstance.get(`follow/${id}`).then(r => {
        dispatch(getFollowingFriendAction(r.data));
    });
    axiosInstance.get(`profile/${id}`).then(response => {
        dispatch(getInformationFriendAction(response.data));
        console.log(response.data)
        setTimeout(() => {
            dispatch(setStatus(statuses.SUCCESS))
        }, 0)
    })
    // dispatch(setStatus(statuses.SUCCESS))
};

export const addFriends = (id) => (dispatch) => {
    axiosInstance.post(`follow/${id}`).then(r => {
        dispatch(getFollowingFriendAction(true))
    });
};
export const deleteFriends = (id) => (dispatch) => {
    axiosInstance.delete(`follow/${id}`).then(r => {
        dispatch(getFollowingFriendAction(false))
    });
};


let followingReducer = (state = initialStateUsers, action) => {
    switch (action.type) {
        case GET_INFORMATION_FRIENDS:
            return {...state, information: action.information};
        case GET_STATUS_FRIENDS:
            return {...state, status: action.status};
        case GET_FOLLOWING_FRIENDS:
            return {...state, followingBool: action.bool};
        default:
            return state;
    }
};
export default followingReducer