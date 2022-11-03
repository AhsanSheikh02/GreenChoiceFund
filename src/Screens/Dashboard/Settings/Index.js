import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    Alert,
    Platform,
    ScrollView,
    Linking,

} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging'
import styles from './Styles'
import Header from '../../../Components/Header'
import ProfileSettingComponent from '../../../Components/ProfileSettingComponent'
import Images from '../../../Assets/Images/Index'
import { LogoutUser } from '../../../APIConfig/Config'
import { onLogout, UserType } from '../../../Redux/Actions/Auth'
import AppButton from '../../../Components/AppBtn'
import colors from '../../../Assets/Colors/Index';
import DeleteAccountAlert from '../../../Components/DeleteAccountAlert';
import Toast from 'react-native-tiny-toast';
import { DeviceToken } from '../../../Redux/Actions/DeviceInfo';

const Settings = ({ navigation }) => {

    const { deviceToken, deviceId } = useSelector(state => state.DeviceInfo)
    const { guest, authToken, loggedInUserDetails, loggedInUserType } = useSelector(state => state.Auth)
    const { infoUrls } = useSelector(state => state.Splash)
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(infoUrls);
    }, [])

    const removeGoogleAuth = async () => {
        try {
            await GoogleSignin.signOut();
            try {
                const fcmtoken = await messaging().deleteToken()
                dispatch(DeviceToken(null))
            } catch (error) {
                console.log("deleteFcm-error", error);
            }

        } catch (error) {
            console.error("removeGoogleAuth-error", error);
        }

    }

    const showLogoutDialog = () => {
        Alert.alert(
            "Logout",
            'Are you sure you want to log out?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        callAPIforLogout()
                    },
                },
            ],
            { cancelable: false },
        )
    }

    const showDeleteDialog = () => {
        Alert.alert(
            "Delete Account",
            'Are you sure you want to delete your account?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        setIsVisible(true)
                    },
                },
            ],
            { cancelable: false },
        )
    }

    const callAPIforLogout = () => {
        Toast.showLoading("Please wait..")
        let platformId = Platform.OS === 'ios' ? 2 : 1
        // console.log(name, email, password, confirmPass, deviceToken, deviceId, platformId);
        // return false
        LogoutUser(platformId, deviceToken, deviceId)
            .then((res) => {
                Toast.hide()
                removeGoogleAuth()
                setTimeout(() => {
                    dispatch(onLogout())
                    dispatch(UserType(null))
                }, 250);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                })
            }).catch((err) => {
                Toast.hide()
                dispatch(onLogout())
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignIn' }],
                    })
                }, 250);
                console.log("callAPIforLogout-err", err);
            })

    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Settings'}
            />

            <View style={styles.innerContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        guest === true ?
                            <View style={styles.btnContainer}>
                                <AppButton
                                    label={"SIGN UP"}
                                    style={styles.btnStyle}
                                    labelStyle={styles.label}
                                    onPress={() => {
                                        navigation.navigate('SignUp')
                                    }}
                                />
                                <AppButton
                                    label={"LOGIN"}
                                    style={styles.btnStyle}
                                    labelStyle={styles.label}
                                    onPress={() => {
                                        navigation.navigate('SignIn')
                                    }}
                                />
                            </View>
                            :
                            <View style={styles.profileDataContainer}>
                                <View style={[styles.profileImgContainer, { backgroundColor: isLoading ? colors.Placeholder : 'transparent' }]}>
                                    <Image
                                        onLoadStart={() => {
                                            setIsLoading(true)
                                        }}
                                        onError={(error) => console.log(error)}
                                        onLoadEnd={() => {
                                            setIsLoading(false)

                                        }}
                                        style={styles.profileImg}
                                        source={{ uri: loggedInUserDetails?.profile_photo_url }}
                                    />
                                </View>
                                <Text style={styles.username} >{loggedInUserDetails?.name}</Text>
                            </View>

                    }


                    <View style={styles.profileSettingContainer}>
                        {
                            !guest &&
                            <ProfileSettingComponent
                                Icon={Images.Edit_Profile}
                                Title={'Edit Profile'}
                                IconStyle={{ tintColor: 'rgba(255,255,255,0.4)' }}
                                onPress={() => navigation.navigate('EditProfileIndex')}
                            />

                        }

                        {
                            (!guest && loggedInUserType === '1') ?
                                <ProfileSettingComponent
                                    Icon={Images.Money}
                                    Title={'Recent Investments'}
                                    IconStyle={{ tintColor: 'rgba(255,255,255,0.4)' }}
                                    onPress={() => navigation.navigate('AllInvestments')}
                                    containerStyle={{ marginTop: 15 }}
                                />
                                :
                                <ProfileSettingComponent
                                    Icon={Images.Inquiry}
                                    Title={'Inquiry'}
                                    IconStyle={{ tintColor: 'rgba(255,255,255,0.4)' }}
                                    onPress={() => navigation.navigate('Inquiry')}
                                    containerStyle={{ marginTop: 15 }}
                                />


                        }

                        <ProfileSettingComponent
                            Icon={Images.FAQ}
                            Title={'FAQ'}
                            containerStyle={{ marginTop: 15 }}
                            onPress={() => Linking.openURL(infoUrls[2]?.url_web)}
                        />

                        {/* <ProfileSettingComponent
                            Icon={Images.Share}
                            Title={'Share'}
                            containerStyle={{ marginTop: 15 }}
                        /> */}

                        <ProfileSettingComponent
                            Icon={Images.About}
                            IconStyle={{ tintColor: 'rgba(255,255,255,0.4)' }}
                            Title={'About Us'}
                            containerStyle={{ marginTop: 15 }}
                            onPress={() => Linking.openURL(infoUrls[3]?.url_web)}
                        />

                        {
                            !guest &&
                            <ProfileSettingComponent
                                Icon={Images.Delete}
                                Title={'Delete Account'}
                                TitleStyle={{ color: 'red' }}
                                IconStyle={{ tintColor: 'red' }}
                                containerStyle={{ marginTop: 15 }}
                                onPress={() => showDeleteDialog()}
                            />
                        }

                        {
                            !guest &&
                            <ProfileSettingComponent
                                Icon={Images.Logout}
                                Title={'Sign out'}
                                containerStyle={{ marginTop: 15 }}
                                onPress={() => showLogoutDialog()}
                            />
                        }


                    </View>





                </ScrollView>
            </View>

            <DeleteAccountAlert
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
                navigation={navigation}
            />

        </SafeAreaView >
    )
}

export default Settings;
