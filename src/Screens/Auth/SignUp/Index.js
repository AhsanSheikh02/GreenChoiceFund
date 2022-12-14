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
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import AppButton from '../../../Components/AppBtn'
import InputField from '../../../Components/InputField'
import colors from '../../../Assets/Colors/Index';
import SocialButton from '../../../Components/SocialBtn';
import Loader from '../../../Components/Loader';
import { RegisterUser, SocialLogin } from '../../../APIConfig/Config'
import { Guest, userDetail, userToken, UserType } from '../../../Redux/Actions/Auth';
import CountryPickerModal from '../../../Components/CountryPicker';
import Fonts from '../../../Assets/Fonts/Index';

const SignUp = ({ navigation, route }) => {

    const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { deviceToken, deviceId } = useSelector(state => state.DeviceInfo)
    const { loggedInUserType } = useSelector(state => state.Auth)
    const { userTypes } = useSelector(state => state.Splash)
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
    const [code, setCode] = useState('1')
    const [number, setNumber] = useState('')
    const [isCountryModal, setIsCountryModal] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPassVisible, setConfirmPassVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [userTypeId, setUserTypeId] = useState('');
    const [userType, setUserType] = useState(userTypes);

    const nameRef = useRef();
    const emailRef = useRef();
    const numberRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const resetStateToDefault = () => {
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPass('')
    }

    const googleSignUp = async () => {
        Toast.showLoading("Please wait..")
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const credentials = await auth().signInWithCredential(googleCredential);
            // console.log(googleCredential?.token);
            // console.log({ idToken });
            // console.log('main credential object...', credentials);
            // console.log('additional user-info...', credentials?.additionalUserInfo?.profile);
            // console.log('user...', credentials?.user);
            // console.log('user...', credentials?.user?.providerData);
            const user_info = {
                name: credentials?.additionalUserInfo?.profile?.name,
                email: credentials?.additionalUserInfo?.profile.email,
                email_verified: credentials?.additionalUserInfo?.profile?.email_verified,
                picture: credentials?.additionalUserInfo?.profile?.picture,
                family_name: credentials?.additionalUserInfo?.profile?.family_name,
                given_name: credentials?.additionalUserInfo?.profile?.given_name,
                phoneNumber: credentials?.user?.phoneNumber,
                provider_data_uid: credentials?.user?.providerData[0]?.providerId,
                uid: credentials?.user?.uid

            }
            // console.log({user_info});
            callAPIforSocialLogin(googleCredential?.token, 'google', user_info)

        } catch (error) {
            console.log("googleSignIn-error", error);
        }
    };

    async function onAppleButtonPress() {
        Toast.showLoading("Please wait..")
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.EMAIL],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            connsole.log('Apple Sign-In failed - no identify token returned');
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        // console.log(appleAuthRequestResponse);
        // console.log(appleCredential);
        callAPIforSocialLogin(appleAuthRequestResponse?.identityToken, 'apple')
        return auth().signInWithCredential(appleCredential);

    }

    // const facebookSignup = async () => {
    //     const result = await LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]);

    //     if (result.isCancelled) {
    //         throw 'User cancelled the login process';
    //     }

    //     // Once signed in, get the users AccesToken
    //     const data = await AccessToken.getCurrentAccessToken();

    //     if (!data) {
    //         throw 'Something went wrong obtaining access token';
    //     }

    //     // Create a Firebase credential with the AccessToken
    //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(facebookCredential);

    // }

    const callAPIforRegister = () => {
        let platformId = Platform.OS === 'ios' ? 2 : 1
        if (name === '') {
            TostMsg('Name is required')
        } else if (email === '') {
            TostMsg('Email is required')
        } else if (EMAIL_REG.test(email) == false) {
            TostMsg('Email is invalid')
        } else if (number === '') {
            TostMsg(`Phone No is required`)
        } else if (userTypeId === '') {
            TostMsg(`User type is required`)
        } else if (password === '') {
            TostMsg('Password is required')
        } else if (password.length < 8) {
            TostMsg('Password should be min 8 characters')
        } else if (confirmPass === '') {
            TostMsg('Confirm password is required')
        } else if (password != confirmPass) {
            TostMsg(`Password doesn't match`)
        } else {
            Toast.showLoading("Please wait..")
            // console.log(name, email, password, userTypeId, code, number, confirmPass, deviceToken, deviceId, platformId);
            // return false
            RegisterUser(name, email, userTypeId, password, confirmPass, code, number, deviceToken, deviceId, platformId)
                .then((res) => {
                    Toast.hide()
                    TostMsg('Account registered')
                    dispatch(Guest(false))
                    dispatch(userToken(res?.data?.token))
                    dispatch(UserType(res?.data?.user?.user_type_id))
                    AsyncStorage.setItem("authToken", res?.data?.token)
                    if (res?.data?.user?.user_type_id === '1') {
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeStack' }],
                            })
                        }, 250);
                    }
                    else {
                        setTimeout(() => {
                            navigation.replace('OnBoarding')
                        }, 250);
                    }
                    resetStateToDefault()
                }).catch((err) => {
                    Toast.hide()
                    TostMsg(err)
                    console.log("callAPIforRegister-err", err);
                })

        }


    }

    const callAPIforSocialLogin = (token, provider, userObject) => {
        let platformId = Platform.OS === 'ios' ? 2 : 1

        SocialLogin(token, provider, deviceToken, deviceId, platformId, userObject)
            .then((res) => {
                // console.log("callAPIforSocialLogin-res...", res);
                Toast.hide()
                if (res.code === 200) {
                    dispatch(userToken(res?.data?.token))
                    dispatch(userDetail(res?.data?.user))
                    dispatch(UserType(null))
                    AsyncStorage.setItem("authToken", res?.data?.token)
                    setTimeout(() => {
                        navigation.navigate('PersonalDetails',
                            {
                                userData: res?.data?.user,
                                allowEmail: provider === 'apple' ? true : false
                            })
                    }, 500);
                }

                // TostMsg('Account registered')
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
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={Images.Logo}
                    style={styles.Logo}
                />
                <Text style={styles.Title}>{'Sign up'}</Text>
                <View style={{ flexDirection: 'row', marginTop: 23, alignSelf: 'center' }}>
                    <Text style={[styles.haveAccount, { opacity: 0.6 }]}>{`Already have an account?`}</Text>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate('SignIn')
                        }}>
                        <Text style={[styles.haveAccount, {
                            color: colors.Secondary,
                            fontWeight: '900'
                        }]}>{` Login`}</Text>
                    </TouchableOpacity>
                </View>

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
                {/* <DropDownPicker
                    items={items}
                    open={open}
                    setOpen={setOpen}
                    defaultValue={type}
                    showArrow={true}
                    arrowColor={"grey"}
                    containerStyle={{
                        marginTop: 12,
                    }}
                    style={{ backgroundColor: '#ffffff' }}
                    // itemStyle={{
                    //     justifyContent: 'flex-start', marginRight: moderateScale(10), marginLeft: moderateScale(15)
                    // }}
                    labelStyle={{ fontFamily: Fonts.Regular }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => {
                        setType(item.value)
                    }}
                    // placeholderStyle={{ color: "grey" }}
                    placeholder="Type"
                /> */}


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
                        style={[styles.codeContainer, { width: (code.length > 2 && code.length < 4) ? '23%' : code.length > 3 ? '26%' : '20%', }]}>
                        <CountryPickerModal
                            callingCode={(code) => {
                                console.log(code);
                                setCode(code)
                            }}
                            visible={isCountryModal} />
                        <Text style={styles.countryCode}>{`+${code}`}</Text>
                    </View>
                    <View style={[styles.numberContainer, { width: (code.length > 2 && code.length < 4) ? '77%' : code.length > 3 ? '74%' : '80%', }]}>
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
                                passwordRef?.current?.focus()
                            }}

                        />
                    </View>
                </View>

                <DropDownPicker
                    closeAfterSelecting={true}
                    open={open}
                    value={userTypeId}
                    items={(userType) ? userType : []}
                    setOpen={setOpen}
                    setValue={setUserTypeId}
                    setItems={setUserType}
                    listMode="SCROLLVIEW"
                    dropDownMaxHeight={50}
                    onChangeValue={item => {
                        setUserTypeId(item)
                    }}
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

                <InputField
                    onChangeText={val => setPassword(val)}
                    value={password}
                    returnKeyType={'next'}
                    fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        confirmPassRef?.current?.focus()
                    }}
                    isRightIcon={true}
                    rightIcon={passwordVisible ? Images.Show : Images.Hide}
                    rightIconOnPress={() => setPasswordVisible(!passwordVisible)}
                    password={passwordVisible ? false : true}
                    placeholder='Password'
                    customStyle={{
                        marginTop: 12
                    }}
                />

                <InputField
                    onChangeText={val => setConfirmPass(val)}
                    value={confirmPass}
                    returnKeyType={'done'}
                    fieldRef={confirmPassRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                    isRightIcon={true}
                    rightIcon={confirmPassVisible ? Images.Show : Images.Hide}
                    rightIconOnPress={() => setConfirmPassVisible(!confirmPassVisible)}
                    password={confirmPassVisible ? false : true}
                    placeholder='Confirm Password'
                    customStyle={{
                        marginTop: 12
                    }}
                />

                <AppButton
                    label={"SIGN UP"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => callAPIforRegister()}
                />

                {/* <Text style={styles.socialText}>{'Or sign up with'}</Text> */}

                {
                    Platform.OS === 'ios' ?
                        <View style={{ width: '100%', marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: '24%' }}>
                            {/* <SocialButton style={{ height: 26, width: 14.26, resizeMode: 'contain' }} img={Images.Facebook} /> */}
                            <SocialButton onPress={() => googleSignUp()} style={{ height: 26, width: 25.37, resizeMode: 'contain' }} img={Images.Google} />
                            {/* <AppleButton
                                buttonStyle={AppleButton.Style.BLACK}
                                buttonType={AppleButton.Type.SIGN_IN}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 10,
                                    // backgroundColor: 'pink'
                                }}
                                onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                            /> */}
                            <SocialButton onPress={() => onAppleButtonPress()} style={{ height: 26, width: 21.85, resizeMode: 'contain' }} img={Images.Apple} />

                        </View>
                        :
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => googleSignUp()}
                            style={styles.googleBtn}>
                            <Image source={Images.GoogleIcon} style={styles.socialIcon} resizeMode='contain' />
                            <Text style={styles.socialText}>{'Continue with Google'}</Text>
                        </TouchableOpacity>

                }

            </KeyboardAwareScrollView>
            <Loader visible={isLoading} />


        </SafeAreaView>


    )
}

export default SignUp

