import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const SelectPaymentOption = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RazorPayPayment');
        }}
        style={style.button}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Razor pay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CasfFreePayment');
        }}
        style={[style.button, {backgroundColor: 'blue'}]}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Cashfree Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default SelectPaymentOption;
