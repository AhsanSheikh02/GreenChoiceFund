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
        marginTop: 44,
        backgroundColor: colors.Secondary,
    },
    Logo: {
        width: 209,
        height: 160,
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
    onBoardingDesc: {
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontSize: 20,
        fontWeight:'500',
    },
    onBoardingDescTwo: {
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontSize: 18,
        fontWeight:'500',
    },
    sendEmail: {
        color: colors.White,
        fontFamily: Fonts.Regular,
        fontSize: 16,
        opacity:0.6,
        fontWeight:'400'
    },

})
export default styles

