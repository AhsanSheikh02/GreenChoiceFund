import React, { useState, useRef, useEffect } from 'react'
import {
    Image,
    Text,
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

// --------------------------------------------
import colors from '../Assets/Colors/Index'


const Dropdown = (props) => {

    const { leftIcon, list, pickerStyle, onSelectLanguage } = props

    const [value, setValue] = useState('')

    return (

        <DropDownPicker
            closeAfterSelecting={true}
            label="Approved"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
            dropDownMaxHeight={400}
            scrollViewProps={{
                nestedScrollEnabled: true,
            }}
            placeholder={valueRequired ? "State Required" : "State*"}
            placeholderStyle={{ color: valueRequired ? "red" : colors.white }}
            arrowIconStyle={{
                width: 20,
                height: 20,
                tintColor: valueRequired ? colors.Reddish : colors.white,
                alignSelf: 'center',
            }}


            tickIconStyle={{
                width: 20,
                height: 20,
                tintColor: 'white'
            }}


            dropDownContainerStyle={{
                backgroundColor: colors.Black,
                borderColor: valueRequired ? colors.Reddish : "#4B5563",
                width: "100%",
                alignSelf: 'center',
            }}

            arrowIconContainerStyle={{
                width: 30,
                height: 36,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
                opacity: valueRequired ? 0.5 : 1,
                backgroundColor: valueRequired ? "ccc2c2" : colors.midnight,
                justifyContent: 'center',
            }}
            style={{
                borderColor: valueRequired ? colors.Reddish : colors.grayish,
                color: colors.white,
                backgroundColor: colors.Black,
                // backgroundColor: 'red',
                width: "100%",
                minHeight: 40,
                height: 40,
                alignSelf: 'center',
                paddingRight: 2
            }}
            containerStyle={{
                marginTop: 15,
            }}
            textStyle={{
                color: colors.white,
                fontFamily: Fonts.Regular,
                fontSize: 14,
            }}
        />



    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: colors.textInput,
        height: 52,
        width: '100%',
        borderRadius: 12,
        paddingHorizontal: 8,
        marginTop: 12,
        alignSelf: 'center'
    },
    leftIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: colors.iconPrimary
    },

})

export default Dropdown;

