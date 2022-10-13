import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    TouchableOpacity

} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import Header from '../../../Components/Header'
import WishlistItem from '../../../Components/SubCategoryItem'
import colors from '../../../Assets/Colors/Index'
import { UserDetail, WishList } from '../../../APIConfig/Config'
import AppButton from '../../../Components/AppBtn'
import FullImage from '../../../Components/FullImage'


const Wishlist = ({ navigation }) => {

    const { guest } = useSelector(state => state.Auth)

    const [favoriteList, setFavoriteList] = useState([])
    const [fullImageVisible, setFullImageVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(guest === true ? false : true)
    const [isRefresh, setIsRefresh] = useState(false)


    const callAPIforWishList = () => {
        WishList().then((res) => {
            setFavoriteList(res?.data?.list)
            setIsLoading(false)
            setIsRefresh(false);
        }).catch((err) => {
            setIsLoading(false)
            setIsRefresh(false);
            console.log("callAPIforWishList-err", err);
        })

    }
    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforWishList();
    };
    const renderItem = ({ item }) => {
        return (
            <WishlistItem
                Item={item}
                deleteItem={(id) => {
                    setFavoriteList(favoriteList.filter((item) => {
                        return item.id != id
                    }))
                }}
            />
        )
    }

    useEffect(() => {
        console.log({ guest });
        if (!guest) {
            callAPIforWishList()
        }
    }, [])


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Portfolio'}
            />

            <View style={styles.innerContainer}>
                <View style={styles.infoContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setFullImageVisible(true)}
                    ><Image source={Images.About} style={styles.infoIcon} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={favoriteList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={(item) => renderItem(item)}
                    contentContainerStyle={{ flexGrow: 1, paddingTop: 45, justifyContent: favoriteList.length > 0 ? 'flex-start' : 'center' }}
                    ListEmptyComponent={() => {
                        if (isLoading) {
                            return <ActivityIndicator size={'large'} color={colors.White} />
                        }
                        return (
                            <Text style={styles.emptyListTitle}>{'No Favorites'}</Text>
                        )
                    }}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 15 }}></View>
                    }
                    onRefresh={onRefresh}
                    refreshing={isRefresh}
                />
            </View>
            <FullImage
                visible={fullImageVisible}
                infographics={true}
                onRequestClose={() => setFullImageVisible(false)}
            />
        </SafeAreaView>
    )
}

export default Wishlist;
