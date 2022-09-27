import { USER_TYPE, CONTACT_REASONS, SELECTED_IMAGE, INFOGRAPHICS } from '../Types/Index';

const initialState = {
    userTypes: null,
    contactReasons: null,
    selectedImage: null,
    infographic: null,

};

const SplashDataReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case USER_TYPE:
            return {
                ...state,
                userTypes: action.payload,
            };
        case CONTACT_REASONS:
            return {
                ...state,
                contactReasons: action.payload,
            };
        case SELECTED_IMAGE:
            return {
                ...state,
                selectedImage: action.payload,
            };
        case INFOGRAPHICS:
            return {
                ...state,
                infographic: action.payload,
            };
        default:
            return state;
    }
}

export { SplashDataReducer }