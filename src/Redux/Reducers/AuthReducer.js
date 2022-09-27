import { HAS_SESSION, USER_DETAIL, GUEST, LOGIN_USER_TYPE, LOGOUT } from '../Types/Index';

const initialState = {
    authToken: null,
    guest: null,
    loggedInUserDetails: null,
    loggedInUserType: null,
};

const AuthReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGOUT:
            return initialState
        case HAS_SESSION:
            return {
                ...state,
                authToken: action.payload,
            };
        case USER_DETAIL:
            return {
                ...state,
                loggedInUserDetails: action.payload,
            };
        case GUEST:
            return {
                ...state,
                guest: action.payload,
            };
        case LOGIN_USER_TYPE:
            return {
                ...state,
                loggedInUserType: action.payload,
            };
        default:
            return state;
    }
}

export { AuthReducer }