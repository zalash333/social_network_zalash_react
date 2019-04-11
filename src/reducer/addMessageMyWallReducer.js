let initialStateInformationUsers = {
    flags:true,
    informationUsers: {
        123: {
            myWall: ['I`m doing great', 'kukukuku', 'hi may name is Abra Cadabra'],
            data: {
                date: ['3','22','7'],
                month: ['0', '11', '10'],
                hours: ['12', '22', '2'],
                minutes: ['12', '00', '47']
            }
        },
        1488: {
            myWall: ['efffff1111111'],
            data: {
                date: ['14'],
                month: ['11'],
                hours: ['12'],
                minutes: ['12']
            }
        },
        228: {
            myWall: ['d333333'],
            data: {
                date: ['25'],
                month: ['10'],
                hours: ['2'],
                minutes: ['00']
            }
        },
        666: {
            myWall: ['dfvfgdvfdvdfvdv'],
            data: {
                date: ['17'],
                month: ['0'],
                hours: ['22'],
                minutes: ['47']
            }
        },

    }
};
const ON_TEXTAREA_BOX = 'ON_TEXTAREA_BOX';
export const onTextareaBox = () => ({type:ON_TEXTAREA_BOX});

const OFF_TEXTAREA_BOX = 'OFF_TEXTAREA_BOX';
export const offTextareaBox = () => ({type:OFF_TEXTAREA_BOX});

const ADD_MESSAGE_MY_WALL = 'ADD_MESSAGE_MY_WALL';
export const addMessageMyWallAction = (message, id, date, month, hours, minutes) => {
    return {
        type: ADD_MESSAGE_MY_WALL,
        message,
        id,
        date,
        month,
        hours,
        minutes
    }
};

let addMessageMyWallReducer = (state = initialStateInformationUsers, action) => {
    let copyInformationsUser = {};
    for (let property in state.informationUsers) {
        state.informationUsers[property].myWall = [...state.informationUsers[property].myWall];
        copyInformationsUser[property] = {...state.informationUsers[property]};
    }
    switch (action.type) {
        case ADD_MESSAGE_MY_WALL:
            state.informationUsers[action.id].myWall.unshift(action.message);
            state.informationUsers[action.id].data.month.unshift(action.month);
            state.informationUsers[action.id].data.hours.unshift(action.hours);
            state.informationUsers[action.id].data.date.unshift(action.date);
            if (action.minutes <= 9) {
                state.informationUsers[action.id].data.minutes.unshift(`0${action.minutes}`)
            } else {
                state.informationUsers[action.id].data.minutes.unshift(action.minutes);
            }
            return {...state, informationUsers: copyInformationsUser};
        case ON_TEXTAREA_BOX:
            return {...state, flags:false};
        case OFF_TEXTAREA_BOX:
            return {...state, flags:true};
        default:
            return state;
    }
};
export default addMessageMyWallReducer;