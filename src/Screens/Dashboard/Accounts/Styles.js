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
        justifyContent: 'center',
        // paddingHorizontal: 16,
        paddingBottom: '10%',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 26,
        paddingVertical: 75,
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
        width: '22%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberContainer: {
        width: '78%',
        // paddingLeft:5,
        justifyContent: 'center'
    },
    countryCode: {
        fontSize: 14,
        fontFamily: Fonts.Light,
        color: colors.White
    },
    dobContainer: {
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
    dob: {
        height: '100%',
        width: '85%',
        backgroundColor: colors.textInput,
        paddingHorizontal: 8,
    },
    IconContainer: {
        height: '100%',
        width: '15%',
        backgroundColor: colors.textInput,
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarIcon: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        tintColor: colors.Secondary,
    },
    infoIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: colors.Secondary,
    },
    connection: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    accountDetailContainer: {
        width: '90%',
        justifyContent: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
    },
    checkBox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.Secondary,
        justifyContent:'center',
        alignItems:'center'
    },
    header: {
        height: 50,
        width:'90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.Secondary,
        
    },
    accountDetail:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tick:{
        height:12,
        width:12,
        tintColor:colors.White
    }


})


export default styles;