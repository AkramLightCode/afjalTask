import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Keyboard} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

const Signup = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const [inputs, setInputs] = React.useState({
    email: '',
    firstname: '',
    phonenumber: '',
    password: '',
    confirmpassword: '',
  });

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please enter email', 'email');
      isValid = false;
    }
    if (!inputs.firstname) {
      handleError('Please enter name', 'firstname');
      isValid = false;
    }
    if (!inputs.phonenumber) {
      handleError('Please enter number', 'phonenumber');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please enter password', 'password');
      isValid = false;
    }
    if (!inputs.confirmpassword) {
      handleError('Please enter confirmpassword', 'confirmpassword');
      isValid = false;
    } else {
      onSignUpHandler();
    }
  };

  const onSignUpHandler = () => {
    setLoading(true);
    const payload = {
      first_name: inputs.firstname,
      email: inputs.email,
      password: inputs.password,
      confirm_password: inputs.confirmpassword,
      phone_number: inputs.phonenumber,
    };
    // console.warn('body', payload);
    fetch('https://user6.kustom.io/Coach-up/api/register', {
      method: 'POST',
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
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: '#000', fontSize: 40, fontWeight: 'bold'}}>
          Register
        </Text>
        <Text style={{color: '#BABBC3', fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            placeholder="Enter your email address"
            error={errors.email}
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            value={inputs.email}
          />
          <Input
            placeholder="Enter your frist name"
            error={errors.firstname}
            onChangeText={text => handleOnchange(text, 'firstname')}
            onFocus={() => handleError(null, 'firstname')}
            value={inputs.firstname}
          />
          <Input
            keyboardType="numeric"
            placeholder="Enter your phone number"
            error={errors.phonenumber}
            onChangeText={text => handleOnchange(text, 'phonenumber')}
            onFocus={() => handleError(null, 'phonenumber')}
            value={inputs.phonenumber}
          />
          <Input
            placeholder="Enter your password"
            error={errors.password}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            value={inputs.password}
          />
          <Input
            placeholder="Enter your confirm password"
            error={errors.confirmpassword}
            onChangeText={text => handleOnchange(text, 'confirmpassword')}
            onFocus={() => handleError(null, 'firstname')}
            value={inputs.confirmpassword}
          />
          <Button title="Register" onPress={() => validate()} />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Signup;
