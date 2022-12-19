import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList,

} from 'react-native'
import Pdf from 'react-native-pdf';

import styles from './Styles'
import Images from '../../../Assets/Images/Index'
import Header from '../../../Components/Header'
import colors from '../../../Assets/Colors/Index'
import AppButton from '../../../Components/AppBtn';
import { useSelector } from 'react-redux';

{/* http://www.africau.edu/images/default/sample.pdf */ }
{/* https://www.orimi.com/pdf-test.pdf */ }
// 'https://www.orimi.com/pdf-test.pdf'
const Terms = ({ navigation, route }) => {

    const { termsUrl } = useSelector(state => state.Splash)
    return (


        <SafeAreaView style={styles.mainContainer} >

            <Header
                Title={'Terms & Conditions'}
                isLeftIcon={true}
                navigation={navigation}
            />
            <Pdf
                trustAllCerts={false}
                source={{ uri: termsUrl }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
            {/* <View style={styles.innerContainer}>

   
</View> */}

            <View style={styles.btnContainer}>
                <AppButton
                    label={"REJECT"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
                <AppButton
                    label={"ACCEPT"}
                    style={styles.btnStyle}
                    labelStyle={styles.label}
                    onPress={() => {
                        navigation.replace('Investment')
                    }}
                />
            </View>
        </SafeAreaView >
    )
}

export default Terms;
