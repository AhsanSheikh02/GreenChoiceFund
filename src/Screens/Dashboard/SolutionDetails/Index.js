import React, { useEffect, useRef, useState } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Dimensions,
    ScrollView,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-tiny-toast';

import styles from './Styles'
import Header from '../../../Components/Header'
import CarouselDots from '../../../Components/CarouselDots'
import AppButton from '../../../Components/AppBtn'
import FullImage from '../../../Components/FullImage'
import Images from '../../../Assets/Images/Index'
import { SelectedImage } from '../../../Redux/Actions/SplashMetaData'
import { AddToCart, CartCount } from '../../../APIConfig/Config'
import colors from '../../../Assets/Colors/Index';
import { NoOfCart } from '../../../Redux/Actions/Cart';
import ImageLoader from '../../../Components/ImageLoader';

const width = Dimensions.get('window').width

const SolutionDetails = ({ navigation, route }) => {

    const Details = route?.params?.Details || ''
    const { isInternet } = useSelector(state => state.DeviceInfo)
    const { noOfCartItems } = useSelector(state => state.Cart)
    const { loggedInUserType } = useSelector(state => state.Auth)

    const [indicator, setIndicator] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [fullImageVisible, setFullImageVisible] = useState(false)
    const [added, setAdded] = useState(false)
    const listRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log({ noOfCartItems });
    }, [noOfCartItems])

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setIndicator(pageNum)
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    dispatch(SelectedImage(index))
                    setFullImageVisible(true)
                }}
                style={{ width: width }} >
                <ImageLoader isLoading={isLoading} />
                <Image
                    source={{ uri: item?.image }}
                    style={styles.imageStyle}
                    resizeMode="cover"
                    onLoadStart={() => {
                        setIsLoading(true)
                    }}
                    onError={(error) => console.log(error)}
                    onLoadEnd={() => {
                        setIsLoading(false)

                    }} >
                </Image>
            </TouchableOpacity>
        )
    };

    const callAPIforCartCount = () => {
        CartCount()
            .then((res) => {
                console.log(res?.data?.count);
                dispatch(NoOfCart(res?.data?.count))
            }).catch((err) => {
                console.log("callAPIforCartCount-err", err);
            })
    }

    const callAPIforAddToCart = () => {
        Toast.showLoading("Please wait..")
        AddToCart(Details?.id)
            .then((res) => {
                Toast.hide()
                setAdded(true)
                callAPIforCartCount()
                TostMsg('Added to Cart')
            }).catch((err) => {
                console.log("callAPIforAddToCart-err", err);
            })
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Solution Details'}
                isLeftIcon={true}
                navigation={navigation}
            />

            <View style={styles.innerContainer}>
                {
                    !isInternet ?
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                        :
                        <View style={{ flex: 0.92 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                            // contentContainerStyle={{ paddingBottom: '25%' }}
                            >
                                <View style={styles.imageContainer}>
                                    <FlatList
                                        scrollEnabled={true}
                                        pagingEnabled={true}
                                        ref={listRef}
                                        horizontal
                                        data={Details?.solution_media}
                                        keyExtractor={(item, index) => `${item.id}_${index}`}
                                        scrollEventThrottle={1900}
                                        onMomentumScrollEnd={(e) => onScrollEnd(e)}
                                        renderItem={renderItem}
                                        showsHorizontalScrollIndicator={false}
                                    // contentContainerStyle={{ backgroundColor: 'red' }}
                                    />
                                </View>
                                {
                                    Details?.solution_media?.length > 1 &&
                                    <CarouselDots
                                        selectedIndex={indicator}
                                        count={Details?.solution_media?.length}
                                        style={{ alignSelf: 'center' }}
                                    />
                                }

                                <View style={[styles.detailContainer, { marginTop: Details?.solution_media?.length > 1 ? 0 : 20 }]}>
                                    <Text style={styles.Title}>{Details?.name}</Text>
                                    <Text style={styles.Desc}>{Details?.description}</Text>
                                </View>


                            </ScrollView>
                        </View>
                }
                <View style={{ position: 'absolute', bottom: 115, alignSelf: 'center', width: '100%', paddingHorizontal: 16 }}>
                    {
                        loggedInUserType === '1' &&
                        <AppButton
                            disable={added}
                            label={added ? "Added to cart":"Add to cart"}
                            style={{ backgroundColor: added ? 'grey' : colors.Secondary, }}
                            labelStyle={styles.label}
                            onPress={() => {
                                callAPIforAddToCart()

                            }}
                        />
                    }
                </View>
            </View>

            <FullImage
                visible={fullImageVisible}
                list={Details?.solution_media}
                onRequestClose={() => setFullImageVisible(false)}
            />
        </SafeAreaView>
    )
}

export default SolutionDetails;
