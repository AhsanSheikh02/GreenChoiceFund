import { StyleSheet } from 'react-native'
import colors from '../../../Assets/Colors/Index';
import Fonts from '../../../Assets/Fonts/Index';

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
    profileDataContainer: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.SecondaryTwo,
        marginTop: 15,
        borderRadius: 10,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    profileImgContainer: {
        height: 65,
        width: 65,
        borderRadius: 65,
        borderWidth: 2,
        borderColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        height: 55,
        width: 55,
        borderRadius: 55
    },
    username: {
        fontSize: 20,
        fontFamily: Fonts.Regular,
        fontWeight: '500',
        color: colors.White,
        marginLeft: 15
    },
    profileSettingContainer: {
        marginTop: 15
    },
    btnStyle: {
        width: '47%',
        marginTop: 25,
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
    }

})


export default styles;