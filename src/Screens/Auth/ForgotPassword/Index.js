import React, { useState, useRef, useEffect } from 'react'
import {
    Image,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    TextInput
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-tiny-toast';

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import AppButton from '../../../Components/AppBtn'
import colors from '../../../Assets/Colors/Index';
import InputField from '../../../Components/InputField'
import { ForgotPass } from '../../../APIConfig/Config';



const ForgotPassword = ({ navigation, route }) => {

    const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [email, setEmail] = useState('')

    const callAPIforForgotPass = () => {
        if (email === '') {
            TostMsg('Email required')
        } else if (EMAIL_REG.test(email) == false) {
            TostMsg('Invalid Email')
        } else {
            Toast.showLoading("Please wait..")
            ForgotPass(email)
                .then((res) => {
                    Toast.hide()
                    // TostMsg('Please')
                    setTimeout(() => {
                        navigation.goBack()
                    }, 250);
                }).catch((err) => {
                    Toast.hide()
                    // TostMsg(err)
                    console.log("callAPIforForgotPass-err", err);
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ position: 'absolute', top: 50, left: 20 }}
                    onPress={() => navigation.goBack()}>
                    <Image source={Images.Back} style={styles.backIcon} />
                </TouchableOpacity>
                {/* <Text style={styles.Title}>{'Reset Password'}</Text> */}
                <View style={{ marginTop: 23, alignItems: 'center' }}>
                    <Text style={[styles.resetDesc]}>{`Enter the email address`}</Text>
                    <Text style={[styles.resetDesc]}>{`associated with your account`}</Text>
                </View>

                <View style={{ marginTop: 23, alignItems: 'center' }}>
                    <Text style={styles.sendEmail}>{`We'll email you a link to reset`}</Text>
                    <Text style={styles.sendEmail}>{`your password`}</Text>
                </View>

                <InputField
                    onChangeText={val => setEmail(val)}
                    value={email}
                    returnKeyType={'done'}
                    keyBoardType={'email-address'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                    placeholder='Email'
                    customStyle={{
                        marginTop: 75
                    }}
                />



                <AppButton
                    label={"SEND"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => callAPIforForgotPass()}
                />




            </KeyboardAwareScrollView>

        </SafeAreaView>


    )
}

export default ForgotPassword

