import React, { useEffect, useState } from 'react';
import {
  LogBox
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import MainStack from './src/Stacks/MainStack';
import { InternetStatus } from './src/Redux/Actions/DeviceInfo'
import { useDispatch } from 'react-redux';
LogBox.ignoreAllLogs(true)

const App = () => {


  const dispatch = useDispatch()

  useEffect(() => {

    const checkConnectivity = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected ? ", state.isConnected);
      dispatch(InternetStatus(state.isConnected))
    });
  })
  return (
    <MainStack />
  );
};

export default App;
