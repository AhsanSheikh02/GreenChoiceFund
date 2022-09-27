import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,

} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-tiny-toast'

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import InputField from '../../../Components/InputField'
import AppButton from '../../../Components/AppBtn'
import colors from '../../../Assets/Colors/Index'
import { UpdatePassword } from '../../../APIConfig/Config'

const ChangePassword = ({ navigation }) => {

    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewpassword, setConfirmNewPassword] = useState('')
    const [oldVisible, setOldVisible] = useState(false)
    const [newVisible, setNewVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)

    const oldRef = useRef()
    const newRef = useRef()
    const confirmNewRef = useRef()


    const callAPIforUpdatePass = () => {
        if (oldPassword === '') {
            TostMsg('Old password required')
        } else if (newPassword === '') {
            TostMsg('New pass required')
        } else if (confirmNewpassword === '') {
            TostMsg('Confirm password required')
        } else if (newPassword != confirmNewpassword) {
            TostMsg(`Password doesn't match`)
        } else {
            Toast.showLoading("Please wait..")
            UpdatePassword(oldPassword, newPassword, confirmNewpassword)
                .then((res) => {
                    Toast.hide()
                    TostMsg(res?.message)
                }).catch((err) => {
                    Toast.hide()
                    TostMsg(err)
                    console.log("callAPIforUpdatePass-err", err);
                })

        }


    }

    return (


        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }} >

            <View style={styles.passIconContainer}>
                <Image source={Images.Password} style={styles.passIcon} />
            </View>

            <View style={styles.fieldContainer}>
                <InputField
                    onChangeText={val => setOldPassword(val)}
                    value={oldPassword}
                    returnKeyType={'next'}
                    fieldRef={oldRef}
                    onSubmitEditing={() => {
                        newRef?.current?.focus()
                    }}
                    isRightIcon={true}
                    rightIcon={oldVisible ? Images.Show : Images.Hide}
                    rightIconOnPress={() => setOldVisible(!oldVisible)}
                    password={oldVisible ? false : true}
                    placeholder='Old Password'
                />

                <InputField
                    onChangeText={val => setNewPassword(val)}
                    value={newPassword}
                    returnKeyType={'next'}
                    fieldRef={newRef}
                    onSubmitEditing={() => {
                        confirmNewRef?.current?.focus()
                    }}
                    isRightIcon={true}
                    rightIcon={newVisible ? Images.Show : Images.Hide}
                    rightIconOnPress={() => setNewVisible(!newVisible)}
                    password={newVisible ? false : true}
                    placeholder='New Password'
                    customStyle={{
                        marginTop: 12
                    }}
                />

                <InputField
                    onChangeText={val => setConfirmNewPassword(val)}
                    value={confirmNewpassword}
                    returnKeyType={'done'}
                    fieldRef={confirmNewRef}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                    isRightIcon={true}
                    rightIcon={confirmVisible ? Images.Show : Images.Hide}
                    rightIconOnPress={() => setConfirmVisible(!confirmVisible)}
                    password={confirmVisible ? false : true}
                    placeholder='Confirm New Password'
                    customStyle={{
                        marginTop: 12
                    }}
                />
            </View>

            <AppButton
                label={"SAVE"}
                style={styles.btnStyle}
                labelStyle={styles.label}
                onPress={() => callAPIforUpdatePass()}
            />
        </KeyboardAwareScrollView>


    )
}

export default ChangePassword;
