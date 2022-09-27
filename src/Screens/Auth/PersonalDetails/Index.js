import React, { useState, useRef, useEffect } from 'react'
import {
    Image,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    TextInput,
    Platform
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SimpleToast from 'react-native-simple-toast';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import AppButton from '../../../Components/AppBtn'
import InputField from '../../../Components/InputField'
import colors from '../../../Assets/Colors/Index';
import SocialButton from '../../../Components/SocialBtn';
import Loader from '../../../Components/Loader';
import { RegisterUser, SocialLogin } from '../../../APIConfig/Config'
import { Guest, userToken } from '../../../Redux/Actions/Auth';
import CountryPickerModal from '../../../Components/CountryPicker';
import Fonts from '../../../Assets/Fonts/Index';

const PersonalDetails = ({ navigation, route }) => {

    const userDetails = route?.params?.userDetail || ''

    const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { deviceToken, deviceId } = useSelector(state => state.DeviceInfo)
    const { userTypes } = useSelector(state => state.Splash)
    const dispatch = useDispatch()

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [name, setName] = useState(userDetails?.name)
    const [email, setEmail] = useState(userDetails?.email)
    const [code, setCode] = useState('92')
    const [number, setNumber] = useState('')
    const [isCountryModal, setIsCountryModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [userType, setUserType] = useState(userTypes);

    const nameRef = useRef();
    const emailRef = useRef();
    const numberRef = useRef();

    const resetStateToDefault = () => {
        setName('')
        setEmail('')
    }


    const callAPIforUpdateProfile = () => {
        if (name === '') {
            TostMsg('Name required')
        } else {
            Toast.showLoading("Please wait..")
            UpdateProfile(name, code, number)
                .then((res) => {
                    Toast.hide()
                    TostMsg(res?.message)
                    dispatch(userDetail(res))
                }).catch((err) => {
                    Toast.hide()
                    // TostMsg(err)
                    console.log("callAPIforUpdateProfile-err", err);
                })

        }


    }

    const callAPIforUpdatePe = (googleToken) => {
        Toast.showLoading("Please wait..")
        let platformId = Platform.OS === 'ios' ? 2 : 1

        SocialLogin(googleToken, 'google', deviceToken, deviceId, platformId)
            .then((res) => {
                Toast.hide()
                console.log(res);
                // dispatch(userToken(res?.data?.token))
                // AsyncStorage.setItem("authToken", res?.data?.token)
                // setTimeout(() => {
                //     navigation.reset({
                //         index: 0,
                //         routes: [{ name: 'HomeStack' }],
                //     })
                // }, 250);
            }).catch((err) => {
                Toast.hide()
                // TostMsg(err)
                console.log("callAPIforSocialLogin-err", err);
            })
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
                <Text style={styles.Title}>{'Personal Details'}</Text>

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
                    editable={false}
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
                    editable={false}
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
                                passwordRef?.current?.focus()
                            }}

                        />
                    </View>
                </View>

                <DropDownPicker
                    closeAfterSelecting={true}
                    open={open}
                    value={value}
                    items={userType}
                    setOpen={setOpen}
                    setValue={setValue}
                    setUserType={setUserType}
                    listMode="SCROLLVIEW"
                    dropDownMaxHeight={50}
                    // scrollViewProps={{
                    //     nestedScrollEnabled: true,
                    // }}
                    placeholder={"Type"}
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
                    label={"SAVE"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    // onPress={() => callAPIforSocialLogin()}
                />
            </KeyboardAwareScrollView>
            <Loader visible={isLoading} />


        </SafeAreaView>


    )
}

export default PersonalDetails

