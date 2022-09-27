import { CART_COUNT, LOGOUT } from '../Types/Index';

const initialState = {
    noOfCartItems: null
};

const CartReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGOUT:
            return initialState
        case CART_COUNT:
            return {
                ...state,
                noOfCartItems: action.payload,
            };
        default:
            return state;
    }
}

export { CartReducer }