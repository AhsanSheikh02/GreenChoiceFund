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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';

import styles from './Styles'
import colors from '../../../Assets/Colors/Index'
import Header from '../../../Components/Header'
import CarouselDots from '../../../Components/CarouselDots'
import AppButton from '../../../Components/AppBtn'
import InputField from '../../../Components/InputField'
import CountryPickerModal from '../../../Components/CountryPicker'
import Images from '../../../Assets/Images/Index'
import Fonts from '../../../Assets/Fonts/Index'
import AlertModal from '../../../Components/AlertModal'
import FullImage from '../../../Components/FullImage'
import { CreateLinkToken, Investment, UserAccounts } from '../../../APIConfig/Config';


const width = Dimensions.get('window').width

const Accounts = ({ navigation, route }) => {

    const { isInternet } = useSelector(state => state.DeviceInfo)
    const { accessToken, detailObj } = route?.params

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [isRefresh, setIsRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [accountsList, setAccountsList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [fullImageVisible, setFullImageVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState('')

    useEffect(() => {
        if (isInternet) {
            setTimeout(() => {
                setIsVisible(true)
            }, 1500);
        }
    }, [isInternet])

    useEffect(() => {
        callAPIforAccounts()
        // console.log({ accessToken });
        // console.log({ detailObj });
    }, [])



    const callAPIforAccounts = () => {
        UserAccounts(accessToken)
            .then((res) => {
                // console.log('accounts......',res?.data?.accounts);
                setAccountsList(res?.data?.accounts)
            }).catch((err) => {
                Toast.hide()
                TostMsg(err)
                console.log("callAPIforLinkToken-err", err);
            }).finally(() => {
                setIsLoading(false)
                setIsRefresh(false)
            })

    }

    const callAPIforInvestment = () => {
        Toast.showLoading("Please wait..")
        Investment(
            detailObj?.name,
            detailObj?.email,
            detailObj?.code,
            detailObj?.number,
            detailObj?.address,
            detailObj?.dob,
            detailObj?.amount,
            detailObj?.itemId,
            selectedAccount?.account_id,
            accessToken
        ).then((res) => {
            Toast.hide()
            TostMsg('Paid Successfully')
            setTimeout(() => {
                navigation.pop(2)
            }, 1000);
        }).catch((err) => {
            Toast.hide()
            // TostMsg(err)
            console.log("callAPIforInvestment-err", err);
        })

    }

    const onRefresh = () => {
        setIsRefresh(true);
        callAPIforAccounts();
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={[styles.accountDetailContainer, { borderBottomWidth: index == accountsList.length - 1 ? 0 : 0.4, borderBottomColor: colors.White }]}>

                    <View style={styles.accountDetail}>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{item?.name}</Text>
                    </View>
                    <View style={styles.accountDetail}>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{'$' + item?.balances?.available}</Text>
                    </View>
                    <View style={styles.accountDetail}>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{item?.subtype}</Text>
                    </View>
                    <View style={styles.accountDetail}>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{item?.mask}</Text>
                    </View>

                </View>
                <View style={{ width: '7%' }}>
                    <TouchableOpacity
                        style={[styles.checkBox, { backgroundColor: selectedAccount?.account_id == item?.account_id ? colors.Secondary : 'transparent' }]}
                        activeOpacity={0.6}
                        onPress={() => {
                            setIsChecked(!isChecked)
                            setSelectedAccount(item)
                        }}
                    >
                        {selectedAccount?.account_id == item?.account_id && <Image source={Images.Check} style={styles.tick} />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    const listHeaderComponent = () => {
        return (
            <View style={styles.header}>
                <View style={[styles.titleContainer, { borderRightWidth: 0.6, borderRightColor: colors.White }]}>
                    <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{'Name'}</Text>
                </View>
                <View style={[styles.titleContainer, { borderRightWidth: 0.6, borderRightColor: colors.White }]}>
                    <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{'Balance'}</Text>
                </View>
                <View style={[styles.titleContainer, { borderRightWidth: 0.6, borderRightColor: colors.White }]}>
                    <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{'SubType'}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={{ fontSize: 15, fontFamily: Fonts.Regular, fontWeight: '800', color: colors.White }}>{'Mask'}</Text>
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Accounts'}
                isLeftIcon={true}
                navigation={navigation}
            />
            {
                !isInternet ?
                    <View style={styles.innerContainer}>
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                    </View>
                    :

                    <View style={{ flex: 0.88, paddingHorizontal: 16 }}>
                        <FlatList
                            data={accountsList}
                            extraData={accountsList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.account_id}
                            renderItem={(item) => renderItem(item)}
                            contentContainerStyle={{ flexGrow: 1, paddingTop: 15, justifyContent: accountsList.length > 0 ? 'flex-start' : 'center' }}
                            ListHeaderComponent={listHeaderComponent}
                            ListEmptyComponent={() => {
                                if (isLoading) {
                                    return <ActivityIndicator size={'large'} color={colors.White} />
                                }
                                return <Text style={styles.emptyListTitle}>{'No accounts found!'}</Text>
                            }}
                            ItemSeparatorComponent={() =>
                                <View style={{ height: 5 }}></View>
                            }
                            onRefresh={onRefresh}
                            refreshing={isRefresh}
                        />
                    </View>
            }
            <View style={{ position: 'absolute', bottom: 25, alignSelf: 'center', width: '100%', paddingHorizontal: 16 }}>
                <AppButton
                    label={"PAY NOW"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => {
                        callAPIforInvestment()
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Accounts;
