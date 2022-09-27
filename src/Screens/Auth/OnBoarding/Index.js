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

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import AppButton from '../../../Components/AppBtn'



const OnBoarding = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.mainContainer}>

            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false} >
                <Image
                    source={Images.OnBoarding}
                    style={styles.Logo}
                />
                {/* <Text style={styles.Title}>{'Reset Password'}</Text> */}
                <View style={{ marginTop: 44, alignItems: 'center' }}>
                    <Text style={[styles.onBoardingDesc]}>{`Invest with Passion,`}</Text>
                    <Text style={[styles.onBoardingDesc]}>{`Invest with Purpose`}</Text>
                </View>

                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={styles.sendEmail}>{`"...see the worldnot as it is, but as it should be."`}</Text>
                </View>

                <View style={{ marginTop: 90, alignItems: 'center' }}>
                    <Text style={[styles.onBoardingDescTwo]}>{`100% ESG Portfolio`}</Text>
                    <Text style={[styles.onBoardingDescTwo]}>{`Environment Sustainable Governance`}</Text>
                </View>





                <AppButton
                    label={"GO"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    icon={Images.Go}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeStack' }],
                        })
                    }}
                />

                <AppButton
                    label={"INSTITUTIONS ENTER HERE"}
                    style={[styles.btnStyle, { marginTop: 20, backgroundColor: '#5B95DE' }]}
                    labelStyle={styles.label}
                    icon={Images.Institution}
                    onPress={() => {
                        navigation.navigate('Inquiry')
                    }}
                />
            </KeyboardAwareScrollView>

        </SafeAreaView>


    )
}

export default OnBoarding;

