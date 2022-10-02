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

import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'
import ImageLoader from './ImageLoader'
import Images from '../Assets/Images/Index'




const CategoryItem = (props) => {
    const { Item, navigation } = props
    const [isLoading, setIsLoading] = useState(false)


    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SubCategories', { categoryId: Item?.id })}
            style={styles.mainContainer}>

            <View style={{
                height: '75%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: colors.Placeholder
            }}>

                {
                    Item?.category_media[0]?.image ?
                        <>
                            <ImageLoader
                                isLoading={isLoading}
                            />
                            <Image
                                // loadingIndicatorSource={() => {
                                //     return (
                                //         <ActivityIndicator
                                //             size='small'
                                //             color={colors.Secondary}
                                //             style={{display: (isLoading) ? 'flex' : 'none'}}
                                //             // animating={isLoading}
                                //         />
                                //     )
                                // }}
                                onLoadStart={() => {
                                    setIsLoading(true)
                                }}
                                // onLoad={() => {
                                //     setIsLoading(false)
                                // }}
                                onError={(error) => console.log(error)}
                                onLoadEnd={() => {
                                    setIsLoading(false)

                                }}
                                source={{ uri: Item?.category_media[0]?.image }} style={styles.categoryImg} />

                        </>
                        :
                        <Image source={Images.Fallback} style={styles.fallbackImg} resizeMode='contain' />
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
        width:'70%',
    },
})
