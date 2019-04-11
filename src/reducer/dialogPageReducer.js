let initialMassagePage = {
    dialogsPage: {
        id: [1488, 228, 666],
        dialogs: ['Ivan', 'Alex', 'Dimitry'],
        messages: ['Hi, how are you', 'Good bye', 'OMG'],
        photos: ['https://www.cstatic-images.com/car-pictures/xl/USC70CHC021E021001.jpg', 'https://cdn.motor1.com/images/mgl/qxZrL/s3/25-future-cars-worth-waiting-for.jpg', 'https://i.mycdn.me/i?r=AzGBqNaF5OQp2lMpnhRx4DEFV4unRUNgIF9RXot8OP4BRKLFvi7hJtcHqXO0a8CV9Zo']
    },
    massagePage: {
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
    }
};
//action creator
export const MASSAGE_PAGE = 'MASSAGE_PAGE';
export const massagePageAction = (id) => {
    return {
        type: MASSAGE_PAGE,
        id
    }
};


let dialogPageReducer = (state=initialMassagePage,action)=>{
    switch (action.type){
        case MASSAGE_PAGE:
            let locationEl = !state.location;
            return {...state, id: action.id, location: locationEl};
        default:
            return state;
    }
};
export default dialogPageReducer;