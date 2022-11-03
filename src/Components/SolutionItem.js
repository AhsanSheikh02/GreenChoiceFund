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
import { AddToCart, CartCount, Favorite, RemoveCart, RemoveFavorite } from '../APIConfig/Config'
import Toast from 'react-native-tiny-toast'
import { NoOfCart } from '../Redux/Actions/Cart'




const SolutionItem = (props) => {

    const { loggedInUserType } = useSelector(state => state.Auth)

    const { Item, navigation, deleteItem = () => { } } = props
    const [isLoading, setIsLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isAddedToCart, setisAddedToCart] = useState(false)
    const dispatch = useDispatch()

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    useEffect(() => {
        console.log(Item);
        Item?.is_wishlisted == true && (setIsFavorite(true))
        Item?.added_to_cart == true && (setisAddedToCart(true))
    }, [])

    const callAPIforAddFavorite = () => {
        setIsFavorite(true)
        TostMsg('Added to portfolio')
        Favorite(Item?.id)
            .then((res) => {

            }).catch((err) => {
                // TostMsg(err)
                console.log("callAPIforAddFavorite-err", err);
            })
    }

    const callAPIforRemoveFavorite = () => {
        setIsFavorite(false)
        TostMsg('Removed from portfolio')
        RemoveFavorite(Item?.id)
            .then((res) => {

                deleteItem(Item?.id)
            }).catch((err) => {
                TostMsg(err)
                console.log("callAPIforRemoveFavorite-err", err);
            })
    }

    const callAPIforAddToCart = () => {
        setisAddedToCart(true)
        TostMsg('Added to Cart')
        AddToCart(Item?.id)
            .then((res) => {
                callAPIforCartCount()
            }).catch((err) => {
                TostMsg(err)
                console.log("callAPIforAddToCart-err", err);
            })
    }

    const callAPIforCartCount = () => {
        CartCount().then((res) => {
            dispatch(NoOfCart(res?.data?.count))
        }).catch((err) => {
            console.log("callAPIforCartCount-err", err);
        })
    }

    const callAPIforRemoveCart = () => {
        setisAddedToCart(false)
        TostMsg('Removed from Cart')
        RemoveCart(Item?.id)
            .then((res) => {
                callAPIforCartCount()
            }).catch((err) => {
                TostMsg(err)
                console.log("callAPIforRemoveFavorite-err", err);
            })
    }

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
                <View style={styles.solutionImg}>

                    {
                        Item?.solution_media[0]?.image ?
                            <>
                                <ImageLoader isLoading={isLoading} />
                                <Image
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
                                    source={{ uri: Item?.solution_media[0]?.image }} style={styles.solutionImg} />

                            </>
                            :
                            <Image source={Images.Fallback} style={styles.fallbackImg} resizeMode='contain' />
                    }
                </View>
            </View>
            <View style={{ flex: 0.65, paddingHorizontal: 10 }}>
                <Text style={styles.title}>{Item?.name}</Text>
                <Text style={styles.desc}>{Item?.description}</Text>
            </View>

            <View style={{ flex: 0.15, }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        isFavorite ?
                            callAPIforRemoveFavorite()
                            :
                            callAPIforAddFavorite()
                    }}
                    style={{ height: 32, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={isFavorite ? Images.Favorite : Images.Non_Favorite} style={styles.icon} resizeMode='contain' />
                </TouchableOpacity>

                {
                    loggedInUserType === '1' &&
                    <TouchableOpacity
                        onPress={() => {
                            isAddedToCart ?
                                callAPIforRemoveCart()
                                :
                                callAPIforAddToCart()
                        }}
                        activeOpacity={0.8}
                        style={{ height: 32, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: loggedInUserType === '1' ? 10 : 0 }}>
                        <Image source={isAddedToCart ? Images.AddedToCart : Images.AddToCart} style={styles.icon} resizeMode='contain' />
                    </TouchableOpacity>
                }
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
        backgroundColor: colors.Placeholder,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackImg: {
        height: '60%',
        width: '60%',
    },
    icon: {
        height: 25,
        width: 25,
        tintColor: colors.White
    }
})
