import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'

import { useState, useCallback } from 'react';
// --------------------------------------------

import colors from '../Assets/Colors/Index';
import Images from '../Assets/Images/Index'
import Fonts from '../Assets/Fonts/Index';
// import Strings from '../../Assets/Strings/Index'


const Project = (props) => {

    const { Item, navigation, username, showBtns } = props

    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);

    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }



    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>
                    {'Project Type: '}
                </Text>
                <Text
                    numberOfLines={1}
                    style={styles.desc}>
                    {Item?.type}
                </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title} >{'Start Date: '}</Text>
                <Text style={styles.desc} >{Item?.attributes?.start_date}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => navigation.navigate('ProjectDetails',
                    {
                        projectId: Item?.id,
                        username: username,
                        showBtns: showBtns
                    })}
                style={{ alignSelf: 'flex-end' }}
            >
                <Text style={{ fontSize: 12, color: colors.Secondary, marginTop: 5 }} >{'View Details'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Project;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        // height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.Light,
        borderWidth: 1,
        borderColor: colors.Primary,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    title: {
        width: '30%',
        fontSize: 14,
        color: colors.Dark,
        fontFamily: Fonts.SemiBold
    },
    desc: {
        width: '70%',
        fontSize: 14,
        color: colors.Dark,
        fontFamily: Fonts.Regular
    }

})


