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
import Toast from 'react-native-tiny-toast';
// ------------------------------------------
import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'
import Images from '../Assets/Images/Index'
import { CartCount, Favorite, RemoveCart, RemoveFavorite } from '../APIConfig/Config'
import { NoOfCart } from '../Redux/Actions/Cart';




const CartItem = (props) => {

    const { Item, navigation, deleteItem = () => { } } = props
    const dispatch = useDispatch()
    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const callAPIforCartCount = () => {
        CartCount()
            .then((res) => {
                dispatch(NoOfCart(res?.data?.count))
            }).catch((err) => {
                console.log("callAPIforCartCount-err", err);
            })
    }



    const callAPIforRemoveCart = () => {
        RemoveCart(Item?.id)
            .then((res) => {
                callAPIforCartCount()
                TostMsg('Removed from Cart')
            }).catch((err) => {
                // TostMsg(err)
                console.log("callAPIforRemoveFavorite-err", err);
            })
    }




    return (
        <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation?.navigate('SolutionDetails', { Details: Item })}
            style={styles.mainContainer}>
            <View style={{ flex: 0.25, }}>
                <Image source={{ uri: Item?.solution_media[0]?.image }} style={styles.categoryImg} />
            </View>
            <View style={{ flex: 0.75, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{Item?.name}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            callAPIforRemoveCart()
                            deleteItem(Item?.id)
                        }}
                    >
                        <Image source={Images.Delete} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.desc}>{Item?.description}</Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

export default CartItem;

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
        borderRadius: 15
    },
    deleteIcon: {
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
    }
})
