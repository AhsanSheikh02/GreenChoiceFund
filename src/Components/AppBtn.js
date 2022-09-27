import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
//import LinearGradient from 'react-native-linear-gradient';


import colors from '../Assets/Colors/Index'
import Loader from './Loader'

const AppButton = (props) => {

    const { style, onPress, labelStyle, label, icon, disable } = props
    return (

        <TouchableOpacity
            disabled={disable}
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.mainContainer, style]} >
            {
                icon &&
                <Image source={icon} style={styles.btnImage} />
            }
            <Text style={[styles.btnText, labelStyle]}>{label}</Text>
        </TouchableOpacity>

    )
}

export default AppButton

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 10,
        flexDirection: 'row',
        borderRadius: 12
    },
    btnText: {
        color: colors.Light,
        fontSize: 15,
    },
    btnImage: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
        marginRight: 12
    }
})
