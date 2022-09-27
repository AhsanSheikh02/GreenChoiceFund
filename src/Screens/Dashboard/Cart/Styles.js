import { StyleSheet } from 'react-native'
import Fonts from '../../../Assets/Fonts/Index';
import colors from '../../../Assets/Colors/Index';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.Primary,

    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        // alignItems:'center',
        paddingBottom: '25%',
    },
    emptyListTitle: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        alignSelf: 'center'
    },
    connection: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    btnStyle: {
        backgroundColor: colors.Secondary,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: Fonts.Regular,
        color: colors.Black
    },


})


export default styles;