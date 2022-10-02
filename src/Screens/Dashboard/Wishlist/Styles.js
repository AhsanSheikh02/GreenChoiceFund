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
        paddingBottom: '25%'
    },
    emptyListTitle: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        alignSelf: 'center'
    },
    btnStyle: {
        width: '47%',
        marginTop: 40,
        backgroundColor: colors.Secondary,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: Fonts.Regular,
        color: colors.Black
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoIcon: {
        height: 25,
        width: 25,
        tintColor: colors.White,
    },
    infoContainer: {
        height: 30,
        width: 30,
        tintColor: colors.White,
        top: 15,
        right: 15,
        position: 'absolute',
        zIndex: 9999,
        justifyContent:'center',
        alignItems:'center'
    }


})


export default styles;