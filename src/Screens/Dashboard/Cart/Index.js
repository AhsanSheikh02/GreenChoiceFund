import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    SafeAreaView

} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import Header from '../../../Components/Header'
import CategoryItem from '../../../Components/CategoryItem'
import { CartList, CategoryList, UserDetail } from '../../../APIConfig/Config'
import colors from '../../../Assets/Colors/Index'
import { userDetail } from '../../../Redux/Actions/Auth'
import CartItem from '../../../Components/CartItem'
import AppButton from '../../../Components/AppBtn'
import { useIsFocused } from '@react-navigation/native'


const Cart = ({ navigation }) => {

    const { guest } = useSelector(state => state.Auth)
    const { isInternet } = useSelector(state => state.DeviceInfo)

    const [cartList, setCartList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()


    useEffect(() => {
        callAPIforCartList()
    }, [isFocused])

    const callAPIforCartList = () => {
        CartList().then((res) => {
            setIsLoading(false)
            setIsRefresh(false);
            setCartList(res?.data?.list)
        }).catch((err) => {
            setIsLoading(false)
            setIsRefresh(false);
            console.log("callAPIforCartList-err", err);
        })

    }

    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforCartList();
    };

    const renderItem = ({ item }) => {
        return (
            <CartItem
                Item={item}
                navigation={navigation}
                deleteItem={(id) => {
                    setCartList(cartList.filter((item) => {
                        return item.id != id
                    }))
                }}
            />
        )
    }



    return (
        <View style={styles.mainContainer}>
            <Header
                Title={'Cart'}
            />

            <View style={styles.innerContainer}>
                {
                    !isInternet ?
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                        :
                        <View style={{ flex: 0.88 }}>
                            <FlatList
                                data={cartList}
                                extraData={cartList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                renderItem={(item) => renderItem(item)}
                                // style={{ width: '100%' }}
                                contentContainerStyle={{ flexGrow: 1, paddingTop: 15, justifyContent: cartList.length > 0 ? 'flex-start' : 'center' }}
                                ListEmptyComponent={() => {
                                    if (isLoading) {
                                        return <ActivityIndicator size={'large'} color={colors.White} />
                                    }
                                    return <Text style={styles.emptyListTitle}>{'No added items'}</Text>
                                }}
                                ItemSeparatorComponent={() =>
                                    <View style={{ height: 15 }}></View>
                                }
                                onRefresh={onRefresh}
                                refreshing={isRefresh}
                            />
                        </View>
                }
                {
                    cartList.length > 0 &&
                    <View style={{ position: 'absolute', bottom: 115, alignSelf: 'center', width: '100%', }}>
                        <AppButton
                            label={"Checkout"}
                            style={styles.btnStyle}
                            labelStyle={styles.label}
                            onPress={() => {
                                navigation.navigate('Terms')
                            }}
                        />
                    </View>
                }

            </View>

        </View >
    )
}

export default Cart;
