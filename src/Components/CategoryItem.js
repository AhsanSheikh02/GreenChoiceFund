import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import SimpleToast from 'react-native-simple-toast'
import Video from 'react-native-video'

import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'
import ImageLoader from './ImageLoader'
import Images from '../Assets/Images/Index'




const CategoryItem = (props) => {
    const { Item, navigation } = props
    const [isLoading, setIsLoading] = useState(false)
    const [loaderOpacity, setLoaderOpacity] = useState(0)


    const onLoadStart = () => {
        setLoaderOpacity(1)
    }

    const onLoad = () => {
        setLoaderOpacity(0)
    }

    const onBuffer = ({ isBuffering }) => {
        console.log({ isBuffering });
        setLoaderOpacity(isBuffering ? 1 : 0)
    }


    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Solutions', { categoryId: Item?.id })}
            style={styles.mainContainer}>

            <View style={{
                height: '75%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: colors.Placeholder
            }}>

                {
                    (Item?.category_media[0]?.image && Item?.category_media[0]?.type === 'video') ?
                        < >
                            <Video
                                source={{ uri: Item?.category_media[0]?.image }}
                                onBuffer={onBuffer}
                                onLoadStart={onLoadStart}
                                onLoad={onLoad}
                                repeat
                                style={{ height: '100%', width: '100%',borderTopRightRadius:15,borderTopLeftRadius:15 }}
                                resizeMode={'cover'}


                            // onLoadStart={() => {
                            //     setIsLoading(true)
                            // }}
                            // onLoadEnd={() => {
                            //     setIsLoading(false)
                            // }}
                            // onReadyForDisplay={() => {
                            //     setIsLoading(false)
                            // }}

                            />

                            {/* <ImageLoader
                                isLoading={isLoading}
                                opacity={loaderOpacity}
                            /> */}

                        </>
                        :
                        (
                            (Item?.category_media[0]?.image && (Item?.category_media[0]?.type === 'image' || Item?.category_media[0]?.type === 'gif')) ?
                                <>
                                    <ImageLoader
                                        isLoading={isLoading}
                                    />
                                    <Image
                                        onBuffer
                                        onLoadStart={onLoadStart}
                                        onLoad={onLoad}
                                        onError={(error) => console.log(error)}
                                      
                                        source={{ uri: Item?.category_media[0]?.image }} style={styles.categoryImg} />

                                </>
                                :
                                <Image source={Images.Fallback} style={styles.fallbackImg} resizeMode='contain' />
                        )
                }

            </View>

            <View style={{ height: '25%', paddingHorizontal: 22, justifyContent: 'center' }}>
                <Text style={styles.title}>{Item?.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryItem;

const styles = StyleSheet.create({
    mainContainer: {
        height: 250,
        width: '100%',
        borderRadius: 15,
        backgroundColor: colors.SecondaryTwo,
    },
    categoryImg: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.Regular,
        fontWeight: '500',
        color: colors.White
    },
    fallbackImg: {
        height: '70%',
        width: '70%',
    },
})
