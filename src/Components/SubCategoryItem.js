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
import Toast from 'react-native-tiny-toast';
// ------------------------------------------
import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'
import Images from '../Assets/Images/Index'
import { Favorite, RemoveFavorite } from '../APIConfig/Config'
import ImageLoader from './ImageLoader';




const SubCategoryItem = (props) => {

    const { Item, navigation, deleteItem = () => { } } = props
    const [isLoading, setIsLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    useEffect(() => {
        console.log(Item);
        Item?.is_wishlisted == true &&
            setIsFavorite(true)
    }, [])

    const callAPIforAddFavorite = () => {
        Favorite(Item?.id)
            .then((res) => {
                TostMsg('Added to favorites')
                setIsFavorite(true)
            }).catch((err) => {
                // TostMsg(err)
                console.log("callAPIforAddFavorite-err", err);
            })




    }
    const callAPIforRemoveFavorite = () => {
        RemoveFavorite(Item?.id)
            .then((res) => {
                TostMsg('Removed from favorites')
                setIsFavorite(false)
                deleteItem(Item?.id)
            }).catch((err) => {
                // TostMsg(err)
                console.log("callAPIforRemoveFavorite-err", err);
            })




    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation?.navigate('Solutions', { subCatId: Item?.id })}
            style={styles.mainContainer}>
            <View style={{ flex: 0.25, }}>
                <ImageLoader
                    isLoading={isLoading}
                />
                {/* <Image
                    source={{ uri: Item?.sub_category_media[0]?.image }}
                    style={styles.categoryImg}
                    onLoadStart={() => {
                        setIsLoading(true)
                    }}
                    onError={(error) => console.log(error)}
                    onLoadEnd={() => {
                        setIsLoading(false)

                    }}
                /> */}

                {
                    !Item?.sub_category_media[0]?.image ?
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
                                source={{ uri: Item?.sub_category_media[0]?.image }} style={styles.categoryImg} />

                        </>
                        :
                        <Image source={Images.Fallback} style={styles.fallbackImg} resizeMode='contain' />
                }
            </View>
            <View style={{ flex: 0.75, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{Item?.name}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            isFavorite ?
                                callAPIforRemoveFavorite()
                                :
                                callAPIforAddFavorite()
                        }}
                    >
                        <Image source={isFavorite ? Images.Favorite : Images.Non_Favorite} style={styles.favoriteIcon} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.desc}>{Item?.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SubCategoryItem;

const styles = StyleSheet.create({
    mainContainer: {
        // height: 100,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.SecondaryTwo,
    },
    categoryImg: {
        height: 76,
        width: 76,
        borderRadius: 15,
        backgroundColor: colors.Placeholder
    },
    favoriteIcon: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
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
    fallbackImg: {
        height: '70%',
        width: '70%',
    },
})
