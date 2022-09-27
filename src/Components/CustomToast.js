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

import Toast from 'react-native-tiny-toast';
import colors from '../Assets/Colors/Index';




const CustomToast = (props) => {


    // <Toast
    //     visible={true}
    //     position={Toast.position.TOP}
    //     containerStyle={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    //     textStyle={{ color: colors.White }}
    // >
    //     {'wait'}
    // </Toast>


    Toast.show('Custom toast', {
        position: Toast.position.center,
        containerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
        textStyle: { color: colors.White },
    })

}

export default CustomToast

