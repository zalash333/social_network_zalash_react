let initialData = {
    data: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
};

const DATA_CHECK_POST = 'DATA_CHECK_POST';
export const dataCheckAction = (data) => {
    return {
        type: DATA_CHECK_POST,
        data
    }
};

let loginIdReducer = (state = initialData, action) => {
    switch (action.type) {
        case DATA_CHECK_POST:
            return {...state};
        default:
            return state;
    }
};
export default loginIdReducer