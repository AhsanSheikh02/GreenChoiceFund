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
import { CartCount, CategoryList, UserDetail } from '../../../APIConfig/Config'
import colors from '../../../Assets/Colors/Index'
import { onLogout, userDetail } from '../../../Redux/Actions/Auth'
import { NoOfCart } from '../../../Redux/Actions/Cart'


const Home = ({ navigation }) => {

    const { guest } = useSelector(state => state.Auth)
    const { isInternet } = useSelector(state => state.DeviceInfo)

    const [catList, setCatList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const dispatch = useDispatch()

    const callAPIforCartCount = () => {
        CartCount()
            .then((res) => {
                console.log(res?.data?.count);
                dispatch(NoOfCart(res?.data?.count))
            }).catch((err) => {
                console.log("callAPIforCartCount-err", err);
            })
    }

    const callAPIforCategoryList = () => {
        CategoryList().then((res) => {
            // console.log(res?.data?.list);
            setCatList(res?.data?.list)
        }).catch((err) => {
            console.log("callAPIforCategoryList-err", err);
        }).finally(() => {
            setIsLoading(false)
            setIsRefresh(false);
        })

    }
    const callAPIforUserDetail = () => {
        UserDetail().then((res) => {
            dispatch(userDetail(res?.data))
        }).catch((err) => {
            console.log("callAPIforUserDetail-err", err);
        })

    }
    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforCategoryList();
    };

    const renderItem = ({ item }) => {
        return (
            <CategoryItem
                Item={item}
                navigation={navigation}
            />
        )
    }

    useEffect(() => {
        if (!guest) {
            callAPIforUserDetail()
        }
        callAPIforCategoryList()
        callAPIforCartCount()
    }, [])

    return (
        <View style={styles.mainContainer}>
            <Header
                Title={'Categories'}
            />

            <View style={styles.innerContainer}>
                {
                    !isInternet ?
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                        :
                        <FlatList
                            data={catList}
                            extraData={catList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={(item) => renderItem(item)}
                            // style={{ width: '100%' }}
                            contentContainerStyle={{ flexGrow: 1, paddingTop: 15, justifyContent: catList.length > 0 ? 'flex-start' : 'center' }}
                            ListEmptyComponent={() => {
                                if (isLoading) {
                                    return <ActivityIndicator size={'large'} color={colors.White} />
                                }
                                return <Text style={styles.emptyListTitle}>{'No categories found'}</Text>
                            }}
                            ItemSeparatorComponent={() =>
                                <View style={{ height: 15 }}></View>
                            }
                            onRefresh={onRefresh}
                            refreshing={isRefresh}
                        />
                }

            </View>

        </View >
    )
}

export default Home;
