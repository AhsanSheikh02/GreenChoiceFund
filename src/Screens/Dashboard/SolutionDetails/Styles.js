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
        // justifyContent: 'center',
        // paddingHorizontal: 16,
        paddingBottom: '25%',
    },
    detailContainer: {
        paddingHorizontal: 16,
    },
    emptyListTitle: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        alignSelf: 'center'
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        alignSelf: "center",
        backgroundColor: colors.Placeholder
    },
    imageContainer: {
        width: '100%',
        height: 250
    },
    Title: {
        fontSize: 18,
        fontFamily: Fonts.Regular,
        fontWeight: '700',
        color: colors.White
    },
    Desc: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        opacity: 0.6,
        marginTop: 10
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
    connection: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    }


})


export default styles;