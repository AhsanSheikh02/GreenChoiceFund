import { USER_TYPE, CONTACT_REASONS, SELECTED_IMAGE, INFOGRAPHICS, INFO_URLS } from '../Types/Index';

const initialState = {
    userTypes: null,
    contactReasons: null,
    selectedImage: null,
    infographic: null,
    infoUrls: null

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
        case INFO_URLS:
            return {
                ...state,
                infoUrls: action.payload,
            };
        default:
            return state;
    }
}

export { SplashDataReducer }