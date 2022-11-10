import { StyleSheet, Dimensions } from 'react-native'
// import Fonts from '../../Assets/Fonts/Index';
import colors from '../../Assets/Colors/Index';
import Fonts from '../../Assets/Fonts/Index';

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.Primary,
    },

    primaryLogo: {
        width: 101,
        height: 159,
        resizeMode: 'contain',
        marginTop: height/8,
    },
    secondaryLogo: {
        width: '100%',
        height: height/1.85,
        position: 'absolute',
        bottom: '-12%',
        // resizeMode:'contain'
    },
    Title: {
        fontSize: 36,
        color: colors.White,
        fontFamily: Fonts.Regular,
    }
})


export default styles;