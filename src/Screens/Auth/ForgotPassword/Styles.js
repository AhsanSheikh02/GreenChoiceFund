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
        paddingBottom: 15
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
        fontSize: 24,
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
    resetDesc: {
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontSize: 20,
        fontWeight: '500',
    },
    sendEmail: {
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontSize: 16,
        opacity: 0.6,
        fontWeight: '400'
    },
    backIcon: {
        height: 16,
        width: 15,
        resizeMode: 'contain',
        tintColor: colors.White,
        zIndex:999
    }

})
export default styles

