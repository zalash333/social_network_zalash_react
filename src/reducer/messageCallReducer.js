let initialMessageCall = {
    message: ''
};

const MESSAGE_CALL = 'MESSAGE_CALL';
export const messageCallAction = (message) => {
    return {
        type: MESSAGE_CALL,
        message
    }
};

const ADD_SMILE_CURRENT_MESSAGE = 'ADD_SMILE_CURRENT_MESSAGE';
export const addSmileAction = (smile) => {
    return {
        type: ADD_SMILE_CURRENT_MESSAGE,
        smile
    }
};

let messageCall = (state = initialMessageCall, action) => {
    let copyState = {...state};
    switch (action.type) {
        case MESSAGE_CALL:
            copyState.message = action.message;
            return copyState;
                case ADD_SMILE_CURRENT_MESSAGE:
                    copyState.message = copyState.message+action.smile;
                    return copyState;
        default:
            return state;
    }
};
export default messageCall;