import { StyleSheet } from 'react-native'
import colors from '../../../Assets/Colors/Index';
import Fonts from '../../../Assets/Fonts/Index';

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
        paddingBottom: 20,

    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16
    },
    profileImgContainer: {
        height: 105,
        width: 105,
        borderRadius: 105,
        flexDirection: 'row',
        borderWidth: 2.5,
        borderColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        alignSelf: 'center'
    },
    profileImg: {
        height: 90,
        width: 90,
        borderRadius: 90
    },
    addIconContainer: {
        height: 36,
        width: 36,
        borderRadius: 36,
        position: 'absolute',
        bottom: -5,
        right: -2,
        borderWidth: 3.5,
        borderColor: colors.Primary,
        backgroundColor: '#5B95DE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        tintColor: colors.White
    },
    username: {
        fontSize: 20,
        fontFamily: Fonts.Regular,
        fontWeight: '500',
        color: colors.White,
        marginTop: 18
    },
    profileSettingContainer: {
        marginTop: 40
    },
    settingsTab: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.SecondaryTwo,
        flexDirection: 'row',
        marginTop: 30
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabTitle: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400'
    },
    passIconContainer: {
        height: 105,
        width: 105,
        borderRadius: 80,
        backgroundColor: 'rgba(108,180,66,0.2)',
        marginTop: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    passIcon: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },
    fieldContainer: {
        marginTop: 50
    },
    btnStyle: {
        marginTop: 30,
        backgroundColor: colors.Secondary,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: Fonts.Regular,
        color: colors.Black
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        //backgroundColor: colors.textInput,
        height: 52,
        width: '100%',
        backgroundColor: colors.textInput,
        borderWidth: 0.75,
        borderColor: colors.Primary,
        paddingHorizontal: 8,
        elevation: 0,
        borderRadius: 12,
        marginTop: 12
    },
    codeContainer: {
        width: '20%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberContainer: {
        width: '80%',
        justifyContent: 'center'
    },
    countryCode: {
        fontSize: 14,
        fontFamily: Fonts.Light,
        color: colors.White
    }

})


export default styles;