let initialStateInformationUsers = {
    flags:true,
    informationUsers: {
            myWall: ['I`m doing great', 'kukukuku', 'hi may name is Abra Cadabra'],
            data: {
                date: ['3','22','7'],
                month: ['0', '11', '10'],
                hours: ['12', '22', '2'],
                minutes: ['12', '00', '47']
            }
    }
};
const ON_TEXTAREA_BOX = 'ON_TEXTAREA_BOX';
export const onTextareaBox = () => ({type:ON_TEXTAREA_BOX});

const OFF_TEXTAREA_BOX = 'OFF_TEXTAREA_BOX';
export const offTextareaBox = () => ({type:OFF_TEXTAREA_BOX});

const ADD_MESSAGE_MY_WALL = 'ADD_MESSAGE_MY_WALL';
export const addMessageMyWallAction = (message, date, month, hours, minutes) => {
    return {
        type: ADD_MESSAGE_MY_WALL,
        message,
        date,
        month,
        hours,
        minutes
    }
};

let addMessageMyWallReducer = (state = initialStateInformationUsers, action) => {
    let copyState = {...state};
    switch (action.type) {
        case ADD_MESSAGE_MY_WALL:
            copyState.informationUsers.myWall.unshift(action.message);
            copyState.informationUsers.data.month.unshift(action.month);
            copyState.informationUsers.data.hours.unshift(action.hours);
            copyState.informationUsers.data.date.unshift(action.date);
            if (action.minutes <= 9) {
                copyState.informationUsers.data.minutes.unshift(`0${action.minutes}`)
            } else {
                copyState.informationUsers.data.minutes.unshift(action.minutes);
            }
            return copyState;
        case ON_TEXTAREA_BOX:
            return {...state, flags:false};
        case OFF_TEXTAREA_BOX:
            return {...state, flags:true};
        default:
            return state;
    }
};
export default addMessageMyWallReducer;