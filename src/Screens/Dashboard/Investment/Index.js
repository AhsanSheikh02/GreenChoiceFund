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
import { CreateLinkToken, SetAccessToken } from '../../../APIConfig/Config';


const width = Dimensions.get('window').width

const Investment = ({ navigation, route }) => {

    const { isInternet } = useSelector(state => state.DeviceInfo)

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [indicator, setIndicator] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [code, setCode] = useState('1')
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [symbol, setSymbol] = useState('$')
    const [dob, setDob] = useState(new Date())
    const [age, setAge] = useState(0)
    const [isAllInfo, setIsAllInfo] = useState(false)
    const [linkToken, setLinkToken] = useState('')
    const [isCountryModal, setIsCountryModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [fullImageVisible, setFullImageVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState('')
    const { loggedInUserDetails } = useSelector(state => state.Auth)

    const listRef = useRef(null)
    const nameRef = useRef()
    const numberRef = useRef()
    const addressRef = useRef()
    const amountRef = useRef()
    const timeout = useRef(null);

    useEffect(() => {
        if (isInternet) {
            setTimeout(() => {
                setIsVisible(true)
            }, 1500);
        }
    }, [isInternet])

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age

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
                    setSelectedIndex(index)
                    setFullImageVisible(true)
                }} style={{ width: width }} >
                <Image source={{ uri: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' }} style={styles.imageStyle} resizeMode="cover" >
                </Image>
            </TouchableOpacity>
        )
    };

    const callAPIforLinkToken = () => {
        if (name === '') {
            TostMsg('Name is required')
        } else if (number === '') {
            TostMsg('Phone No is required')
        } else if (amount === '') {
            TostMsg('Amount is required')
        } else if (amount > 25000) {
            console.log(amount);
            TostMsg('Amount can not be greater than 25000')
        } else if (address === '') {
            TostMsg('Address is required')
        } else if (getAge(dob) <= 15) {
            console.log(age);
            TostMsg('You must be over 18 for this program')
        } else {
            setIsAllInfo(true)
            Toast.showLoading("Please wait..")
            // console.log(name, email, password, confirmPass, deviceToken, deviceId, platformId);
            // return false
            CreateLinkToken()
                .then((res) => {
                    Toast.hide()
                    setLinkToken(res?.data?.link_token)
                    // setTimeout(() => {
                    //     if (res?.data?.user?.user_type_id === '1') {
                    //         navigation.navigate('HomeStack')
                    //     } else {
                    //         navigation.navigate('OnBoarding')
                    //     }
                    // }, 250);

                }).catch((err) => {
                    Toast.hide()
                    TostMsg(err)
                    console.log("callAPIforLinkToken-err", err);
                })

        }


    }

    const callAPIforAccessToken = (metaData) => {
        Toast.showLoading("Please wait..")
        SetAccessToken(metaData?.public_token)
            .then((res) => {
                Toast.hide()
                setTimeout(() => {
                    navigation.navigate('Accounts', {
                        accessToken: res?.data?.access_token,
                        detailObj: {
                            name: name,
                            email: loggedInUserDetails?.email,
                            code: code,
                            number: number,
                            address: address,
                            dob: moment(dob).format('DD-MM-YYYY'),
                            amount: amount,
                        }
                    })
                }, 350);
            }).catch((err) => {
                Toast.hide()
                TostMsg(err)
                console.log("callAPIforLinkToken-err", err);
            })

    }


    const onChangeHandler = (value) => {
        let dollar = '$'
        if (value != '') {
            value.slice(1)
            clearTimeout(timeout.current);
            setAmount(value);
            timeout.current = setTimeout(() => {
                console.log('hehehehe', dollar, amount);
                setAmount(dollar + amount)
            }, 350);
        }

    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Invest'}
                isLeftIcon={true}
                navigation={navigation}
            />
            {
                !isInternet ?
                    <View style={styles.innerContainer}>
                        <Image source={Images.NoInternet} style={styles.connection} resizeMode='contain' />
                    </View>
                    :
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false} >


                        <InputField
                            onChangeText={val => setName(val)}
                            value={name}
                            returnKeyType={'next'}
                            fieldRef={nameRef}
                            onSubmitEditing={() => {
                                numberRef?.current?.focus()
                            }}
                            placeholder='Name'
                            isLeftIcon={false}

                        />

                        <View style={styles.phoneNumberContainer}>
                            <View
                                style={[styles.codeContainer, { width: (code.length > 2 && code.length < 4) ? '23%' : code.length > 3 ? '26%' : '20%', }]}>
                                <CountryPickerModal
                                    callingCode={(code) => {
                                        setCode(code)
                                    }}
                                    visible={isCountryModal} />
                                <Text style={styles.countryCode}>{`+${code}`}</Text>
                            </View>
                            <View style={[styles.numberContainer,{width: (code.length>2 && code.length<4)? '77%':  code.length>3 ? '74%':'80%',}]}>
                                <TextInput
                                    style={{ fontSize: 14, fontFamily: Fonts.Regular, color: colors.White }}
                                    ref={numberRef}
                                    placeholder='Phone No'
                                    onChangeText={(val) => setNumber(val)}
                                    value={number}
                                    keyboardType={'number-pad'}
                                    placeholderTextColor={'rgba(255,255,255,0.2)'}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        amountRef?.current?.focus()
                                    }}

                                />
                            </View>
                        </View>

                        <InputField
                            onChangeText={val => setAmount(val)}
                            value={amount}
                            returnKeyType={'next'}
                            fieldRef={amountRef}
                            onSubmitEditing={() => {
                                addressRef?.current?.focus()
                            }}
                            keyBoardType={'numeric'}
                            placeholder='Amount'
                            customStyle={{
                                marginTop: 12
                            }}
                            isLeftIcon={amount.length > 0}

                        />

                        <View style={styles.dobContainer}>
                            <View style={styles.dob}>
                                <TextInput
                                    style={{ fontSize: 14, fontFamily: Fonts.Light, color: colors.White }}
                                    placeholder='10/11/1998'
                                    onChangeText={(val) => setDob(val)}
                                    value={moment(dob).format('MM/DD/YYYY')}
                                    placeholderTextColor={'rgba(255,255,255,0.2)'}
                                    editable={false}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                style={styles.IconContainer}>
                                <Image source={Images.Calendar} style={styles.calendarIcon} />
                            </TouchableOpacity>
                        </View>

                        <InputField
                            onChangeText={val => setAddress(val)}
                            value={address}
                            returnKeyType={'done'}
                            fieldRef={addressRef}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                            }}
                            placeholder='Tax Filing Address'
                            customStyle={{
                                marginTop: 12,
                                height: 150,
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                            }}
                            multiline={true}
                            isLeftIcon={false}

                        />

                        {
                            isAllInfo ?
                                <PlaidLink
                                    tokenConfig={{
                                        token: linkToken,
                                    }}
                                    onSuccess={(success: LinkSuccess) => {
                                        console.log("Plaid success....", JSON.parse(success.metadata.metadataJson))
                                        callAPIforAccessToken(JSON.parse(success?.metadata?.metadataJson))
                                    }}
                                    onExit={(exit: LinkExit) => { console.log({ exit }) }}
                                >
                                    <View
                                        style={[styles.btnStyle]} >
                                        <Text style={[styles.label]}>{'Connect Plaid'}</Text>
                                    </View>
                                </PlaidLink>
                                :
                                <AppButton
                                    label={"INVEST NOW"}
                                    style={styles.btnStyle}
                                    labelStyle={[styles.label]}
                                    onPress={() => {
                                        callAPIforLinkToken()
                                    }}
                                />
                        }
                    </KeyboardAwareScrollView>
            }
            <DatePicker
                modal
                mode='date'
                open={open}
                date={dob}
                onConfirm={(date) => {
                    console.log(date);
                    setOpen(false)
                    setDob(date)
                    getAge(dob)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            {/* <AlertModal
                visible={isVisible}
                onRequestClose={() => {
                    setIsVisible(false)
                }}
            /> */}
        </SafeAreaView>
    )
}

export default Investment;
