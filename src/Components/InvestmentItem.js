import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import SimpleToast from 'react-native-simple-toast'

import colors from '../Assets/Colors/Index'
import Fonts from '../Assets/Fonts/Index'
import ImageLoader from './ImageLoader'
import moment from 'moment'




const InvestmentItem = (props) => {

    const { Item, navigation } = props
    const [isLoading, setIsLoading] = useState(false)

    return (


        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('InvestmentDetails', { Details: Item })}
            style={styles.mainContainer}>
            <View style={{ flex: 0.7, flexDirection: 'row' }}>
                <View style={{ width: '25%', justifyContent: 'center', }}>
                    <ImageLoader isLoading={isLoading} />
                    <Image
                        onLoadStart={() => {
                            setIsLoading(true)
                        }}
                        onError={(error) => console.log(error)}
                        onLoadEnd={() => {
                            setIsLoading(false)

                        }}
                        source={{ uri: Item?.investment_solutions[0]?.solution?.solution_media[0]?.image }}
                        style={styles.solutionImg} />
                </View>
                <View style={{ width: '75%', }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>{Item?.formatted_investment_num}</Text>
                        <Text style={styles.title}>{Item?.formatted_invested_amount}</Text>
                    </View>
                    <Text style={styles.desc}>{'Total Solutions: ' + Item?.investment_solutions.length}</Text>
                </View>

            </View>
            <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.desc}>{moment(Item?.created_at).format('DD-MM-YYYY')}</Text>
                <View style={{ backgroundColor: Item?.back_color, height: '80%', width: '30%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.status,{color:Item?.text_color}]}>{Item?.investment_status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default InvestmentItem;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.SecondaryTwo,
    },
    title: {
        fontSize: 19,
        fontFamily: Fonts.Regular,
        fontWeight: '600',
        color: colors.Secondary
    },
    desc: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
        opacity: 0.6,
        marginTop: 5
    },
    status: {
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        color: colors.White,
    },
    solutionImg: {
        height: 76,
        width: 76,
        borderRadius: 15,
        backgroundColor: colors.Placeholder
    },
})
