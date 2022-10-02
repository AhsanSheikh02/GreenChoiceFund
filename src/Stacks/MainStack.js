import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native'

// --------------------------------------------------------
import Splash from '../Screens/Splash/Index'
import HomeStack from './HomeStack';
import EditProfileIndex from '../Screens/Dashboard/EditProfile/Index';
import Terms from '../Screens/Dashboard/Terms/Index';
import Investment from '../Screens/Dashboard/Investment/Index';
import Accounts from '../Screens/Dashboard/Accounts/Index';
import AllInvestments from '../Screens/Dashboard/AllInvestments/Index';
import InvestmentDetails from '../Screens/Dashboard/InvestmentDetails/Index';
import SignUp from '../Screens/Auth/SignUp/Index';
import SignIn from '../Screens/Auth/SignIn/Index';
import OnBoarding from '../Screens/Auth/OnBoarding/Index';
import ForgotPassword from '../Screens/Auth/ForgotPassword/Index'
import PersonalDetails from '../Screens/Auth/PersonalDetails/Index';
import Inquiry from '../Screens/Auth/Inquiry/Index';
import colors from '../Assets/Colors/Index';

const Stack = createStackNavigator()

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const navigationAnimation = ({ current }) => ({
    cardStyle: {
        backgroundColor: colors.Primary,
        opacity: current.progress,
    },
});
const MainStack = () => {

    return (
        <NavigationContainer>
            <StatusBar barStyle='light-content' translucent backgroundColor={colors.SecondaryTwo} />
            <Stack.Navigator

                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                    // transitionSpec: {
                    //     open: config
                    // }
                }} initialRouteName='Splash'>

                <Stack.Screen
                    // options={{ cardStyleInterpolator: navigationAnimation }}
                    name="Splash" component={Splash} />
                <Stack.Screen
                    // options={{ cardStyleInterpolator: navigationAnimation }}
                    name="SignIn" component={SignIn} />
                <Stack.Screen
                    // options={{ cardStyleInterpolator: navigationAnimation }}
                    name="SignUp" component={SignUp} />
                <Stack.Screen
                    // options={{

                    //     transitionSpec: {
                    //         open: TransitionSpecs.TransitionIOSSpec,
                    //         close: TransitionSpecs.TransitionIOSSpec,
                    //     },
                    // }}
                    // options={{ cardStyleInterpolator: navigationAnimation }}
                    name="PersonalDetails" component={PersonalDetails} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Inquiry" component={Inquiry} />
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="EditProfileIndex" component={EditProfileIndex} />
                <Stack.Screen name="Terms" component={Terms} />
                <Stack.Screen name="Investment" component={Investment} />
                <Stack.Screen name="Accounts" component={Accounts} />
                <Stack.Screen name="AllInvestments" component={AllInvestments} />
                <Stack.Screen name="InvestmentDetails" component={InvestmentDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;
