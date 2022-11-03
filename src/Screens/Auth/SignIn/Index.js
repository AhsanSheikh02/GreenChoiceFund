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
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import AppButton from '../../../Components/AppBtn'
import InputField from '../../../Components/InputField'
import colors from '../../../Assets/Colors/Index';
import SocialButton from '../../../Components/SocialBtn';
import { LoginUser, SocialLogin } from '../../../APIConfig/Config';
import { Guest, userToken, UserType, userDetail } from '../../../Redux/Actions/Auth';

const SignIn = ({ navigation, route }) => {

    const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const { deviceToken, deviceId } = useSelector(state => state.DeviceInfo)
    const dispatch = useDispatch()

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const emailRef = useRef();
    const passwordRef = useRef();


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

    const callAPIforLogin = () => {
        let platformId = Platform.OS === 'ios' ? 2 : 1
        if (email === '') {
            TostMsg('Email is required')
        } else if (EMAIL_REG.test(email) == false) {
            TostMsg('Email is invalid')
        } else if (password === '') {
            TostMsg('Password is required')
        } else if (password.length < 8) {
            TostMsg('Password should be min 8 characters')
        } else {
            Toast.showLoading("Please wait..")
            // console.log(name, email, password, confirmPass, deviceToken, deviceId, platformId);
            // return false
            LoginUser(email, password, deviceToken, deviceId, platformId)
                .then((res) => {
                    Toast.hide()
                    TostMsg('Login Success')
                    dispatch(Guest(false))
                    dispatch(UserType(res?.data?.user?.user_type_id))
                    dispatch(userDetail(res?.data?.user))
                    dispatch(userToken(res?.data?.token))
                    AsyncStorage.setItem("authToken", res?.data?.token)
                    setTimeout(() => {
                        if (res?.data?.user?.user_type_id === '1') {
                            setTimeout(() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'HomeStack' }],
                                })
                            }, 250);
                        } else {
                            setTimeout(() => {
                                navigation.replace('OnBoarding')
                            }, 250);
                        }
                    }, 250);

                }).catch((err) => {
                    Toast.hide()
                    TostMsg(err)
                    console.log("callAPIforLogin-err", err);
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
                showsVerticalScrollIndicator={false} >
                <Image
                    source={Images.Logo}
                    style={styles.Logo}
                />
                <Text style={styles.Title}>{'Login'}</Text>
                <View style={{ flexDirection: 'row', marginTop: 23, alignSelf: 'center' }}>
                    <Text style={[styles.haveAccount, { opacity: 0.6 }]}>{`Don't have an account?`}</Text>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate('SignUp')
                        }}>
                        <Text style={[styles.haveAccount, {
                            color: colors.Secondary,
                            fontWeight: '900'
                        }]}>{` Sign up`}</Text>
                    </TouchableOpacity>
                </View>

                <InputField
                    onChangeText={val => setEmail(val)}
                    value={email}
                    returnKeyType={'next'}
                    keyBoardType={'email-address'}
                    fieldRef={emailRef}
                    onSubmitEditing={() => {
                        passwordRef?.current?.focus()
                    }}
                    placeholder='Email'
                    customStyle={{
                        marginTop: 37
                    }}
                    autoCapitalize={'none'}
                />

                <InputField
                    onChangeText={val => setPassword(val)}
                    value={password}
                    returnKeyType={'done'}
                    fieldRef={passwordRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgot}>{'Forgot Password?'}</Text>
                </TouchableOpacity>
                <AppButton
                    label={"LOGIN"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => callAPIforLogin()}
                />

                {/* <Text style={styles.socialText}>{'Or Login with'}</Text> */}
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

        </SafeAreaView>


    )
}

export default SignIn

