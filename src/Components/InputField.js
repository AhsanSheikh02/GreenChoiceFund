import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import colors from '../Assets/Colors/Index';
import Fonts from '../Assets/Fonts/Index';

const InputField =
  ({
    rightIcon,
    placeholder,
    value,
    onChangeText,
    password,
    autoCapitalize,
    isRightIcon,
    keyBoardType,
    returnKeyType,
    onSubmitEditing,
    fieldRef,
    customStyle,
    rightIconOnPress,
    label,
    multiline,
    rightIconStyle,
    editable,
    maxLength,
    isLeftIcon
  }) => {
    return (
      <View style={[styles.mainContainer, customStyle]}>

        {
          isLeftIcon &&
          <View style={styles.currencyIcon}>
            <Text style={{ fontSize: 14, fontFamily: Fonts.Light, color: colors.White }}>{'$'}</Text>
          </View>
        }


        <View style={[styles.input, {
          width: isRightIcon ? '88%' : isLeftIcon ? '97%' : '100%',
          justifyContent: multiline ? 'flex-start' : 'center',
        }]}>
          <TextInput
            style={{ fontSize: 14, fontFamily: Fonts.Light, color: colors.White }}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}
            placeholderTextColor={'rgba(255,255,255,0.2)'}
            autoCapitalize={autoCapitalize}
            keyboardType={keyBoardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            editable={editable}
            ref={fieldRef}
            blurOnSubmit={false}
            maxLength={maxLength}

          />

        </View>


        {
          isRightIcon &&
          <View style={styles.passwordIcon}>
            <TouchableOpacity
              onPress={rightIconOnPress}
              activeOpacity={0.4}
            >
              <Image source={rightIcon} style={[styles.rightIconStyle]} />
            </TouchableOpacity>
          </View>
        }



      </View>


    )
  };

export default InputField;

const styles = StyleSheet.create({

  mainContainer: {
    flexDirection: 'row',
    //backgroundColor: colors.textInput,
    height: 52,
    width: '100%',
    backgroundColor: colors.textInput,
    borderWidth: 0.75,
    borderColor: colors.Primary,
    paddingHorizontal: 8,
    elevation: 0,
    borderRadius: 12
  },
  icon: {
    height: '100%',
    width: '12%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  passwordIcon: {
    height: '100%',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyIcon: {
    height: '100%',
    width: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    //color: colors.textSecondary,
    height: '100%',
  },
  rightIconStyle: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
    tintColor: colors.Secondary
  },
});
