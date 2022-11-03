import React, { useEffect, useState } from 'react'
import {
    Image,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import SimpleToast from 'react-native-simple-toast'

import styles from './Styles'
import colors from '../../../Assets/Colors/Index'
import Header from '../../../Components/Header'
import SolutionItem from '../../../Components/SolutionItem'
import { SolutionList } from '../../../APIConfig/Config'
import Images from '../../../Assets/Images/Index'


const Solutions = ({ navigation, route }) => {

    const {categoryId}  = route?.params || ''
    const { isInternet } = useSelector(state => state.DeviceInfo)

    const [solutionList, setSolutionList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        console.log({categoryId});
        callAPIforSolutionsList()
    }, [])

    const callAPIforSolutionsList = () => {
        SolutionList(categoryId).then((res) => {
            // console.log(res?.data?.list[0]);
            setSolutionList(res?.data?.list)
            setIsLoading(false)
            setIsRefresh(false)
        }).catch((err) => {
            setIsLoading(false)
            setIsRefresh(false)
            console.log("callAPIforSolutionsList-err", err);
        })

    }


    const renderItem = ({ item }) => {
        // console.log('renderItem', item);

        return (
            <SolutionItem
                Item={item}
                navigation={navigation}
            />
        )
    }
    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforSolutionsList();
    };




    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Solutions'}
                isLeftIcon={true}
                navigation={navigation}
            />

            <View style={styles.innerContainer}>
                {
                    !isInternet ?
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                        :
                        <FlatList
                            data={solutionList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={(item) => renderItem(item)}
                            contentContainerStyle={{ flexGrow: 1, paddingTop: 15, justifyContent: solutionList.length > 0 ? 'flex-start' : 'center' }}
                            ListEmptyComponent={() => {
                                if (isLoading) {
                                    return <ActivityIndicator size={'large'} color={colors.White} />
                                }
                                return <Text style={styles.emptyListTitle}>{'No Solutions found'}</Text>
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

export default Solutions;
