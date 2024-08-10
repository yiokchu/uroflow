import { defaultTo, defaults, delay } from 'lodash';
import * as React from 'react';
// import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from 'react';
import { Dimensions, View, Text, SafeAreaView, ScrollView, StyleSheet, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart';
// import { getApp, getApps, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// import SessionScreen from './navigation/screens/SessionScreen';
// import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { auth, app } from '../../firebase-config';



//global.Buffer = require('buffer').Buffer;
// Initialize Firebase

var wid = Dimensions.get('window').width;
var hei = Dimensions.get('screen').height;

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0hpNqMRWn53Xk-z1sBYWUhiZ0vdMjHaE",
    authDomain: "esp32ufmtr.firebaseapp.com",
    projectId: "esp32ufmtr",
    storageBucket: "esp32ufmtr.appspot.com",
    messagingSenderId: "71065566172",
    appId: "1:71065566172:web:4ae2be169b4b68839eed19",
    measurementId: "G-4LCN1BMYV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*************************************************************************************

*/



export default function DetailsScreen({ navigation }) {

    // const pruebax = // Descomentar esto para hacer prueba sin descargar del micro y a;adir valores, Ejem: C:\Users\User\Documents\Tesis\Datos Prueba.txt

    const [datajson, setDatajson] = useState(null);
    const [subirJson, setSubirJson] = useState(null);
    const [difsjson, setDifsjson] = useState(null);
    const [fall0, setFall0] = useState(false);
    // navigation.getParam('datajson')
    // const [zoomV, setZoomV] = useState('1');
    const [carg, setCarg] = useState('Cargando');

    useEffect(()  => {funcionjson()}, [] );
    const funcionjson = async() => {
        setFall0(false);
        setCarg('Cargando');
        try{
            const respuesta = await fetch ('http://uroflowmeter.local/datos.json'); // Comentar esto para hacer prueba sin descargar del micro
            const datosjson = await respuesta.json(); // Comentar esto para hacer prueba sin descargar del micro
            // setDatajson(datosjson);
            console.log(datosjson); // Comentar esto para hacer prueba sin descargar del micro
            const extractedData = Object.values(datosjson); // Comentar esto para hacer prueba sin descargar del micro
            console.log(extractedData); // Comentar esto para hacer prueba sin descargar del micro
            const puntos = extractedData.map((valor, indice) => { // Comentar esto para hacer prueba sin descargar del micro
                return { x: (indice+1)*0.0625, y: valor/1000 }; // Comentar esto para hacer prueba sin descargar del micro
            }) // Comentar esto para hacer prueba sin descargar del micro

            // const puntos = pruebax;  // Descomentar esto para hacer prueba sin descargar del micro y a;adir valores, Ejem: C:\Users\User\Documents\Tesis\Datos Prueba.txt

            // let dif = 0;
            // const puntos = datosprub;
            /*
            const prom = extractedData.map((valor, indice, array) => {
                if (indice < 5) { // No hay suficientes elementos para calcular la diferencia de tres valores al principio
                    if(indice == 0){
                        return { x: ((indice + 1) * 0.1).toFixed(2), y: 0 };
                    } else {
                        return(null);
                    }
                } else {
                    if (indice%8 == 0) {
                        const dif = (
                            Math.abs(valor) +
                            Math.abs(array[indice - 1]) +
                            Math.abs(array[indice - 2]) +
                            Math.abs(array[indice - 3]) +
                            Math.abs(array[indice - 4])
                            ) / (5 * 1000 * 0.0625);
                        return { x: ((indice + 1) * 0.1).toFixed(2), y: dif };
                    }else{
                        return(null);
                    }
                }
            })// Filtra los elementos nulos
            const filteredProm = puntos.filter(element => element !== null);
            let x1 = 0;
            const difs = filteredProm.map((valor, indice, array) => {
                if (indice < 2) { // No hay suficientes elementos para calcular la diferencia de tres valores al principio
                    // if (indice == 0){
                        return { x: (parseFloat(valor.x)).toFixed(2), y: 0 };
                    // } else {
                    //     return(null);
                    // }
                } else {
                    if (indice%3 == 0) {
                        const dif = (
                            Math.abs(valor.y - array[indice - 1].y) +
                            Math.abs(array[indice - 1].y - array[indice - 2].y) +
                            Math.abs(array[indice - 2].y - array[indice - 3].y)
                        ) / (3 * 0.0625);
                    return { x: (parseFloat(valor.x)).toFixed(2), y: dif };
                    } else {
                        return(null);
                    }
                    
                }
            })
            const filteredDifs = difs.filter(element => element !== null);
            const interp = filteredDifs.map((valor, indice, array) => {
                if (indice < 1) { // No hay suficientes elementos para calcular la diferencia de tres valores al principio
                    // if (indice == 0){
                        return { x: (parseFloat(valor.x)).toFixed(2), y: valor.y };
                    // } else {
                    //     return(null);
                    // }
                } else {
                    // if (indice%5 == 0) { Y = Y1 + (Y2-Y1)/(X2-x1) * (X - X1)
                    const dif = array[indice -1].y + (((valor.y - array[indice -1].y)/2));
                    return { x: (parseFloat(valor.x)).toFixed(2), y: dif };
                    // } else {
                    //     return(null);
                    // }
                    
                }
            })
            const filteredInterp = interp.filter(element => element !== null);
            */
            
            const varLocal = puntos.slice(0,-200);
            const filteredVar = varLocal.filter(element => element !== null);
            const promediarCadaCincoPuntos = (puntos) => {
                let puntosPromediados = [];
            
                for (let i = 2; i < puntos.length - 2; i += 1) {
                    // Calcular el promedio de y para los puntos i-2, i-1, i, i+1, i+2
                    const promedioY = (
                        parseFloat(puntos[i - 2].y) +
                        parseFloat(puntos[i - 1].y) +
                        parseFloat(puntos[i].y) +
                        parseFloat(puntos[i + 1].y) +
                        parseFloat(puntos[i + 2].y)
                    ) / 5;
                
                    // Crear un nuevo punto con el promedio de y
                    const puntoPromediado = {x: puntos[i].x, y: promedioY};
                
                    // Agregar el punto promediado al arreglo resultante
                    puntosPromediados.push(puntoPromediado);
                }
                
                // Eliminar los últimos 240 puntos
                
                return puntosPromediados;
            };
            
            const prom = promediarCadaCincoPuntos(filteredVar);
            const filteredProm = prom.filter(element => element !== null);
            const prom2 = promediarCadaCincoPuntos(filteredProm);
            const filteredProm2 = prom2.filter(element => element !== null);
            let ant = {x: 0, y: 0};
            const difs = filteredProm2.map((valor, indice, array) => {
                if (indice < 1) { // No hay suficientes elementos para calcular la diferencia de tres valores al principio
                    // if (indice == 0){
                        return { x: (parseFloat(valor.x)).toFixed(2), y: 0 };
                    // } else {
                    //     return(null);
                    // }
                } else {
                    // if (indice%5 == 0) {
                        const dif = (
                            valor.y - array[indice - 1].y
                        ) / (0.0625);
                        if(dif<0){
                            ant = { x: (parseFloat(valor.x)).toFixed(2), y: ant.y }
                            return ant;
                        }else{
                            ant = { x: (parseFloat(valor.x)).toFixed(2), y: dif };
                            return { x: (parseFloat(valor.x)).toFixed(2), y: dif };
                        }
                    // } else {
                    //     return(null);
                    // }
                    
                }
            })
            const filteredDifs = difs.filter(element => element !== null);
            function aplicarFiltroSG(datos, ventana) {
                // Asegúrate de que la ventana es impar y al menos 5
                if (ventana % 2 === 0 || ventana < 5) {
                    throw new Error('La ventana debe ser un número impar y mayor o igual a 5.');
                }
                
                const resultado = [];
                const mitadVentana = Math.floor(ventana / 2);
                
                for (let i = mitadVentana; i < datos.length - mitadVentana; i++) {
                    let sumatoria = 0;
                    let divisor = 0;
                
                    for (let j = -mitadVentana; j <= mitadVentana; j++) {
                        // Coeficientes del polinomio de segundo grado (ajustar según sea necesario)
                        let coeficiente = 1 - Math.abs(j / mitadVentana);
                        sumatoria += coeficiente * datos[i + j].y;
                        divisor += coeficiente;
                    }
                
                    resultado.push({
                    x: datos[i].x,
                    y: sumatoria / divisor
                    });
                }
                
                return resultado;
            }
            const datosSuavizados = aplicarFiltroSG(filteredDifs, 21);
            let sumando = 0;
            const suma = datosSuavizados.map((valor) => {
                sumando += valor.y*0.0625;
                return {x: valor.x, y: sumando};
            });
            console.log(filteredProm);
            console.log(filteredDifs);
            setSubirJson(datosjson); // Este es para subir el json tal cual se descarga del micro - Comentar esto para hacer prueba sin descargar del micro
            setDifsjson(datosSuavizados);
            setDatajson(filteredProm2);
        }catch(error){
            console.error(error);
            setCarg('Fallo la Descarga');
            setFall0(true);
        }
    }

    const uids = auth.currentUser.uid;
    const db = getDatabase();

    function storePaci(firstname,lastname,idPaci,datajson){
        if(crearP === true){
            const reference = ref(db, 'users/' + uids + '/Pacientes/' + carp);
            set (reference, { 
                Nombre: firstname,
                Apellido: lastname, ID: idPaci});
        }
        const referenceUr = ref(db, 'users/' + uids + '/Pacientes/' + carp + '/Datos_Uro/' + new Date().toString());
        set (referenceUr, { 
            Datos: datajson});
        setTimeout(() => {resetModal(), setConfirmVisible(false)}, 3000);
    }

    // function jsonDB(datajson){
    //     const reference = ref(db, 'users/' + uids + '/Datos-Uro/' + new Date().toString());
    //     set (reference, { Datos: datajson,
    //     });
    // }

    const [paciData, setPaci] = useState([]);
    const [crearP, setCrearP] = useState(false);
    const [carp, setCarp] = useState("");
    const [nomp, setNomp] = useState("");
    const [apep, setApep] = useState("");
    const [idp, setIdp] = useState("");
    const [search, setSearch] = useState("");
        const updateSearch = (search) => {
        setSearch(search);
        filterPaciData();
    };

    useEffect (() => {
        const pacientesRef = ref(db, 'users/' + uids + '/Pacientes/');
        console.log(pacientesRef);
        onValue(pacientesRef, (snapshot) => {
            const dataPaci = snapshot.val();
            console.log(snapshot);
            console.log(dataPaci);
            const nombresPacien = Object.keys(dataPaci).map(key => ({
                id: key,
                ...dataPaci[key]
            }));
            console.log(nombresPacien);
            setPaci(nombresPacien);
        });
    }, [])

    let xMin = 0;
    let xMax = 0;
    let yMin = 0;
    let yMax = 0;

    let xMind = 0;
    let xMaxd = 0;
    let yMind = 0;
    let yMaxd = 0;

    let yMaxX = 0, yUlt = {x: 0, y: 0}, xflujo = 0;

    if(datajson != null){
        xMin = Math.min(...datajson.map((item) => item.x));
        xMax = Math.max(...datajson.map((item) => item.x));
        yMin = Math.min(...datajson.map((item) => item.y));
        yMax = Math.max(...datajson.map((item) => item.y));
        xMind = Math.min(...difsjson.map((item) => item.x));
        xMaxd = Math.max(...difsjson.map((item) => item.x));
        yMind = Math.min(...difsjson.map((item) => item.y));
        yMaxd = Math.max(...difsjson.map((item) => item.y));
        yMaxX = parseFloat(difsjson[difsjson.findIndex(max => max.y === yMaxd)].x);
        yUlt = {x: datajson[datajson.length-1].x, y: datajson[datajson.length-1].y};
        let found = false;
        for (let i = 0; i < difsjson.length; i++) {
            if (difsjson[i].y < 2 && parseFloat(difsjson[i].x) > 14) {
                found = true;
                console.log('wdwdwdwdwdwd');
                console.log(difsjson[i].y);
                xflujo = parseFloat(difsjson[i].x);
                break;
            }
        }
    }

    const filterPaciData = () => {
        // Si search está vacío, devolver todo el arreglo
        if (search === "") {
            return paciData;
        }
        // Si no, devolver solo los elementos que contienen el valor de search en el item.id
        const regexio = new RegExp("\\b" + search, "i");
        return paciData.filter((item) => regexio.test(item.id));
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    // const [action, setAction] = useState("");

    const regex = /[^\w\s']/g;

    const resetModal = () => {
        setSearch(""); setCarp(""); setNomp(""); setApep(""); setIdp(""); setCrearP(false); setModalVisible(false);
    }

    const validateAndCreate = () => {
        // Aquí puedes usar alguna lógica de validación más compleja
        // Por simplicidad, solo vamos a verificar que los campos no estén vacíos
        if (crearP === true){
            if (nomp && apep && idp) {
                if (nomp.match(regex) || apep.match(regex) || idp.match(regex)){
                    Alert.alert("Error", "No debe poseer caracteres especiales");
                }else{
                    // createPatient();
                    // setCreateVisible(false);
                    setCarp(nomp + ' ' + apep + ' ' + idp);
                    setConfirmVisible(true);
                }            
            } else {
                Alert.alert("Error", "Debes llenar todos los campos");
        }}else{
            setConfirmVisible(true);
        }
    };

    // function storeHighScore(userId, score){
    //     const db = getDatabase();
    //     const reference = ref(db, 'users/' + userId);
    //     set (reference, { highscore: score,
    //     });
    // }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listItem}>
                <TouchableOpacity color={'white'} onBlur={true} onPress={() => {
                    console.log(item.id);
                    setCarp(item.id);
                    validateAndCreate()}}><Text style={styles.listText}>{item.id} </Text></TouchableOpacity>
            </View>
        );
    };

    return(
        <View style={{backgroundColor: '#F5F8FC'}}>
        <SafeAreaView>{datajson?(
        <ScrollView vertical={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                resetModal();}}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {crearP?(<><Text style={{paddingBottom: 30, padding: 15, fontSize: 20, fontWeight: 'bold'}}>Crear Paciente y Subir Datos</Text>
                        <TextInput
                            cursorColor='#09184D'
                            style={styles.input}
                            placeholder="Ingresa el Nombre del paciente"
                            value={nomp}
                            onChangeText={(e) => setNomp(e.replaceAll('-','_'))}
                        /><TextInput
                            cursorColor='#09184D'
                            style={styles.input}
                            placeholder="Ingresa el Apellido del paciente"
                            value={apep}
                            onChangeText={(e) => setApep(e.replaceAll('-','_'))}
                        /><TextInput
                            cursorColor='#09184D'
                            style={styles.input}
                            placeholder="Ingresa el ID del paciente"
                            value={idp}
                            onChangeText={(e) => setIdp(e.replaceAll('-','_'))}
                        /></>):(<>
                        <Text style={{padding: 15, fontSize: 20, fontWeight: 'bold'}}>Subir Datos</Text>
                        <TextInput
                            cursorColor='#09184D'
                            style={styles.input}
                            placeholder="Ingresa el nombre del paciente"
                            value={search}
                            onChangeText={(e) => updateSearch(e.replaceAll('-','_'))}
                        />{search?(<View style={{height: hei*0.3}}>
                        <FlatList
                            data={filterPaciData()}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        /></View>):(<></>)}</>)}
                        <TouchableOpacity style={[styles.botone, {width: 200}]}
                            // style={{ padding: 15, backgroundColor: '#4dfed1', display: 'flex'}}
                            onPress={() => {setCrearP(!crearP), console.log(nomp + '_' + apep + '_' + idp)}}>
                            <View style={{alignItems: 'center'}}>{crearP?(<>
                            <Text style={styles.texBotone}>Ver Lista de Pacientes</Text></>):(<>
                            <Text style={styles.texBotone}>Ir a Crear Paciente</Text>
                            </>)}</View>
                        </TouchableOpacity>
                        <View style={{padding: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: wid*0.7}}>
                        <TouchableOpacity style={[styles.botone]}
                            // style={{ padding: 15, backgroundColor: '#4dfed1', display: 'flex'}}
                            onPress={() => resetModal()}><Text style={styles.texBotone}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botone}
                            // style={{ padding: 15, backgroundColor: '#4dfed1', display: 'flex'}}
                            onPress={() => {if(crearP === true){validateAndCreate()}}}><Text style={styles.texBotone}>Subir</Text>
                        </TouchableOpacity></View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmVisible}
                onRequestClose={() => {
                setConfirmVisible(false);
                }}
                >
                <View style={styles.confirmView}>
                <Text style={styles.confirmText}>Confirme el Paciente destino:</Text>
                <Text style={styles.confirmText}>{carp}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => storePaci(nomp,apep,idp,subirJson)}
                >
                    <Text style={styles.buttonText}>Si</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setConfirmVisible(false)}
                >
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                </View>
            </Modal>
            {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
            <Text style={{ backgroundColor: '#09184D', textAlign: 'center', fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', width: wid, color: 'white' }}>Uroflujometría</Text>
            {/* <TextInput style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 10,}}
                    placeholder="Valor del Zoom en graficas (Default: 1)"
                    onChangeText={T => setZoomV(T)}
                    value={zoomV}/> */}
            <View style={{flex:1, marginVertical: 2 }}>
                <Text style={{ margin: 8, fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 5}}>Flujo (ml/s):</Text>
                <View style={styles.grafv}>
                    <Chart
                        style={styles.grafg}
                        // data={datajson.map((value, index) => ({ x: index * 0.05, y: value }))}
                        data={difsjson}
                        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                        xDomain={{ min: 0, max: xMax }}
                        yDomain={{ min: 0, max: yMaxd*1.5 }}
                        // disableTouch={false}                        
                        >
                        <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                        <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }}/>
                        <Area theme={{ gradient: { from: { color: '#FB8B24' }, to: { color: 'white', opacity: 0.4 } }}} />
                        <Line smoothing= 'bezier' tension={0.3}
                        // tooltipComponent={<Tooltip />}
                        theme={{ stroke: { color: 'blue', width: 0.5 }, scatter: { default: { width: 0, height: 0, rx: 1 }} }} />
                    </Chart>
                </View>
            </View>
            <View style={{ flex:1, marginVertical: 2 }}>
                <Text style={{ margin: 8, fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Volumen (ml):</Text>
                <View style={styles.grafv}>
                    <Chart
                        style={styles.grafg}
                        // data={datajson.map((value, index) => ({ x: index * 0.05, y: value }))}
                        data={datajson}
                        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                        xDomain={{ min: 0, max: xMax }}
                        yDomain={{ min: 0, max: yMax }}
                        // disableTouch={false}                        
                        >
                        <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                        <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }}/>
                        <Area theme={{ gradient: { from: { color: '#FB8B24' }, to: { color: 'white', opacity: 0.4 } }}} />
                        <Line 
                        // tooltipComponent={<Tooltip />}
                        theme={{ stroke: { color: 'blue', width: 0.5 }, scatter: { default: { width: 0, height: 0, rx: 1 }} }} />
                    </Chart>
                </View>
                <View style={{flex:1, marginVertical: 2}}>
                    <View style={{flex:1, padding: 20, marginVertical: 4, marginLeft: -8.5}}>
                        <Text style={{ paddingTop: 0, fontSize: 20, fontWeight: 'bold'}}>Resultados</Text>
                    {/* <Text style={{ margin: 2, paddingTop: 20, fontSize: 15 }}>Flujo Medio</Text> */}
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Pico de Flujo: <Text style={{fontWeight: 'bold'}}>{yMaxd.toFixed(2)} ml/s</Text></Text>
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Tiempo al Pico de Flujo: <Text style={{fontWeight: 'bold'}}>{yMaxX.toFixed(2)} segs</Text></Text>
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Volumen de Vaciado: <Text style={{fontWeight: 'bold'}}>{yUlt.y.toFixed(2)} ml</Text> </Text>
                    {/* <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Tiempo de flujo: {xflujo.toFixed(2)}</Text> */}
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Tiempo de Vaciado: <Text style={{fontWeight: 'bold'}}>{yUlt.x.toFixed(2)} segs</Text></Text>
                        {/* <Text style={{ margin: 2, paddingTop: 20, fontSize: 15 }}>Intervalos:</Text> */}
                    </View>
                </View>
            </View>
            <TouchableOpacity radius={15} style= {styles.botone} title='Subir' onPress={() => setModalVisible(true)}>
                <Text style={styles.texBotone}>Subir</Text>
            </TouchableOpacity>
            <TouchableOpacity radius={15} style= {styles.botone} title='Subir' onPress={() => funcionjson()}>
                <Text style={styles.texBotone}>Actualizar</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>): (<View style={styles.viewcon}>
            <Text style={{fontSize: 30, marginBottom: 50, fontWeight: 'bold', color: '#09184D'}}>{carg}</Text>{fall0?(
            <View><TouchableOpacity style={styles.botone} title='Try Again' onPress={funcionjson}>
                <Text style={styles.texBotone}>Volver a Intentar</Text>
            </TouchableOpacity></View>):(<></>)}
            </View>)}
        </SafeAreaView>
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
    viewcon: {
        height: hei,
        width: wid,
        paddingTop: hei/3,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        width: wid*0.6,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listText: {
        fontSize: 16,
    },
    botone: {
        backgroundColor: '#7858f2',
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 16 
    },
    confirmView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    confirmText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: "#7858f2",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    texBotone: {
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 4,
        fontSize: 16
    }
});
