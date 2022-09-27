import { StyleSheet, Dimensions } from 'react-native'
import Fonts from '../../../Assets/Fonts/Index';
import colors from '../../../Assets/Colors/Index';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.Primary
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: '25%',
    },
    pdf: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor:colors.White
    },
    btnStyle: {
        width: '45%',
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
        alignItems: 'center',
        position:'absolute',
        bottom:50,
        zIndex:999,
        paddingHorizontal:16
    }


})


export default styles;