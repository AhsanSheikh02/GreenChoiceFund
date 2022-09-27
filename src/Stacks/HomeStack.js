import React, { useState } from 'react'
import { View, Pressable, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Screens/Dashboard/Home/Index'
import Cart from '../Screens/Dashboard/Cart/Index';
import SubCategories from '../Screens/Dashboard/SubCategories/Index';
import Solutions from '../Screens/Dashboard/Solutions/Index';
import Settings from '../Screens/Dashboard/Settings/Index';
import Wishlist from '../Screens/Dashboard/Wishlist/Index';
import SolutionDetails from '../Screens/Dashboard/SolutionDetails/Index';
import Images from '../Assets/Images/Index';
import colors from '../Assets/Colors/Index';
import Fonts from '../Assets/Fonts/Index';
import LoginPopup from '../Components/FullImage';

const HomeScreenStack = createStackNavigator()
const Tab = createBottomTabNavigator();

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 50,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


const HomeStackScreens = () => {
    return (
        <HomeScreenStack.Navigator
            screenOptions={{
                // gestureEnabled: true,
                // gestureDirection: 'horizontal',
                headerShown: false,
                // transitionSpec: {
                //     open: config
                // }
            }} >
            <HomeScreenStack.Screen
                options={{
                    headerShown: false
                }} name={'HomeScreen'} component={Home} />
            <HomeScreenStack.Screen
                options={{
                    headerShown: false
                }} name={'SubCategories'} component={SubCategories} />
            <HomeScreenStack.Screen
                options={{
                    headerShown: false
                }} name={'Solutions'} component={Solutions} />
            <HomeScreenStack.Screen
                options={{
                    headerShown: false
                }} name={'SolutionDetails'} component={SolutionDetails} />
        </HomeScreenStack.Navigator>
    )
}


const TabStack = ({ navigation }) => {

    const { guest } = useSelector(state => state.Auth)
    const { noOfCartItems } = useSelector(state => state.Cart)

    return (
        <Tab.Navigator

            initialRouteName="HomeStackScreens"
            activeColor="#fff"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarStyle: {
                //     elevation: 10
                // }

            }}
            tabBar={(props) => {
                const { navigation, state } = props
                const activeColor = colors.Primary
                return (

                    <View style={styles.mainTabContainer}>


                        <Pressable
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                if (guest) {
                                    navigation.navigate("SignIn")
                                } else {
                                    navigation.navigate("Portfolio")
                                }
                            }}>
                            <Image
                                source={Images.Favorite}
                                resizeMode='contain'
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: state.index === 0 ? colors.Secondary : '#454d6c'
                                }}
                            />
                            <Text style={[styles.tabTitle, { color: state.index === 0 ? colors.Secondary : '#454d6c' }]}>{'Portfolio'}</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => { navigation.navigate("HomeStackScreens") }}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            <Image
                                source={Images.Home}
                                resizeMode='contain'
                                style={{
                                    width: 21,
                                    height: 21,
                                    tintColor: state.index === 1 ? colors.Secondary : '#454d6c'
                                }}
                            />
                            <Text style={[styles.tabTitle, { color: state.index === 1 ? colors.Secondary : '#454d6c' }]}>{'Home'}</Text>
                        </Pressable>

                        <Pressable
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                navigation.navigate("Cart")
                            }}>
                            {
                                noOfCartItems > 0 &&
                                <View style={styles.count}>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: Fonts.Regular,
                                        fontWeight: '400',
                                        color: colors.White,
                                    }}>{noOfCartItems}</Text>
                                </View>
                            }
                            <Image
                                source={Images.Cart}
                                resizeMode='contain'
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: state.index === 2 ? colors.Secondary : '#454d6c'
                                }}
                            />
                            <Text style={[styles.tabTitle, { color: state.index === 2 ? colors.Secondary : '#454d6c' }]}>{'Cart'}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { navigation.navigate("Settings") }}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            <Image
                                source={Images.Settings}
                                resizeMode='contain'
                                style={{
                                    width: 21,
                                    height: 21,
                                    tintColor: state.index === 3 ? colors.Secondary : '#454d6c'
                                }}
                            />
                            <Text style={[styles.tabTitle, { color: state.index === 3 ? colors.Secondary : '#454d6c' }]}>{'Settings'}</Text>
                        </Pressable>

                    </View>

                )
            }}>

            <Tab.Screen
                name="Portfolio"
                component={Wishlist}
            />
            <Tab.Screen
                name="HomeStackScreens"
                component={HomeStackScreens} />
            <Tab.Screen
                name="Cart"
                component={Cart} />
            <Tab.Screen
                name="Settings"
                component={Settings} />

        </Tab.Navigator>


    )
}


export default TabStack;

const styles = StyleSheet.create({

    mainTabContainer: {
        height: 68,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: colors.SecondaryTwo,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        borderRadius: 15,
    },
    tabTitle: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        fontWeight: '400',
        marginTop: 6
    },
    count: {
        height: 18,
        width: 18,
        borderRadius: 18,
        backgroundColor: colors.Secondary,
        position: 'absolute',
        top: 2,
        right: '28%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

