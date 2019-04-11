

// let initialStateInformationUsers = {
//     location: true,
//     currentUser: null,
//     informationUsers: {
//         user: [{
//             id: '123',
//             name: 'Jak',
//             lastName: 'Zigil`man',
//             birthday: '19.01.1988',
//             city: 'Kiev',
//             education: 'not',
//             website: 'web',
//             myWall: ['I`m doing great', 'kukukuku', 'hi may name is Abra Cadabra'],
//             photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBoH-qNIzSSp9ZIzECkuUmQEuVXRQhS5XUd5oMO3a8JC5X3ZiFA'
//         },
//             {
//                 id: '1488',
//                 name: 'Ivan',
//                 lastName: 'Ivanovich',
//                 birthday: '17.07.1977',
//                 city: 'Moscow',
//                 education: 'Urist',
//                 website: 'web',
//                 myWall: ['efffff1111111'],
//                 photo: 'https://www.cstatic-images.com/car-pictures/xl/USC70CHC021E021001.jpg'
//             },
//             {
//                 id: '228',
//                 name: 'Alex',
//                 lastName: 'Buinov',
//                 birthday: '01.09.2001',
//                 city: 'Stambul',
//                 education: 'BNTU',
//                 website: 'web',
//                 myWall: ['d333333'],
//                 photo: 'https://cdn.motor1.com/images/mgl/qxZrL/s3/25-future-cars-worth-waiting-for.jpg'
//             },
//             {
//                 id: '666',
//                 name: 'Dimitry',
//                 lastName: 'Kukuruzin',
//                 birthday: '05.03.1978',
//                 city: 'Minsk',
//                 education: 'not',
//                 website: 'web',
//                 myWall: ['dfvfgdvfdvdfvdv'],
//                 photo: 'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEFV4unRUNgIF9RXot8OP4BRKLFvi7hJtcHqXO0a8CV9Zo'
//             }
//         ],
//     }
// };
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
        },
        1488: {
            id: '1488',
            name: 'Ivan',
            lastName: 'Ivanovich',
            birthday: '17.07.1977',
            city: 'Moscow',
            education: 'Urist',
            website: 'web',
            myWall: ['efffff1111111'],
            photo: 'https://www.cstatic-images.com/car-pictures/xl/USC70CHC021E021001.jpg'
        },
        228: {
            id: '228',
            name: 'Alex',
            lastName: 'Buinov',
            birthday: '01.09.2001',
            city: 'Stambul',
            education: 'BNTU',
            website: 'web',
            myWall: ['d333333'],
            photo: 'https://cdn.motor1.com/images/mgl/qxZrL/s3/25-future-cars-worth-waiting-for.jpg'
        },
        666: {
            id: '666',
            name: 'Dimitry',
            lastName: 'Kukuruzin',
            birthday: '05.03.1978',
            city: 'Minsk',
            education: 'not',
            website: 'web',
            myWall: ['dfvfgdvfdvdfvdv'],
            photo: 'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEFV4unRUNgIF9RXot8OP4BRKLFvi7hJtcHqXO0a8CV9Zo'
        },

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