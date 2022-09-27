import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import SimpleToast from 'react-native-simple-toast'

import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'
import Images from '../Assets/Images/Index'




const Header = (props) => {

    const { Title, isLeftIcon, navigation } = props

    return (
        <View style={styles.mainContainer}>
            {
                isLeftIcon &&
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ position: 'absolute', left: 15, bottom: 12, justifyContent:'center', alignItems:'center', height: 25, width: 25,}} onPress={() => navigation.goBack()}>
                    <Image source={Images.Back} style={styles.backIcon} />
                </TouchableOpacity>
            }
            <Text style={styles.title}>{Title}</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    mainContainer: {
        height: 80,
        width: '100%',
        backgroundColor: colors.SecondaryTwo,
        // justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.White,
        zIndex: 999
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.Regular,
        fontWeight: '500',
        color: colors.White,
        position: 'absolute',
        bottom: 12
    },
    backIcon: {
        height: 16,
        width: 15,
        resizeMode: 'contain',
        tintColor: colors.White,
    }
})
