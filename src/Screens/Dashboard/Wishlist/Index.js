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
import WishlistItem from '../../../Components/SolutionItem'
import colors from '../../../Assets/Colors/Index'
import { UserDetail, WishList } from '../../../APIConfig/Config'
import AppButton from '../../../Components/AppBtn'
import FullImage from '../../../Components/FullImage'
import ImageLoader from '../../../Components/ImageLoader'


const Wishlist = ({ navigation }) => {

    const { guest } = useSelector(state => state.Auth)
    const { infographic } = useSelector(state => state.Splash);

    const [favoriteList, setFavoriteList] = useState([])
    const [fullImageVisible, setFullImageVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(guest === true ? false : true)
    const [imageLoading, setImageLoading] = useState(false)
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
                navigation={navigation}
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

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setFullImageVisible(true)}
                    style={styles.infoContainer}>
                    <View style={{ flex: 0.25, }}>
                        <View style={styles.infoImg}>

                            {
                                infographic ?
                                    <>
                                        <ImageLoader isLoading={isLoading} />
                                        <Image
                                            onLoadStart={() => {
                                                setImageLoading(true)
                                            }}
                                            // onLoad={() => {
                                            //     setIsLoading(false)
                                            // }}
                                            onError={(error) => console.log(error)}
                                            onLoadEnd={() => {
                                                setImageLoading(false)

                                            }}
                                            source={{ uri: infographic }} style={styles.solutionImg} />

                                    </>
                                    :
                                    <Image source={Images.Fallback} style={styles.fallbackImg} resizeMode='contain' />
                            }
                        </View>
                    </View>
                    <View style={{ flex: 0.75, paddingHorizontal: 10, justifyContent: 'center' }}>
                        <Text style={styles.title}>{'Infographics'}</Text>
                    </View>
                </TouchableOpacity>

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
