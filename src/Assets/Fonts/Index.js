import { Platform } from "react-native";

const font_android = {
    Regular: 'SFProDisplay-Regular',
}
const font_ios = {
    Regular: 'SFProDisplay-Regular',
}
const Fonts = Platform.select({
    ios: font_ios,
    android: font_android
})
export default Fonts