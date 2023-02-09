import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_QUANTITY} from '../action';
import guitarImg from "../assets/img/guitar.png";
import harmonicaImg from '../assets/img/harmonika.png';
import drumImg from '../assets/img/drum.png';

const initialState = {
    items: [
        {
            id: 1,
            src: guitarImg,
            title: 'Guitar',
            subTitle: 'Guitar - Acoustic',
            desc: 'Yaman gigmaker acoustic guitar very recommended for newbie',
            price: 11.52,
            count: 1
        },
        {
            id: 2,
            src: harmonicaImg,
            title: 'Harmonica',
            subTitle: 'Harmonica - Classic',
            desc: 'Harmonika kromatik hohner super chromonica 270 deluxe harmonica',
            price: 4.78,
            count: 3
        },
        {
            id: 3,
            src: drumImg,
            title: 'Drum',
            subTitle: 'Drum - Head',
            desc: 'Profesional snare drum head 14 inch with drumstick drum rope',
            price: 8.99,
            count: 0
        }
    ]
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.item]
            };
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.itemId)
            };
        case UPDATE_ITEM_QUANTITY:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id === action.itemId) {
                        return {...item, count: action.quantity};
                    }
                    return item;
                }),
            };
        default:
            return state;
    }
};
