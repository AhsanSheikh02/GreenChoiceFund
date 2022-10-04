import React, { useEffect, useState } from 'react'
import {
    Image,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
    FlatList,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import styles from './Styles'
import colors from '../../../Assets/Colors/Index'
import Header from '../../../Components/Header'
import { SubCategoryList } from '../../../APIConfig/Config'
import SubCategoryItem from '../../../Components/SubCategoryItem'
import Images from '../../../Assets/Images/Index'

const SubCategories = ({ navigation, route }) => {

    const Id = route?.params?.categoryId || ''
    const { isInternet } = useSelector(state => state.DeviceInfo)

    const [subCatList, setSubCatList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        callAPIforSubCategoryList()
    }, [])

    const callAPIforSubCategoryList = () => {
        SubCategoryList(Id).then((res) => {
            // console.log(res?.data?.list);
            setSubCatList(res?.data?.list)
        }).catch((err) => {
            console.log("callAPIforSubCategoryList-err", err);
        }).finally(() => {
            setIsLoading(false)
            setIsRefresh(false)
        })

    }

    const renderItem = ({ item }) => {
        return (
            <SubCategoryItem
                Item={item}
                navigation={navigation}
            />
        )
    }

    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforSubCategoryList();
    };

    return ( 
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Sub Categories'}
                isLeftIcon={true}
                navigation={navigation}
            />

            <View style={styles.innerContainer}>
                { 
                    !isInternet ?
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                        :
                        <FlatList
                            data={subCatList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={(item) => renderItem(item)}
                            // style={{ width: '100%' }}
                            contentContainerStyle={{ flexGrow: 1, paddingTop: 15, justifyContent: subCatList.length > 0 ? 'flex-start' : 'center' }}
                            ListEmptyComponent={() => {
                                if (isLoading) {
                                    return <ActivityIndicator size={'large'} color={colors.White} />
                                }
                                return <Text style={styles.emptyListTitle}>{'No Sub-Catogaries found'}</Text>
                            }}
                            ItemSeparatorComponent={() =>
                                <View style={{ height: 15 }}></View>
                            }
                            onRefresh={onRefresh}
                            refreshing={isRefresh}
                        />
                }
            </View>
        </SafeAreaView>
    )
}

export default SubCategories;
