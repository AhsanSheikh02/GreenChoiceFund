import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    SafeAreaView,
    TextInput,
    Keyboard,
    Pressable,
    ActivityIndicator,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-tiny-toast';

import styles from './Styles'
import colors from '../../../Assets/Colors/Index'
import Header from '../../../Components/Header'
import Images from '../../../Assets/Images/Index'
import Fonts from '../../../Assets/Fonts/Index'
import { AllUserInvestments } from '../../../APIConfig/Config';
import InvestmentItem from '../../../Components/InvestmentItem';


const width = Dimensions.get('window').width

const AllInvestments = ({ navigation, route }) => {

    const { isInternet } = useSelector(state => state.DeviceInfo)

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }
    const [isVisible, setIsVisible] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [investmentsList, setInvestmentsList] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(null)

    useEffect(() => {
        if (isInternet) {
            setTimeout(() => {
                setIsVisible(true)
            }, 1500);
        }
    }, [isInternet])

    useEffect(() => {
        callAPIforRecentInvestments()
    }, [])



    const callAPIforRecentInvestments = () => {
        AllUserInvestments()
            .then((res) => {
                setInvestmentsList(res?.data?.list)
            }).catch((err) => {
                Toast.hide()
                TostMsg(err)
                console.log("callAPIforLinkToken-err", err);
            }).finally(() => {
                setIsLoading(false)
                setIsRefresh(false)
            })

    }



    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforAccounts();
    };

    const renderItem = ({ item, index }) => {
        return (
            <InvestmentItem
                Item={item}
                navigation={navigation} />
        )
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Recent Investments'}
                isLeftIcon={true}
                navigation={navigation}
            />

            <View style={styles.innerContainer}>
                {
                    !isInternet ?
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                        :
                        <FlatList
                            data={investmentsList}
                            extraData={investmentsList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item?.id}
                            renderItem={(item) => renderItem(item)}
                            contentContainerStyle={{ flexGrow: 1, paddingTop: 15, justifyContent: investmentsList.length > 0 ? 'flex-start' : 'center' }}
                            ListEmptyComponent={() => {
                                if (isLoading) {
                                    return <ActivityIndicator size={'large'} color={colors.White} />
                                }
                                return <Text style={styles.emptyListTitle}>{'No recent investments!'}</Text>
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

export default AllInvestments;
