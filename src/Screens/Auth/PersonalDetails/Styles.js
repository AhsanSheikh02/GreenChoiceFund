import { StyleSheet } from 'react-native'
import Fonts from '../../../Assets/Fonts/Index'
import colors from '../../../Assets/Colors/Index'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: colors.Primary,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 26,
        paddingVertical: 26,

    },
    btnStyle: {
        marginTop: 30,
        backgroundColor: colors.Secondary,
    },
    Logo: {
        width: 63.52,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    Title: {
        fontSize: 30,
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontWeight: '700',
        marginTop: 30,
        alignSelf: 'center'
    },
    credentails: {
        color: colors.Dark,
        fontFamily: Fonts.Regular,

    },
    socialText: {
        color: colors.White,
        opacity: 0.6,
        fontFamily: Fonts.Regular,
        marginTop: 44,
        alignSelf: 'center'
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: Fonts.Regular,
        color: colors.Black
    },
    haveAccount: {
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontSize: 16,
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        //backgroundColor: colors.textInput,
        height: 52,
        width: '100%',
        backgroundColor: colors.textInput,
        borderWidth: 0.75,
        borderColor: colors.Primary,
        paddingHorizontal: 8,
        elevation: 0,
        borderRadius: 12,
        marginTop: 12
    },
    codeContainer: {
        width: '22%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    numberContainer: {
        width: '78%',
        // paddingLeft:5,
        justifyContent:'center'
    },
    countryCode: {
        fontSize: 14,
        fontFamily: Fonts.Light,
        color: colors.White
    }

})
export default styles

