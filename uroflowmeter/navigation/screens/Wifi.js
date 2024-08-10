import * as React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator, TouchableHighlight  } from 'react-native';
import { WebView } from 'react-native-webview';

    export default function WifiScreen({ navigation }) {

    const webViewRef = useRef();

    function LoadingIndicatorView() {
        return <ActivityIndicator color='#009b88' size='large' />
    }

    return (
        <View style={{flex: 1, backgroundColor: '#EDF2FA'}}><WebView
            ref={(ref) => webViewRef.current = ref}
            originWhitelist={['*']}
            source={{ uri: 'http://uroflowmeter.local/' }}  
            renderLoading={this.LoadingIndicatorView}
            startInLoadingState={true}
        /><TouchableOpacity onPress={() => webViewRef.current.reload()} style={styles.button}>
        <Text style={styles.buttonText}>Actualizar</Text>
    </TouchableOpacity></View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#7858f2',
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 16,
        alignSelf: 'center',
        width: 110
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    },
});