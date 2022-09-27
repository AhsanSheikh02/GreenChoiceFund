/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from './src/Redux/Store/Index'
import MainStack from './src/Stacks/MainStack';

export default function Main() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor} >
                    <App />
                </PersistGate>
            </Provider>
        </NativeBaseProvider>
    );
};



AppRegistry.registerComponent(appName, () => Main);