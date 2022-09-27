import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    SafeAreaView,
    TextInput,
    Keyboard,
    Pressable,
    ActivityIndicator,

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-tiny-toast';

import styles from './Styles'
import colors from '../../../Assets/Colors/Index'
import Header from '../../../Components/Header'
import InvestmentItem from '../../../Components/InvestmentItem';
import moment from 'moment';



const InvestmentDetails = ({ navigation, route }) => {

    const { Details } = route?.params

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.order}>
                <Text style={styles.solution}>{item?.solution?.name}</Text>
            </View>
        )
    };

    const listHeaderComponent = () => {
        return (
            <>
                <View style={styles.order}>
                    <Text style={styles.title}>{Details?.formatted_investment_num}</Text>
                    <Text style={[styles.title, { color: Details?.text_color }]}>{Details?.investment_status}</Text>
                </View>
                {/* <Text style={[styles.desc, { fontWeight: '900', marginTop: 20 }]}>{'Total Solutions: '}
                    <Text style={[styles.desc, { fontWeight: '400' }]}>{Details?.investment_solutions.length}</Text>
                </Text> */}
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.desc, { fontWeight: '900', color: colors.Secondary, opacity: 1 }]}>{'Date'}</Text>
                    <Text style={[styles.detail]}>{moment(Details?.created_at).format('MM/DD/YYYY')}</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Text style={[styles.desc, { fontWeight: '900', color: colors.Secondary, opacity: 1 }]}>{'Amount'}</Text>
                    <Text style={[styles.detail]}>{Details?.formatted_invested_amount}</Text>
                </View>
                <Text style={[styles.desc, { fontWeight: '900', color: colors.Secondary, opacity: 1, marginTop: 20, marginBottom: 10 }]}>{'Solutions'}</Text>
            </>
        )
    }
    const listFooterComponent = () => {
        return (
            <>
                <Text style={[styles.desc, { fontWeight: '900', color: colors.Secondary, opacity: 1, marginTop: 20 }]}>{'Summary'}</Text>
                <View style={styles.userDetails}>
                    <Text style={[styles.detail]}>{Details?.name}</Text>
                    <Text style={[styles.detail]}>{Details?.email}</Text>
                    <Text style={[styles.detail]}>{`+${Details?.country_code}${Details?.contact_no}`}</Text>
                    <Text style={[styles.detail]}>{moment(Details?.dob).format('MM/DD/YYYY')}</Text>
                    <Text style={[styles.detail]}>{Details?.address}</Text>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={'Details'}
                isLeftIcon={true}
                navigation={navigation}
            />

            <View style={styles.innerContainer}>
                <FlatList
                    data={Details?.investment_solutions}
                    extraData={Details?.investment_solutions}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item?.id}
                    renderItem={(item) => renderItem(item)}
                    contentContainerStyle={{ flexGrow: 1, paddingTop: 15 }}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 10 }}></View>
                    }
                    ListHeaderComponent={listHeaderComponent}
                    ListFooterComponent={listFooterComponent}
                />
            </View>



        </SafeAreaView>
    )
}

export default InvestmentDetails;
