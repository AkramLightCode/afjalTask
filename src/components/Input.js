import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
const Input = ({
  label,
  iconName,
  error,
  password,
  value,
  onFocus = () => { }, ...props
}) => {

  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      {/* <Text style={style.label}>{label}</Text> */}
      <View style={[style.inputContainer, {
        borderColor: error ? 'red' : isFocused ? 'blue' : '#F3F4FB', alignItems: 'center',
      },]}>
        {/* <Image
          style={{ width: 17, height: 17, resizeMode: 'contain', marginEnd: 20 }}
          source={iconName} /> */}
        <TextInput
          autoCorrect={false}
          // onFocus={() => { onFocus(); setIsFocused(true); }}
          // onBlur={() => setIsFocused(false)}
          // secureTextEntry={hidePassword}
          style={{ color: '#7978B5', flex: 1 }}
          {...props}
        />
        {/* {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            < Image source={hidePassword ? require('../assets/passwordshow.png') : require('../assets/passwordhidden.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
          </TouchableOpacity>

        )} */}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: 'red', fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#BABBC3',
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#F3F4FB',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 5
  },
});
export default Input;
