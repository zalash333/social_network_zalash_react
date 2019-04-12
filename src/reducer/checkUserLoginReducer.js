let initialStateInformationUsers = {
    location: true,
    checkId: 123,
    informationUsers: {
        123: {
            id: '123',
            name: 'Jak',
            lastName: 'Zigil`man',
            birthday: '19.01.1988',
            city: 'Kiev',
            education: 'not',
            website: 'web',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBoH-qNIzSSp9ZIzECkuUmQEuVXRQhS5XUd5oMO3a8JC5X3ZiFA'
        }
    }
};


const CHECK_USER_LOGIN = 'CHECK_USER_LOGIN';
export const checkUserAction = (id) => {
    return {
        type: CHECK_USER_LOGIN,
        id
    }
};

let checkUserLoginReducer = (state = initialStateInformationUsers, action) => {
    switch (action.type) {
        case CHECK_USER_LOGIN:
            state.checkId = action.id;
            let newInformationUsersUser = state.informationUsers[action.id].filter((el) => {
                return el.id === state.checkId;
            })[0];

            return {...state, informationUsers: newInformationUsersUser, location: false};
        default:
            return state;
    }
};


export default checkUserLoginReducer;