// import { signOut } from 'firebase/auth';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Dimensions, Button } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart';
import { auth } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
var wid = Dimensions.get('window').width;
var hei = Dimensions.get('screen').height;



export default function SettingsScreen({ navigation }) {

    const [colorGraf, setColorGraf] = useState('#FB8B24');
    const db = getDatabase();
    const uids = auth.currentUser.uid;
    const [todoData, setTodoData] = useState([])

    useEffect (() => {
        const starCountRef = ref(db, 'users/' + uids + '/Datos_Personales/');
        console.log(starCountRef);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(snapshot);
            console.log(data);
            // console.log(newPosts);
            setTodoData(data);
        });
    }, []) 

    const handlePress = (color, graf) => {ToastAndroid.show('Cambio el color a ' + color, ToastAndroid.SHORT); setColorGraf(graf)};

    const closeSession = () => {

        console.log('Funciono');
        console.log(auth.currentUser.uid);
        auth.signOut().then(() => {
                AsyncStorage.clear().then(() => {
                    // navigation.navigate('DetailsScreen', {datajson: null})
                // Aquí puedes navegar a la pantalla de iniciar sesión o hacer lo que quieras
                    navigation.navigate('Session');
                    ToastAndroid.show('Sesion cerrada con exito', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    })
                    .catch((error) => {
                    // Aquí puedes manejar el error si ocurre alguno
                    console.error(error);
                });
            
        })
    }

    const [ssid, setSsid] = useState('');
    const [wifi, setWifi] = useState('');

    const ejem = [{x: 0, y: 0.0044},{x: 1, y: 0.053},{x: 2, y: 0.241},{x: 3, y: 0.398},{x: 4, y: 0.241},
        {x: 5, y: 0.053},{x: 6, y: 0.0044},{x: 7, y: 0},{x: 8, y: 0},{x: 9, y: 0}];

    return(
        <View style={styles.container}>
            <View style={[styles.content,{flex:1}]}>
                    <Text style={styles.tex}>Datos Personales del Doctor:</Text>
                    <Text style={styles.tex2}>Nombre: {todoData.Nombre}</Text>
                    <Text style={styles.tex2}>Apellido: {todoData.Apellido}</Text>
                    <Text style={styles.tex2}>Correo: {todoData.Email}</Text>
                    <Text style={styles.tex}>Colores para Graficos:</Text>
                    <View style={[styles.content,{flex: 1, flexDirection: 'row', justifyContent: 'center'}]}>
                        <TouchableOpacity onPress={() => handlePress('naranj','#FB8B24')} style={[styles.botoncol,{backgroundColor: '#FB8B24'}]}>
                            <LinearGradient colors={['transparent', '#E6E9FA']} style={styles.background} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('Berde','green')} style={[styles.botoncol,{backgroundColor: 'green'}]}>
                        <LinearGradient colors={['transparent', '#E6E9FA']} style={styles.background} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('asul','blue')} style={[styles.botoncol,{backgroundColor: 'blue'}]}>
                        <LinearGradient colors={['transparent', '#E6E9FA']} style={styles.background} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('roj0','red')} style={[styles.botoncol,{backgroundColor: 'red'}]}>
                            <LinearGradient colors={['transparent', '#E6E9FA']} style={styles.background} /></TouchableOpacity>
                    </View>
                    <View style={[styles.content,{flex: 7}]}>
                        <Text style={styles.tex}>Grafico Ejemplo:</Text>
                        <View style={styles.grafv}>
                        {/* <SafeAreaView style={styles.grafv}> */}
                            <Chart
                                style={styles.grafg}
                                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                                xDomain={{ min: 0, max: 9 }}
                                yDomain={{ min: 0, max: 0.4 }}
                                // disableTouch={false}                        
                                >
                                <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                                <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                                <Area data={ejem} smoothing='bezier' tension={0.3} theme={{ gradient: { from: { color: colorGraf }, to: { color: 'white', opacity: 0.4 } }}} />
                                <Line data={ejem} smoothing='bezier' tension={0.3}
                                // tooltipComponent={<Tooltip />}
                                theme={{ stroke: { color: 'blue', width: 0.5 }, scatter: { default: { width: 0, height: 0, rx: 1 }} }} />
                                {/* <Line data={flow !== null? flowsum : dataPacCloud}
                                // tooltipComponent={<Tooltip />}
                                theme={{ stroke: { color: 'red', width: 1 }, scatter: { default: { width: 0, height: 0, rx: 1 }} }} /> */}
                            </Chart>
                        </View>
                    </View>
            </View>
            <TouchableOpacity onPress={closeSession} style={styles.button}>
                <Text style={styles.buttonText}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    grafv: {
        backgroundColor: '#E6E9FA',
        marginHorizontal: 'auto',
        paddingHorizontal: 2,
        width: wid*0.96,
        height: hei/4,
        borderRadius: 16
    },
    grafg: {
        height: hei/4.2,
        width: wid*0.94,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hei*0.05,
        borderRadius: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FC'
    },
    content: {
        width: wid,
        // backgroundColor: 'blue'
    },
    tex: {
        fontSize: 25,
        margin: 10,
        fontWeight: 'bold',
        color: '#09184D'
    },
    tex2: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 5,
        color: '#09184D'
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
        borderRadius: 16 
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botoncol: {
        width: wid*0.2,
        height: hei*0.05,
        borderRadius: 16,
        marginHorizontal: 5,
        borderColor: 'blue',
        borderWidth: 1,
    },
});