import React, { useState } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import colors from "../Assets/Colors/Index";


const Loader = ({ visible }) => {

    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <ActivityIndicator
                    size={'large'}
                    color={colors.White}
                />
            </View>
        </Modal>
    )
}


export default Loader;


