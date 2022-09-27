import { StyleSheet } from 'react-native'
import Fonts from '../../../Assets/Fonts/Index';
import colors from '../../../Assets/Colors/Index';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.Primary
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        // justifyContent: 'center',
        // alignItems:'center',
        paddingVertical: '5%',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 26,
        paddingVertical: 75,
    },

    emptyListTitle: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        alignSelf: 'center'
    },
    title: {
        fontSize: 19,
        fontFamily: Fonts.Regular,
        fontWeight: '600',
        color: colors.Secondary
    },
    desc: {
        fontSize: 18,
        fontFamily: Fonts.Regular,
        color: colors.White,
        opacity: 0.6,
    },
    order: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.SecondaryTwo,
    },
    solution: {
        fontSize: 17,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        opacity: 0.6,
    },
    userDetails: {
        width: '100%',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.SecondaryTwo,
        marginTop:10
    },
    detail: {
        fontSize: 18,
        fontFamily: Fonts.Regular,
        color: colors.White,
        opacity: 0.6,
        fontWeight:'400',
        marginVertical:5
    },


})


export default styles;