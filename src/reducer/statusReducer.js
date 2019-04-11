export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    CAPTCHAREQUIRED: 'CAPTCHAREQUIRED',
    SUCCESS: 'SUCCESS'
};
let initialState = {
    status: statuses.INIT
};

const SET_STATUS = 'SET_STATUS';

export const setStatus = (status) => ({type: SET_STATUS, status});

let statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status};
        default:
            return state;
    }
};
export default statusReducer