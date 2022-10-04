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
        paddingVertical: 50,

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberContainer: {
        width: '78%',
        // paddingLeft:5,
        justifyContent: 'center'
    },
    countryCode: {
        fontSize: 14,
        fontFamily: Fonts.Light,
        color: colors.White
    },
    googleBtn: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: colors.White,
        marginTop: 20,
        paddingHorizontal: '5%'
    },
    socialIcon: {
        height: 27,
        width: 27
    },
    socialText: {
        fontSize: 17,
        color: colors.Black,
        fontFamily: Fonts.Regular,
        alignSelf: 'center',
        marginLeft: 10
    },
})
export default styles

