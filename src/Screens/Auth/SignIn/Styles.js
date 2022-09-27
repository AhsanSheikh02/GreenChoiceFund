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
        paddingVertical: 75,
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
    forgot: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color:'#5B95DE',
        marginTop:18,
        alignSelf:'flex-end'
    }

})
export default styles

