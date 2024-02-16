import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RazorPayPayment from './src/Razorpay/razorPay';
import SelectPaymentOption from './src/selectPayment';
import CasfFreePayment from './src/CashfreePay/cashfreePay';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SelectPaymentOption"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 15},
        }}>
        <Stack.Screen
          name="SelectPaymentOption"
          component={SelectPaymentOption}
        />
        <Stack.Screen name="RazorPayPayment" component={RazorPayPayment} />
        <Stack.Screen name="CasfFreePayment" component={CasfFreePayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
