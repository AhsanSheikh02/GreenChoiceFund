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
        paddingTop:'5%',
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
        width: '100%',
        flexDirection: 'row',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.SecondaryTwo,
    },
    infoImg: {
        height: 76,
        width: 76,
        borderRadius: 15,
        backgroundColor: colors.Placeholder,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackImg: {
        height: '60%',
        width: '60%',
    },
    title: {
        fontSize: 19,
        fontFamily: Fonts.Regular,
        fontWeight: '600',
        color: colors.White
    },
    solutionImg: {
        height: 76,
        width: 76,
        borderRadius: 15,
        backgroundColor: colors.Placeholder,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default styles;