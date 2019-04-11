
let initialStateAddMessage = {
    1488: {
        id: '1488',
        name: 'Ivan',
        massageUserTrigger: [true, true, false, true],
        massage: ['Hi, how are you', 'Hi, how are you', 'Hi, how are you', 'Hi, how are you', 'hi'],
        photo: 'https://www.cstatic-images.com/car-pictures/xl/USC70CHC021E021001.jpg',
        timeMassage: []
    },
    228: {
        id: '228',
        name: 'Alex',
        massageUserTrigger: [true, false],
        massage: ['Good bye', 'hi'],
        photo: 'https://cdn.motor1.com/images/mgl/qxZrL/s3/25-future-cars-worth-waiting-for.jpg',
        timeMassage: []
    },
    666: {
        id: '666',
        name: 'Dimitry',
        massageUserTrigger: [true, false],
        massage: ['OMG', 'hi'],
        photo: 'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEFV4unRUNgIF9RXot8OP4BRKLFvi7hJtcHqXO0a8CV9Zo',
        timeMassage: []
    }
};

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessageAction = (message, id) => {
    return {
        type: ADD_MESSAGE,
        message,
        id
    }
};

let addMessageReducer = (state=initialStateAddMessage,action)=>{
    let copyState = {...state};
    switch (action.type){
        case ADD_MESSAGE:
            copyState[action.id].massage.push(action.message);
            copyState[action.id].massageUserTrigger.push(false);
            return copyState;
        default:
            return state;
    }
};

export default addMessageReducer;