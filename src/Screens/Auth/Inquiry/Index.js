import React, { useState, useRef, useEffect } from 'react'
import {
    Image,
    Text,
    View,
    SafeAreaView,
    Keyboard,
    TextInput,
    Modal,
    Platform
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-tiny-toast';

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import AppButton from '../../../Components/AppBtn'
import InputField from '../../../Components/InputField'
import colors from '../../../Assets/Colors/Index';
import Fonts from '../../../Assets/Fonts/Index';
import { SendInquiry } from '../../../APIConfig/Config'
import CountryPickerModal from '../../../Components/CountryPicker';





const Inquiry = ({navigation}) => {

    const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { contactReasons } = useSelector(state => state.Splash)
    const dispatch = useDispatch()

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('92')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [url, setUrl] = useState('')
    const [desc, setDesc] = useState('')
    const [reason, setReason] = useState('')
    const [open, setOpen] = useState(false);
    const [isCountryModal, setIsCountryModal] = useState(false)
    const [contactId, setContactId] = useState(contactReasons);

    const nameRef = useRef();
    const emailRef = useRef();
    const numberRef = useRef();
    const addressRef = useRef();
    const urlRef = useRef();
    const descRef = useRef();


    const callAPIforInquiry = () => {
        console.log('in fn');
        if (name === '') {
            TostMsg('Name required')
        } else if (email === '') {
            TostMsg('Email required')
        } else if (EMAIL_REG.test(email) == false) {
            TostMsg('Invalid Email')
        } else if (number === '') {
            TostMsg('Number required')
        } else if (address === '') {
            TostMsg('Address required')
        } else if (url === '') {
            TostMsg('URL required')
        } else if (reason === '') {
            TostMsg(`Give your reason`)
        } else {
            Toast.showLoading("Please wait..")
            SendInquiry(name, email, code, number, address, url, desc, reason)
                .then((res) => {
                    Toast.hide()
                    TostMsg('Inquiry Sent')
                    setTimeout(() => {
                        navigation.goBack()
                    }, 250);
                }).catch((err) => {
                    Toast.hide()
                    TostMsg(err)
                    console.log("callAPIforInquiry-err", err);
                })

        }


    }


    return (


        <SafeAreaView style={styles.mainContainer}>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false} >
                <Image
                    source={Images.Logo}
                    style={styles.Logo}
                />
                <Text style={styles.Title}>{'Contact Us'}</Text>


                <InputField
                    onChangeText={val => setName(val)}
                    value={name}
                    returnKeyType={'next'}
                    fieldRef={nameRef}
                    onSubmitEditing={() => {
                        emailRef?.current?.focus()
                    }}
                    placeholder='Name'
                    customStyle={{
                        marginTop: 37
                    }}
                />

                <InputField
                    onChangeText={val => setEmail(val)}
                    value={email}
                    returnKeyType={'next'}
                    fieldRef={emailRef}
                    keyBoardType={'email-address'}
                    onSubmitEditing={() => {
                        numberRef?.current?.focus()
                    }}
                    placeholder='Email'
                    customStyle={{
                        marginTop: 12
                    }}

                />

                <View style={styles.phoneNumberContainer}>
                    <View
                        style={styles.codeContainer}>
                        <CountryPickerModal
                            callingCode={(code) => {
                                setCode(code)
                            }}
                            visible={isCountryModal} />
                        <Text style={styles.countryCode}>{`+${code}`}</Text>
                    </View>
                    <View style={styles.numberContainer}>
                        <TextInput
                            style={{ fontSize: 14, fontFamily: Fonts.Light, color: colors.White }}
                            ref={numberRef}
                            placeholder='Phone No'
                            onChangeText={(val) => setNumber(val)}
                            value={number}
                            keyboardType={'number-pad'}
                            maxLength={10}
                            placeholderTextColor={'rgba(255,255,255,0.2)'}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                addressRef?.current?.focus()
                            }}

                        />
                    </View>
                </View>

                <InputField
                    onChangeText={val => setAddress(val)}
                    value={address}
                    returnKeyType={'next'}
                    fieldRef={addressRef}
                    onSubmitEditing={() => {
                        urlRef?.current?.focus()
                    }}
                    placeholder='Address'
                    customStyle={{
                        marginTop: 12
                    }}

                />

                <InputField
                    onChangeText={val => setUrl(val)}
                    value={url}
                    returnKeyType={'next'}
                    fieldRef={urlRef}
                    onSubmitEditing={() => {
                        descRef?.current?.focus()
                    }}
                    placeholder='URL'
                    customStyle={{
                        marginTop: 12
                    }}

                />

                <InputField
                    onChangeText={val => setDesc(val)}
                    value={desc}
                    returnKeyType={'done'}
                    fieldRef={descRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                    placeholder='Description'
                    customStyle={{
                        marginTop: 12
                    }}

                />

                <DropDownPicker
                    closeAfterSelecting={true}
                    open={open}
                    value={reason}
                    items={contactId}
                    setOpen={setOpen}
                    setValue={setReason}
                    setUserType={setContactId}
                    listMode="SCROLLVIEW"
                    dropDownMaxHeight={50}
                    // scrollViewProps={{
                    //     nestedScrollEnabled: true,
                    // }}
                    placeholder={"Reason"}
                    placeholderStyle={{ color: 'rgba(255,255,255,0.2)' }}
                    arrowIconStyle={{
                        width: 20,
                        height: 20,
                        tintColor: 'rgba(255,255,255,0.2)',
                        alignSelf: 'center',
                    }}


                    tickIconStyle={{
                        width: 20,
                        height: 20,
                        tintColor: 'white'
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: colors.textInput,
                        // borderColor: valueRequired ? colors.Reddish : "#4B5563",
                        width: "100%",
                        alignSelf: 'center',
                    }}
                    arrowIconContainerStyle={{
                        backgroundColor: colors.textInput,
                        justifyContent: 'center',
                    }}
                    style={{
                        // borderColor: valueRequired ? colors.Reddish : colors.grayish,
                        backgroundColor: colors.textInput,
                        width: "100%",
                        minHeight: 40,
                        height: 52,
                        alignSelf: 'center',
                        borderRadius: 12

                        // paddingRight: 2
                    }}
                    containerStyle={{
                        marginTop: 12,
                    }}
                    textStyle={{
                        color: colors.White,
                        // fontFamily: Fonts.Regular,
                        fontSize: 14,
                    }}
                />

                <AppButton
                    label={"SEND"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => {
                        callAPIforInquiry()
                    }}
                />

            </KeyboardAwareScrollView>
        </SafeAreaView>

    )
}

export default Inquiry;

