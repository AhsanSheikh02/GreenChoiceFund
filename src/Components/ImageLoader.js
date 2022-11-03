import React, { useState } from "react";
import { ActivityIndicator, } from "react-native";
import colors from "../Assets/Colors/Index";


const ImageLoader = (props) => {
    const { isLoading, opacity } = props

    console.log({opacity});

    return (
        <ActivityIndicator
            size='small'
            color={colors.Secondary}
            animating
            style={[{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 999,
                opacity:opacity
            }]}
        />
    )
}


export default ImageLoader;


