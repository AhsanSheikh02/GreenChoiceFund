
import React, { useEffect, useState } from 'react'
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import { View, Text } from 'react-native'

const CountryPickerModal = (props) => {

    const { visible, callingCode=()=>{} } = props

    const [countryCode, setCountryCode] = useState('US')
    const [country, setCountry] = useState(null)
    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        callingCode(country.callingCode[0])
    }

    return (
        // <CountryPicker
        //     show={visible}
        //     disableBackdrop={false}
        //     onBackdropPress={onSelectCountry}
        //     // when picker button press you will get the country object with dial code
        //     pickerButtonOnPress={(item) => {
        //         countryCode(item.dial_code)
        //         console.log(item.dial_code);
        //         onSelectCountry()
        //         // setShow(false);
        //     }}
        // />



        <View>

            <CountryPicker
                {...{
                    countryCode,
                    withFilter,
                    withFlag,
                    withCountryNameButton,
                    withAlphaFilter,
                    withCallingCode,
                    withEmoji,
                    onSelect,
                }}
                visible={visible}
            />

        </View>


    )
}

export default CountryPickerModal;

