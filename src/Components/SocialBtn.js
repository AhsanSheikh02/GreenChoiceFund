import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'

import colors from '../Assets/Colors/Index'

const SocialButton = (props) => {

    const { img, style, onPress } = props
    return (

        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.mainContainer]} >
            <Image source={img} style={style} />
        </TouchableOpacity>

    )
}

export default SocialButton

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#172047'
    },
})
