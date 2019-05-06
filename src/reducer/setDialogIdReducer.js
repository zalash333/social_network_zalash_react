import axiosInstance from "../dal/axios-instance";
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'

let initialStateSetDialogId = {
    dialogsId: '1488',
    dialogUsersAll: [],
    informationUsers: [],
    currentMessageUser: '',
    currentUser: {
        photos: {
            small: ''
        }
    }
};
const SET_DIALOG_ID = 'SET_DIALOG_ID';
export const dialogIdAction = (mas) => {
    return {
        type: SET_DIALOG_ID,
        id: mas
    }
};

const GET_DIALOG = 'GET_DIALOG';
const getDialogAction = (information) => {
    return {
        type: GET_DIALOG,
        information
    }
};

const GET_USERS_PROFILE = 'GET_USERS_PROFILE';
const getUsersProfileAction = (information) => {
    return {
        type: GET_USERS_PROFILE,
        information
    }
};

const GET_CURRENT_MESSAGE_USER = 'GET_CURRENT_MESSAGE_USER';
const getCurrentMessageUserAction = (message) => {
    return {
        type: GET_CURRENT_MESSAGE_USER,
        message
    }
};

const CLEAR_ALL_DIALOG = 'CLEAR_ALL_DIALOG';
export const clearAllDialogAction = () => {
    return {
        type: CLEAR_ALL_DIALOG
    }
};

const GET_USER_PROFILE = 'GET_USER_PROFILE';
const getUserProfileAction = (profile) => ({type: GET_USER_PROFILE, profile});

export const getUserProfile = (id) => async (dispatch) => {
    debugger
    let request = await axiosInstance.get(`profile/${id}`);
    dispatch(getUserProfileAction(request.data))
};


// Запросить список собеседников, с кем я когда-либо вёл беседу
// return http://prntscr.com/n6nz6o


// export const getDialogs = () => async (dispatch) => {
//     // dispatch(clearAllDialogAction());
//     debugger
//     let get = await axiosInstance.get('dialogs');
//     dispatch(getUsers(get.data))
// };


function* fetchUser() {
    try {
        debugger
        const user = yield call(axiosInstance, 'dialogs');
        yield put(getUsers(user.data));
    } catch (e) {
        yield alert(e);
    }
}

export function* getDialogs() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

// function* getUsers (users){
//     debugger
//     let buffer = [];
//         for (let i = 0; users.length > i; i++) {
//             const request = yield call(axiosInstance, `profile/${users[i].id}`);
//             buffer.push(request.data);
//         }
//    yield put (getUsersProfileAction(buffer))
// }


//

const getProfileUser = async (users, i) => {
    return await axiosInstance.get(`profile/${users[i].id}`)
};

const getUsers = (users) => async (dispatch) => {
    for (let i = 0; users.length > i; i++) {
        // let request = await axiosInstance.get(`profile/${users[i].id}`).catch(error=>axiosInstance.get(`profile/${users[i].id}`));
        setTimeout(() => getProfileUser(users, i).then(
            (e) => dispatch(getUsersProfileAction(e.data))
        ), 1000 * i)
    }
};

// const getUsers = (users) => async (dispatch) => {
//     let buffer = [];
//     let usersAllDialogs = await (async (us = users) => {
//         for (let i = 0; us.length > i; i++) {
//             let request = await axiosInstance.get(`profile/${us[i].id}`);
//             buffer.push(request.data);
//         }
//         return buffer
//     })();
//     dispatch(getUsersProfileAction(usersAllDialogs))
// };

// запросить список сообщений с конкретным собеседником (userId)
// return http://prntscr.com/n6nq5a
export const getMessages = (userId) => (dispatch) => {
    axiosInstance.get(`dialogs/${userId}/messages`)
        .then(res => {
            debugger
            console.log(res.data)
            dispatch(getCurrentMessageUserAction(res.data.items))
        });
};


// отправить сообщение (body: string) конкретному собеседнику (userId)
export const sendMessage = (userId, body) => (dispatch) => {
    debugger
    axiosInstance.post(`dialogs/${userId}/messages`, {body})
        .then(res => {
            console.log(res.data);
            dispatch(getMessages(userId))
        });
};

// обновить\зарефрешить конкретного собеседника (userId), чтобы этот собеседник был вверху списка собеседников
function updateDialog(userId) {
    axiosInstance.put(`dialogs/${userId}`)
        .then(res => console.log(res.data));
}

// просмотрено ли моё сообщение моим собеседником
function isViewed(messageId) {
    axiosInstance.get(`dialogs/messages/${messageId}/viewed`)
        .then(res => console.log(res.data));
}

// пометить сообщение как СПАМ
function setSpamStatus(messageId) {
    axiosInstance.post(`dialogs/messages/${messageId}/spam`)
        .then(res => console.log(res.data));
}

// удалить сообщение (удаляется только для удаляющей стороны, для собеседника сообщение не удаляется)
function deleteMessage(messageId) {
    axiosInstance.delete(`dialogs/messages/${messageId}`).then(r => {
        console.log(r.data);
    });
}

// восстановить удалённое сообщение (автоматически оно перестаёт ещё и быть спамом, если было отмечено как спам)
function restoreMessage(messageId) {
    axiosInstance.put(`dialogs/messages/${messageId}/restore`)
        .then(res => console.log(res.data));
}

// получить сообщения из переписки с конкретным собеседником, сообщения, которые новее переданной даты
// return http://prntscr.com/n6nrug
function checkNewMessages(userId, date) {
    axiosInstance.get(`dialogs/${userId}/messages/new?newerThen=${date}`).then(r => {
        console.log(r.data);
    });
}

// получить число всех непрочитанных (новых) сообщений
function newMessagesCount() {
    axiosInstance.get(`dialogs/messages/new/count`).then(r => {
        console.log(r.data);
    });
}


let setDialogIdReducer = (state = initialStateSetDialogId, action) => {
    debugger
    let copyState = {...state};
    switch (action.type) {
        case CLEAR_ALL_DIALOG:
            return {...state, informationUsers: []};
        case GET_USER_PROFILE:
            return {...state, currentUser: action.profile};
        case GET_CURRENT_MESSAGE_USER:
            return {...state, currentMessageUser: action.message};
        case GET_DIALOG:
            return {...state, dialogUsersAll: action.information};
        case GET_USERS_PROFILE:
            copyState.informationUsers = [...state.informationUsers, action.information];
            return copyState;
        case SET_DIALOG_ID:
            copyState.dialogsId = action.id;
            return copyState;
        default:
            return state;
    }
};
export default setDialogIdReducer;