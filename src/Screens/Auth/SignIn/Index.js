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
import { LoginUser } from '../../../APIConfig/Config';
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
        try {
            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            const credentials = await auth().signInWithCredential(googleCredential);
            console.log(googleCredential?.token);
            // console.log({ idToken });
            // console.log('main credential object...', credentials);
            // console.log('additional user-info...', credentials?.additionalUserInfo?.profile);
            // console.log('user...', credentials?.user);

        } catch (error) {
            console.log("googleSignIn-error", error);
        }
    };

    const onAppleButtonPress = async () => {
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
        console.log(appleAuthRequestResponse);
        console.log(appleCredential);
        // Sign the user in with the credential
        return auth().signInWithCredential(appleCredential);
        // console.log(signIn);
    }

    const callAPIforLogin = () => {
        let platformId = Platform.OS === 'ios' ? 2 : 1
        if (email === '') {
            TostMsg('Email required')
        } else if (EMAIL_REG.test(email) == false) {
            TostMsg('Invalid Email')
        } else if (password === '') {
            TostMsg('Password required')
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
                            navigation.navigate('HomeStack')
                        } else {
                            navigation.navigate('OnBoarding')
                        }
                    }, 250);

                }).catch((err) => {
                    Toast.hide()
                    TostMsg(err)
                    console.log("callAPIforLogin-err", err);
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
                    Platform.OS != 'ios' ?
                        <View style={{ width: '100%', marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: '24%' }}>
                            {/* <SocialButton style={{ height: 26, width: 14.26, resizeMode: 'contain' }} img={Images.Facebook} /> */}
                            <SocialButton onPress={() => googleSignUp()} style={{ height: 26, width: 25.37, resizeMode: 'contain' }} img={Images.Google} />
                            <AppleButton
                                buttonStyle={AppleButton.Style.BLACK}
                                buttonType={AppleButton.Type.SIGN_IN}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 10,
                                    // backgroundColor: 'pink'
                                }}
                                onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                            />
                        </View>
                        :
                        <View style={styles.googleBtn}>
                            <Image source={Images.GoogleIcon} style={styles.socialIcon} resizeMode='contain' />
                            <Text style={styles.socialText}>{'Continue with Google'}</Text>
                        </View>

                }




            </KeyboardAwareScrollView>

        </SafeAreaView>


    )
}

export default SignIn

