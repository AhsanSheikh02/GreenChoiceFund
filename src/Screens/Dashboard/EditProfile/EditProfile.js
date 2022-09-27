import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    TextInput

} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-tiny-toast'
import DropDownPicker from 'react-native-dropdown-picker';

import CountryPickerModal from '../../../Components/CountryPicker';
import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import InputField from '../../../Components/InputField'
import AppButton from '../../../Components/AppBtn'
import colors from '../../../Assets/Colors/Index'
import { UpdateProfile } from '../../../APIConfig/Config'
import { userDetail, UserType } from '../../../Redux/Actions/Auth'
import Fonts from '../../../Assets/Fonts/Index'


const EditProfile = ({ navigation }) => {

    const { userTypes } = useSelector(state => state.Splash)
    const TostMsg = (msg) => {
        Toast.show(msg, {
            position: Toast.position.center,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
            textStyle: { color: colors.White },
        })
    }
    const { loggedInUserDetails } = useSelector(state => state.Auth)
    const [isCountryModal, setIsCountryModal] = useState(false)
    const [name, setName] = useState(loggedInUserDetails?.name)
    const [email, setEmail] = useState(loggedInUserDetails?.email)
    const [code, setCode] = useState(loggedInUserDetails?.country_code)
    const [number, setNumber] = useState(loggedInUserDetails?.contact_no)
    const [open, setOpen] = useState(false);
    const [userTypeId, setUserTypeId] = useState('');
    const [userType, setUserType] = useState(userTypes);
    const dispatch = useDispatch()

    const nameRef = useRef()
    const numberRef = useRef()

    // useEffect(() => {
    //     for (let i = 0; i < userTypes.length; i++) {
    //         if (userTypes[i].value == loggedInUserDetails?.data?.user_type_id) {
    //             setUserTypeId(userTypes[i].value)
    //         }
    //     }
    // })

    const callAPIforUpdateProfile = () => {
        if (name === '') {
            TostMsg('Name required')
        } else {
            console.log(userTypeId);
            Toast.showLoading("Please wait..")
            UpdateProfile(name, code, number, userTypeId)
                .then((res) => {
                    Toast.hide()
                    TostMsg(res?.message)
                    dispatch(userDetail(res?.data))
                    dispatch(UserType(res?.data?.user_type_id))
                }).catch((err) => {
                    Toast.hide()
                    // TostMsg(err)
                    console.log("callAPIforUpdateProfile-err", err);
                })

        }
    }

    return (
        <View style={styles.mainContainer}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.profileImgContainer}>
                    <Image
                        style={styles.profileImg}
                        source={{ uri: loggedInUserDetails?.profile_photo_url }}
                    />
                    <View style={styles.addIconContainer}>
                        <Image
                            style={styles.addIcon}
                            source={Images.Add}
                        />
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <InputField
                        onChangeText={val => setName(val)}
                        value={name}
                        returnKeyType={'done'}
                        fieldRef={nameRef}
                        onSubmitEditing={() => {
                            numberRef?.current?.focus()
                        }}
                        placeholder='Name'
                    />

                    <InputField
                        onChangeText={val => setEmail(val)}
                        value={email}
                        returnKeyType={'next'}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        editable={false}
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
                                visible={isCountryModal}
                            />
                            <Text style={styles.countryCode}>{`${code}`}</Text>
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
                                    Keyboard.dismiss()
                                }}

                            />
                        </View>
                    </View>

                    {/* <DropDownPicker
                        closeAfterSelecting={true}
                        open={open}
                        defaultValue={userTypeId}
                        value={userTypeId}
                        items={userType}
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
                    /> */}


                </View>

                <AppButton
                    label={"SAVE"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => {
                        callAPIforUpdateProfile()
                    }}
                />


            </KeyboardAwareScrollView>

        </View>

    )
}

export default EditProfile;
