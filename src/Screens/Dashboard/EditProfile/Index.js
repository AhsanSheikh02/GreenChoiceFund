import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,

} from 'react-native'

import styles from './Styles'
import Header from '../../../Components/Header'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import colors from '../../../Assets/Colors/Index'

const EditProfileIndex = ({ navigation }) => {

    const [tab, setTab] = useState(1)

    const switchTab = () => {
        switch (tab) {
            case 1:
                return <ChangePassword />;
                break;
            case 2:
                return <EditProfile />;
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                Title={tab == 1 ? 'Change Password' : 'Edit Profile'}
                isLeftIcon={true}
                navigation={navigation}
            />
            <View style={styles.innerContainer}>

                <View style={styles.settingsTab}>
                    <TouchableOpacity
                        onPress={() => setTab(1)}
                        activeOpacity={0.8}
                        style={[styles.tab,
                        {
                            backgroundColor: tab == 1 ? '#5B95DE' : colors.SecondaryTwo,
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                        }]}>
                        <Text
                            style={[styles.tabTitle, { color: tab == 1 ? colors.Black : 'rgba(255,255,255,0.4)' }]}>{'Change Password'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTab(2)}
                        activeOpacity={0.8}
                        style={[styles.tab,
                        {
                            backgroundColor: tab == 2 ? '#5B95DE' : colors.SecondaryTwo,
                            borderTopRightRadius: 10, borderBottomRightRadius: 10
                        }]}>
                        <Text
                            style={[styles.tabTitle, { color: tab == 2 ? colors.Black : 'rgba(255,255,255,0.4)' }]}>{'Profile'}
                        </Text>
                    </TouchableOpacity>
                </View>


                {switchTab()}

            </View>
        </SafeAreaView>
    )
}

export default EditProfileIndex;
