import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
// import * as mqtt from 'precompiled-mqtt';
// // const mqtt = require('precompiled-mqtt');

// const options = {
//     host: '192.168.0.109',
//     port: 1883,
//     // protocol: 'mqtts',
//     // username: 'bisonte',
//     // password: 'Bisonte000'
// }

// // initialize the MQTT client
// const client = mqtt.connect({options});

// // setup the callbacks
// client.on('connect', function () {
//     console.log('Connected');
// });

// client.on('error', function (error) {
//     console.log(error);
// });

// client.on('message', function (topic, message) {
//     // called each time a message is received
//     console.log('Received message:', topic, message.toString());
// });

// // subscribe to topic 'my/test/topic'
// client.subscribe('test');

// // publish message 'Hello' to topic 'my/test/topic'
// client.publish('test', 'Hello2');


export default function MqttScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.textomq}>Visente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textomq: {
    fontSize: 26,
    textAlign: 'center',
  },
});

