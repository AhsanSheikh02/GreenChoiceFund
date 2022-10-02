import React, { useEffect } from 'react'
import {
    View,
    Image,
    Text,
    Platform
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import styles from './Styles'
import Images from '../../Assets/Images/Index'
import { Guest } from '../../Redux/Actions/Auth'
import { SplashMetaData } from '../../APIConfig/Config'
import { DeviceToken, DeviceId } from '../../Redux/Actions/DeviceInfo';
import { ContactUsReasons, Infographic, UserTypes } from '../../Redux/Actions/SplashMetaData'

const Splash = ({ navigation }) => {

    const { authToken, loggedInUserType } = useSelector(state => state.Auth)

    const dispatch = useDispatch()

    const callAPIforMetaData = () => {
        let typeTempArray = []
        let reasonTempArray = []
        SplashMetaData().then((res) => {
            for (const iterator of res?.data?.userType) {
                typeTempArray.push({
                    label: iterator?.name, value: iterator?.id,
                })
            }
            for (const iterator of res?.data?.contactUsReason) {
                reasonTempArray.push({
                    label: iterator?.name, value: iterator?.id,
                })
            }
            dispatch(UserTypes(typeTempArray))
            dispatch(ContactUsReasons(reasonTempArray))
            dispatch(Infographic(res?.data?.infographic))
        }).catch((err) => {
            console.log("callAPIforMetaData-err", err);
        })

    }

    const getDeviceId = async () => {
        let Id = await DeviceInfo.getAndroidId()
        dispatch(DeviceId(Id))
        console.log("getDeviceId", Id);
    }

    const getFcm = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                const fcmtoken = await messaging().getToken()
                dispatch(DeviceToken(fcmtoken))
                console.log('Device Token:', fcmtoken);
            }
        } catch (error) {
            console.log("getFcm-error", error);
        }
    }
    useEffect(() => {
        if (!authToken) {
            dispatch(Guest(true))
        }
        getFcm()
        getDeviceId()
        callAPIforMetaData()
        GoogleSignin.configure({
            webClientId: Platform.OS === 'ios' ? '514689965202-8g4poksbd8gqpfq8ncto5oos45o55dem.apps.googleusercontent.com' : '514689965202-mr498dfiovnvicdohvn5771pjecjlo91.apps.googleusercontent.com'

        });

        if (authToken) {
            console.log('.......................',loggedInUserType);
            if (loggedInUserType === '1') {
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeStack' }],
                    })
                }, 3500);
            }
            else {
                setTimeout(() => {
                    navigation.replace('OnBoarding')
                }, 3500);
            }
        } else {
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                })
            }, 3500);
        }

    }, [])


    return (
        <View style={styles.mainContainer}>
            <Image
                source={Images.Logo}
                style={styles.primaryLogo}
            />
            <Text style={[styles.Title, { marginTop: 30, fontWeight: '700' }]}>{'GREEN CHOICE'}</Text>
            <Text style={styles.Title}>{'FUND'}</Text>
            <Image
                source={Images.Earth}
                style={styles.secondaryLogo}
            />


        </View>
    )
}

export default Splash;
