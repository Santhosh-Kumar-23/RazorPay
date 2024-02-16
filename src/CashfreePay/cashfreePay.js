import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StatusBar, Button, Text, Alert} from 'react-native';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFEnvironment,
  CFSession,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFDropCheckoutPayment,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {useFocusEffect} from '@react-navigation/native';

const CasfFreePayment = () => {
  const [randomOrderId, setRandomOrderId] = useState(0);
  const [payment_session_id, set_payment_session_id] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      //Generate Random alphanumeric
      var array =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var len = 10;

      const randomOrderIdArray = [...Array(len)].reduce(
        a => a + array[~~(Math.random() * array.length)],
        '',
      );
      console.log('AAAAAAAAAA', randomOrderId);
      setRandomOrderId(randomOrderIdArray);

      //order create
      fetch('https://sandbox.cashfree.com/pg/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2023-08-01',
          'x-client-id': 'TEST10130917e77c2d8f65d2b966983471903101',
          'x-client-secret':
            'cfsk_ma_test_eb218e66de665a25f457512dfbc9e0aa_04e7b673',
        },
        body: JSON.stringify({
          customer_details: {
            customer_id: 'Customer1',
            customer_phone: '1234567897',
            customer_name: 'Gurusaran',
          },
          order_id: randomOrderIdArray,
          order_amount: 40,
          order_currency: 'INR',
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('CREATE ORDER::::', responseJson);
          set_payment_session_id(responseJson?.payment_session_id ?? null);
          // console.log('PAYMENT SESSION ID:::', payment_session_id);
        })
        .catch(e => {
          console.log('CATCH ERROR:::', e);
        });
    }, []),
  );

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        fetch(`https://sandbox.cashfree.com/pg/orders/${orderID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-version': '2023-08-01',
            'x-client-id': 'TEST10130917e77c2d8f65d2b966983471903101',
            'x-client-secret':
              'cfsk_ma_test_eb218e66de665a25f457512dfbc9e0aa_04e7b673',
          },
        })
          .then(res => res.json())
          .then(jsonRes => {
            console.log('JSONRES:::', jsonRes);
          })
          .catch(e => {
            console.log('CATCH ERROR::::', e);
          });
      },
      onError(CFErrorResponse, orderID) {
        console.log('failed ', orderID);
      },
    });
    return () => CFPaymentGatewayService.removeCallback();
  }, []);

  const startCheckout = () => {
    try {
      const session = new CFSession(
        payment_session_id,
        randomOrderId,
        CFEnvironment.SANDBOX,
      );

      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('blue')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('blue')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );
      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 15, marginBottom: 10}}>Test razor pay</Text>
      <Button
        title="Pay Now"
        onPress={() => {
          startCheckout();
        }}
      />
    </View>
  );
};

export default CasfFreePayment;
