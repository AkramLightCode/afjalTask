import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    // setLoading(true);
    // setTimeout(async () => {
    //   setLoading(false);
    //   let userData = await AsyncStorage.getItem('userData');
    //   if (userData) {
    //     userData = JSON.parse(userData);
    //     if (inputs.email == userData.email &&
    //       inputs.password == userData.password
    //     ) {
    //       navigation.navigate('Home');
    //       AsyncStorage.setItem('userData', JSON.stringify
    //         ({ ...userData, loggedIn: true }));
    //     }
    //     else { Alert.alert('Error', 'Invalid Details'); }
    //   }
    //   else { Alert.alert('Error', 'User does not exist'); }
    // }, 3000);


    setLoading(true);
    const payload = {
      email: inputs.email,
      password: inputs.password,
    };

    // console.warn('body', payload);
    fetch('https://user6.kustom.io/Coach-up/api/login', {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      body: payload,
    })
      .then(response => {
        console.warn('response', response), setLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });

  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  console.log('===============',inputs);
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: '#000', fontSize: 40, fontWeight: 'bold' }}>Log In</Text>
        <Text style={{ color: '#BABBC3', fontSize: 18, marginVertical: 10 }}> Enter Your Details to Login </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            iconName={require('../assets/message.png')}
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            value={inputs.email}
          />
          <Input
            iconName={require('../assets/padlock.png')}
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            value={inputs.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Signup')}
            style={{ color: '#000', fontWeight: 'bold', textAlign: 'center', fontSize: 16, }}>
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
