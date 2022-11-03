import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions, TextInput, Keyboard, } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-tiny-toast";
import { DeleteAccount, } from "../APIConfig/Config";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SimpleToast from "react-native-simple-toast";

import colors from '../Assets/Colors/Index';
import Fonts from "../Assets/Fonts/Index";
import Images from "../Assets/Images/Index";
import AppButton from "./AppBtn";
import { useDispatch } from "react-redux";
import { onLogout, UserType } from "../Redux/Actions/Auth";

const deviceWidth = Dimensions.get('window').width


const DeleteAccountAlert = ({
    visible,
    onRequestClose,
    navigation
}) => {

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }
    const [pass, setPass] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const removeGoogleAuth = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error("removeGoogleAuth-error", error);
        }

    }

    const callAPIforDelteAccount = () => {
        if (pass === '') {
            SimpleToast.show('Please enter your password')
        } else if (pass && pass.length < 8) {
            SimpleToast.show('Password should be min 8 characters')
        } else {
            // Toast.showLoading("Please wait..")
            setIsLoading(true)
            DeleteAccount(pass)
                .then((res) => {
                    setIsLoading(false)
                    onRequestClose()
                    TostMsg('Account Deleted')
                    removeGoogleAuth()
                    dispatch(onLogout())
                    dispatch(UserType(null))
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignIn' }],
                        })
                    }, 350);

                }).catch((err) => {
                    SimpleToast.show(err)
                    console.log("callAPIforDelteAccount-err", err);
                })

        }
    }
    return (
        <Modal
            isVisible={visible}
            animationIn='fadeInRight'
            animationOut='fadeOutLeft'
            deviceWidth={deviceWidth}
            animationInTiming={350}
            animationOutTimixng={350}
            onBackButtonPress={onRequestClose}
            hasBackdrop={true}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            backdropColor='rgba(0,0,0,0.8)'
        >


            <View style={styles.modalContainer}>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16
                    }}
                    activeOpacity={0.6}
                    onPress={onRequestClose}
                >
                    <Image source={Images.Close} resizeMode='contain' style={styles.cross} />
                </TouchableOpacity>
                <Text style={styles.Title}>{'Delete Account!'}</Text>

                <View style={styles.input}>
                    <TextInput
                        placeholder="Enter your password"
                        onChangeText={(val) => {
                            setPass(val)
                        }}
                        value={pass}
                        returnKeyType={'done'}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                    />
                </View>
                <AppButton
                    label={"SAVE"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => callAPIforDelteAccount()}
                    isLoading={isLoading}
                />

            </View>




        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        backgroundColor: colors.White,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20

    },
    cross: {
        height: 17,
        width: 17,
    },
    Title: {
        fontSize: 20,
        fontFamily: Fonts.Regular,
        fontWeight: '700',
        color: colors.Black,
        alignSelf: 'center'
    },
    btnStyle: {
        marginTop: 30,
        backgroundColor: colors.Secondary,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: Fonts.Regular,
        color: colors.Black
    },
    input: {
        height: 52,
        width: '100%',
        borderColor: colors.textInput,
        borderWidth: 0.75,
        paddingHorizontal: 8,
        elevation: 0,
        borderRadius: 12,
        top: 15,
        justifyContent: 'center'
    }
});

export default DeleteAccountAlert;


