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
import ImageLoader from './ImageLoader'




const SolutionItem = (props) => {

    const { Item, navigation } = props
    const [isLoading, setIsLoading] = useState(false)

    return (
        // <TouchableOpacity
        //     activeOpacity={0.8}
        //     onPress={() => navigation.navigate('SolutionDetails', { Details: Item })}
        //     style={styles.mainContainer}>
        //     <Text style={styles.title}>{Item?.name}</Text>
        //     <Text numberOfLines={1} style={styles.desc}>{Item?.description}</Text>
        // </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation?.navigate('SolutionDetails', { Details: Item })}
            style={styles.mainContainer}>
            <View style={{ flex: 0.25, }}>
                <ImageLoader isLoading={isLoading} />
                <Image
                    onLoadStart={() => {
                        setIsLoading(true)
                    }}
                    onError={(error) => console.log(error)}
                    onLoadEnd={() => {
                        setIsLoading(false)

                    }}
                    source={{ uri: Item?.solution_media[0]?.image }}
                    style={styles.solutionImg} />
            </View>
            <View style={{ flex: 0.75, }}>
                <Text style={styles.title}>{Item?.name}</Text>
                <Text style={styles.desc}>{Item?.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SolutionItem;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.SecondaryTwo,
    },
    title: {
        fontSize: 19,
        fontFamily: Fonts.Regular,
        fontWeight: '600',
        color: colors.White
    },
    desc: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        opacity: 0.6,
        marginTop: 5
    },
    details: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '600',
        color: colors.Secondary,
        alignSelf: 'flex-end'
    },
    solutionImg: {
        height: 76,
        width: 76,
        borderRadius: 15,
        backgroundColor:colors.Placeholder
    },
})
