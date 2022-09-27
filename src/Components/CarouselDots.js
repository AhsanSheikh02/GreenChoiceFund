import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../Assets/Colors/Index';

const CarouselDots = (props) => {
  const dots = [];
  for (let index = 0; index < props.count; index++) {
    if (props.selectedIndex === index) {
      dots.push(
        <View key={index + 1} style={styles.dotsContainer}>
          <View style={{ backgroundColor: colors.Secondary, alignSelf: 'center', width: 12, height: 12, borderRadius: 6, }} />
        </View>
      );
    } else {
      <View style={{ borderColor: 'white' }} />
      dots.push(
        <View key={index + 1} style={[styles.dotsContainer, { borderWidth: 0 }]}>
          <View style={{ width: 9, height: 9, backgroundColor: 'white', borderRadius: 50, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} />
        </View>
      );
    }
  }
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <View style={{ flexDirection: 'row' }}>
        {dots}
      </View>
      <Text>{props.label}</Text>
      {/* {(props.selectedIndex <= 1 || props.showSkip) && (<View>
        <TouchableOpacity
          onPress={props.skipPress}
        >
          <Text style={{ color: 'yellow', fontSize: 14, fontFamily: 'Roboto-Bold' }}>Skip</Text>
        </TouchableOpacity>
      </View>)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 15,
    height: 'auto',
    // backgroundColor:'red',

  },
  labelText: {},
  dotsContainer: {
    marginRight: 4,
    // padding:5,
    width: 20,
    height: 20,
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: 'gray',
    justifyContent: "center",
    alignItems: 'center',

  },
});

export default CarouselDots;
