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

} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import styles from './Styles'
import Header from '../../../Components/Header'
import ProfileSettingComponent from '../../../Components/ProfileSettingComponent'
import Images from '../../../Assets/Images/Index'
import { LogoutUser } from '../../../APIConfig/Config'
import { onLogout, UserType } from '../../../Redux/Actions/Auth'
import AppButton from '../../../Components/AppBtn'
import colors from '../../../Assets/Colors/Index';

const Settings = ({ navigation }) => {

    const { deviceToken, deviceId } = useSelector(state => state.DeviceInfo)
    const { guest, authToken, loggedInUserDetails, loggedInUserType } = useSelector(state => state.Auth)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const removeGoogleAuth = async () => {
        try {
            await GoogleSignin.signOut();
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

    const callAPIforLogout = () => {
        let platformId = Platform.OS === 'ios' ? 2 : 1
        // console.log(name, email, password, confirmPass, deviceToken, deviceId, platformId);
        // return false
        LogoutUser(platformId, deviceToken, deviceId)
            .then((res) => {
                // TostMsg('Account registered')
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
                            (!guest && loggedInUserType === '1') &&
                            <ProfileSettingComponent
                                Icon={Images.Money}
                                Title={'Recent Investments'}
                                IconStyle={{ tintColor: 'rgba(255,255,255,0.4)' }}
                                onPress={() => navigation.navigate('AllInvestments')}
                                containerStyle={{ marginTop: 15 }}
                            />

                        }

                        <ProfileSettingComponent
                            Icon={Images.FAQ}
                            Title={'FAQ'}
                            containerStyle={{ marginTop: 15 }}
                        />

                        <ProfileSettingComponent
                            Icon={Images.Share}
                            Title={'Share'}
                            containerStyle={{ marginTop: 15 }}
                        />

                        <ProfileSettingComponent
                            Icon={Images.About}
                            IconStyle={{ tintColor: 'rgba(255,255,255,0.4)' }}
                            Title={'About Us'}
                            containerStyle={{ marginTop: 15 }}
                        />

                        <ProfileSettingComponent
                            Icon={Images.Recommended}
                            Title={'Recommended'}
                            containerStyle={{ marginTop: 15 }}
                        />

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

        </SafeAreaView >
    )
}

export default Settings;
