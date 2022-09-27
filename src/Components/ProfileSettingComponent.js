import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native'

import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'

const ProfileSettingComponent = (props) => {

    const { Title, containerStyle, Icon, IconStyle, onPress } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.mainContainer, containerStyle]}>
            <Image source={Icon} style={[styles.leftIcon, IconStyle]} />
            <Text style={styles.title}>{Title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileSettingComponent;

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.SecondaryTwo,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        fontWeight: '500',
        color: colors.White,
        opacity: 0.6,
        marginLeft: 24
    },
    leftIcon: {
        height: 19,
        width: 19,
        resizeMode: 'contain'
    }
})
