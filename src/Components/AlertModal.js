import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions, } from "react-native";
import Modal from "react-native-modal";

import colors from '../Assets/Colors/Index';
import Fonts from "../Assets/Fonts/Index";
import Images from "../Assets/Images/Index";

const deviceWidth = Dimensions.get('window').width


const AlertModal = (props) => {

    const {
        visible,
        onRequestClose,
        msg,
    } = props
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
                <Text style={styles.Title}>{'Please provide the following Info!'}</Text>
                <View style={{marginTop:10}}>
                    <Text style={styles.Desc}>{'Name'}</Text>
                    <Text style={styles.Desc}>{'Phone No'}</Text>
                    <Text style={styles.Desc}>{'Tax filing address'}</Text>
                    <Text style={styles.Desc}>{'Date Of Birth (must be at least 15 years)'}</Text>
                </View>


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
        // alignSelf: 'center'
    },
    Desc: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        color: colors.Secondary,
    },
});

export default AlertModal;


