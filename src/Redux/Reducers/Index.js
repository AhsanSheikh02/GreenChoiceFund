import { combineReducers } from 'redux';
import { DeviceInfoReducer } from './DeviceInfoReducer';
import { AuthReducer } from './AuthReducer';
import { SplashDataReducer } from './SplashMetaDataReducer'
import { CartReducer } from './CartReducer';


export default combineReducers({
    DeviceInfo: DeviceInfoReducer,
    Auth: AuthReducer,
    Splash: SplashDataReducer,
    Cart: CartReducer,

});
