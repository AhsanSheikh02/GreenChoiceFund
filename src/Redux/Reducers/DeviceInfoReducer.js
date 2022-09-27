import { DEVICE_TOKEN, DEVICE_ID, DEVICE_CONNECTION } from '../Types/Index';

const initialState = {
    deviceToken: null,
    deviceId: null,
    isInternet: false
};

const DeviceInfoReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case DEVICE_TOKEN:
            return {
                ...state,
                deviceToken: action.payload,
            };
        case DEVICE_ID:
            return {
                ...state,
                deviceId: action.payload,
            };
        case DEVICE_CONNECTION:
            return {
                ...state,
                isInternet: action.payload,
            };
        default:
            return state;
    }
}

export { DeviceInfoReducer }