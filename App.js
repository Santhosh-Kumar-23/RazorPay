import React from 'react';
import {View, Text, Button} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const App = () => {
  const amount = 100;
  const currency = 'INR';

  const handlePayment = () => {
    var options = {
      config: {
        display: {
          //show and hide payments method
          show: [{method: 'paylater'}],
          preferences: {show_default_blocks: true},
        },
      },
      description: 'Im buying a Innova car',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: currency,
      key: 'RAZORPAY_KEY_ID',
      amount: amount * 100,
      name: 'My app',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: '99msanthosh@gmail.com',
        contact: '9597654585',
        name: 'Santhosh Kumar',
      },

      theme: {color: 'blue'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('RESPONSE:', data);
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        console.log(`Payment Id::${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello</Text>
      <Button
        title="Pay Now"
        onPress={() => {
          handlePayment();
        }}
      />
    </View>
  );
};
export default App;
