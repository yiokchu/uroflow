import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableHighlight, FlatList, StyleSheet, Dimensions, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { auth } from '../../firebase-config';
import { ListItem, SearchBar } from '@rneui/themed';
import { dataPacCloud, nombreGraficas } from './DatosScreen';

var wid = Dimensions.get('window').width;
var hei = Dimensions.get('screen').height;


export default function HomeScreen({ navigation }) { 

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

    const [flow, setFlow] = useState(null);
    const [flowprom, setFlowprom] = useState(null);
    const [flowsum, setFlowsum] = useState(null);

    const [refreshing, setRefreshing] = useState(false);
    const datos2 = [
        { "x": 0.0, "y": 5.612 },
        { "x": 0.1, "y": 4.987 },
        { "x": 0.2, "y": 4.345 },
        { "x": 0.3, "y": 4.874 },
        { "x": 0.4, "y": 5.234 },
        { "x": 0.5, "y": 4.789 },
        { "x": 0.6, "y": 4.912 },
        { "x": 0.7, "y": 5.678 },
        { "x": 0.8, "y": 5.456 },
        { "x": 0.9, "y": 4.987 },
        { "x": 1.0, "y": 4.238 },
        { "x": 1.1, "y": 4.789 },
        { "x": 1.2, "y": 5.234 },
        { "x": 1.3, "y": 5.612 },
        { "x": 1.4, "y": 4.345 },
        { "x": 1.5, "y": 4.912 },
        { "x": 1.6, "y": 5.678 },
        { "x": 1.7, "y": 5.456 },
        { "x": 1.8, "y": 4.238 },
        { "x": 1.9, "y": 4.789 },
        { "x": 2.0, "y": 5.234 },
        { "x": 2.1, "y": 4.912 },
        { "x": 2.2, "y": 5.678 },
        { "x": 2.3, "y": 5.456 },
        { "x": 2.4, "y": 4.238 },
        { "x": 2.5, "y": 4.789 },
        { "x": 2.6, "y": 5.234 },
        { "x": 2.7, "y": 5.612 },
        { "x": 2.8, "y": 4.345 },
        { "x": 2.9, "y": 4.912 },
        { "x": 3.0, "y": 5.678 },
        { "x": 3.1, "y": 5.456 },
        { "x": 3.2, "y": 4.238 },
        { "x": 3.3, "y": 4.789 },
        { "x": 3.4, "y": 5.234 },
        { "x": 3.5, "y": 4.912 },
        { "x": 3.6, "y": 5.678 },
        { "x": 3.7, "y": 5.456 },
        { "x": 3.8, "y": 4.238 },
        { "x": 3.9, "y": 4.789 },
        { "x": 4.0, "y": 5.234 },
        { "x": 4.1, "y": 4.912 },
        { "x": 4.2, "y": 5.678 },
        { "x": 4.3, "y": 5.456 },
        { "x": 4.4, "y": 4.238 },
        { "x": 4.5, "y": 4.789 },
        { "x": 4.6, "y": 5.234 },
        { "x": 4.7, "y": 5.612 },
        { "x": 4.8, "y": 4.345 },
        { "x": 4.9, "y": 4.912 },
        { "x": 5.0, "y": 5.678 }
    ];

    let xMind = 0, xMaxd = 1, yMind = 0, yMaxd = 1, xMind2 = 0, xMaxd2 = 1, yMind2 = 0, yMaxd2 = 1, yMaxX = 0, yUlt = {x: 0, y: 0}, xflujo = 0;
    console.log(dataPacCloud);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if(dataPacCloud.length > 3){
            const varLocal = dataPacCloud.slice(0,-200);
            console.log(dataPacCloud.map((item) => item.y));
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
            // const prom = filteredVar.map((valor, indice, array) => {
            //     if (indice < 2) { // No hay suficientes elementos para calcular la diferencia de tres valores al principio
            //         if(indice == 0){
            //             return { x: (parseFloat(valor.x)).toFixed(2), y: 0 };
            //         } else {
            //             return(null);
            //         }
            //     } else {
            //         if (filteredVar.length - indice > 240) {
            //             if (indice%3 == 0) {
            //                 const dif = (
            //                     Math.abs(valor.y) +
            //                     Math.abs(array[indice - 1].y) +
            //                     Math.abs(array[indice - 2].y)
            //                     ) / (9);
            //                 return { x: (parseFloat(valor.x)).toFixed(2), y: dif };
            //             }else{
            //                 return(null);
            //             }
            //         } else {
            //             return(null);
            //         }
            //     }
            // })// Filtra los elementos nulos
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
            // const promdifs = promediarCadaCincoPuntos(filteredDifs);
            // const filteredPromdifs = promdifs.filter(element => element !== null);
            // const interp = filteredDifs.map((valor, indice, array) => {
            //     if (indice < 1) { // No hay suficientes elementos para calcular la diferencia de tres valores al principio
            //         // if (indice == 0){
            //             return { x: (parseFloat(valor.x)).toFixed(2), y: valor.y };
            //         // } else {
            //         //     return(null);
            //         // }
            //     } else {
            //         // if (indice%5 == 0) { Y = Y1 + (Y2-Y1)/(X2-x1) * (X - X1)
            //         const dif = array[indice -1].y + (((valor.y - array[indice -1].y)/2));
            //         return { x: (parseFloat(valor.x)).toFixed(2), y: dif };
            //         // } else {
            //         //     return(null);
            //         // }
                    
            //     }
            // })
            // const interpolarPuntos = (puntos) => {
            //     let puntosInterpolados = [];
                
            //     for (let i = 0; i < puntos.length - 1; i++) {
            //         const puntoActual = puntos[i];
            //         const puntoSiguiente = puntos[i + 1];
                
            //         // Convertir los valores de x a números
            //         const xActual = parseFloat(puntoActual.x);
            //         const xSiguiente = parseFloat(puntoSiguiente.x);
                
            //         // Calcular la diferencia entre los puntos
            //         const dx = (xSiguiente - xActual) / 3;
            //         const dy = (puntoSiguiente.y - puntoActual.y) / 3;
                
            //         // Crear los dos puntos interpolados
            //         const puntoInterpolado1 = {x: (xActual + dx).toFixed(4), y: (puntoActual.y + dy)};
            //         const puntoInterpolado2 = {x: (xActual + 2 * dx).toFixed(4), y: (puntoActual.y + 2 * dy)};
                
            //         // Agregar los puntos interpolados al arreglo resultante
            //         puntosInterpolados.push(puntoInterpolado1, puntoInterpolado2);
            //     }
                
            //     return puntosInterpolados;
            // };
            
            // const puntosConInterpolacion = interpolarPuntos(filteredPromdifs);
            // console.log(puntosConInterpolacion);
            // const filteredInterp = puntosConInterpolacion.filter(element => element !== null);
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
            setFlowsum(suma);
            // console.log(datosSuavizados);
            // console.log(filteredInterp);
            setFlowprom(filteredProm2);
            setFlow(datosSuavizados);
            console.log("Fileterd");
            console.log(filteredVar);
            console.log("Fileterdeodp");
            console.log(datosSuavizados); 
            console.log(filteredDifs);
            console.log("FFFFFIN");
        }
      }, [dataPacCloud]); // Dependencias del useEffect
    // useEffect(() => {
        if (flow !== null) {
            // console.log(flow);
            xMind = Math.min(...dataPacCloud.map((item) => item.x));
            xMaxd = Math.max(...flowprom.map((item) => item.x));
            yMind = Math.min(...dataPacCloud.map((item) => item.y));
            yMaxd = Math.max(...flowprom.map((item) => item.y));
            xMind2 = Math.min(...flow.map((item) => item.x));
            xMaxd2 = Math.max(...flow.map((item) => item.x));
            yMind2 = Math.min(...flow.map((item) => item.y));
            yMaxd2 = Math.max(...flow.map((item) => item.y));
            yMaxX = parseFloat(flow[flow.findIndex(max => max.y === yMaxd2)].x);
            yUlt = {x: flowprom[flowprom.length-1].x, y: flowprom[flowprom.length-1].y};
            let found = false;
            for (let i = 0; i < flow.length; i++) {
                if (flow[i].y < 2 && parseFloat(flow[i].x) > 14) {
                    found = true;
                    console.log('wdwdwdwdwdwd');
                    console.log(flow[i].y);
                    xflujo = parseFloat(flow[i].x);
                    break;
                }
            }
            console.log('wdddd');
            console.log(xflujo); 
        }   
    // }, [flow]); // Dependencias del useEffect
    
    
    
    return (
        <SafeAreaView style={{backgroundColor: '#F5F8FC'}}><ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ backgroundColor: '#09184D', textAlign: 'center', fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', width: wid, color: 'white' }}>
                    {nombreGraficas === "Bienvenido" ? nombreGraficas + " Dr. " + todoData.Nombre : nombreGraficas}</Text>
                <View style={{flex:1, marginVertical: 2 }}>
                    <Text style={{ margin: 8, fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 5}}>Flujo (ml/s):</Text>
                    <View style={styles.grafv}>
                        <Chart
                            style={styles.grafg}
                            // data={datajson.map((value, index) => ({ x: index * 0.05, y: value }))}
                            data={flow !== null? flow : dataPacCloud}
                            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                            xDomain={{ min: 0, max: xMaxd }}
                            yDomain={{ min: 0, max: 1.5*yMaxd2 }}
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
                <View style={{flex:1, marginVertical: 2 }}>
                    <Text style={{ margin: 8, fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Volumen (ml):</Text>
                    <View style={styles.grafv}>
                    {/* <SafeAreaView style={styles.grafv}> */}
                        <Chart
                            style={styles.grafg}
                            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                            xDomain={{ min: 0, max: xMaxd }}
                            yDomain={{ min: 0, max: yMaxd }}
                            // disableTouch={false}                        
                            >
                            <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                            <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                            <Area data={flow !== null? flowprom : dataPacCloud} theme={{ gradient: { from: { color: '#FB8B24' }, to: { color: 'white', opacity: 0.4 } }}} />
                            <Line data={flow !== null? flowprom : dataPacCloud}
                            // tooltipComponent={<Tooltip />}
                            theme={{ stroke: { color: 'blue', width: 0.5 }, scatter: { default: { width: 0, height: 0, rx: 1 }} }} />
                            {/* <Line data={flow !== null? flowsum : dataPacCloud}
                            // tooltipComponent={<Tooltip />}
                            theme={{ stroke: { color: 'red', width: 1 }, scatter: { default: { width: 0, height: 0, rx: 1 }} }} /> */}
                        </Chart>
                    </View>
                </View>
            </View>
            <View style={{flex:1, marginVertical: 2}}>
                <View style={{flex:1, padding: 20, marginVertical: 2}}>
                    <Text style={{ paddingTop: 0, fontSize: 20, fontWeight: 'bold'}}>Resultados</Text>
                    {/* <Text style={{ margin: 2, paddingTop: 20, fontSize: 15 }}>Flujo Medio</Text> */}
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Pico de Flujo: <Text style={{fontWeight: 'bold'}}>{yMaxd2.toFixed(2)} ml/s</Text></Text>
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Tiempo al Pico de Flujo: <Text style={{fontWeight: 'bold'}}>{yMaxX.toFixed(2)} segs</Text></Text>
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Volumen de Vaciado: <Text style={{fontWeight: 'bold'}}>{yUlt.y.toFixed(2)} ml</Text> </Text>
                    {/* <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Tiempo de flujo: {xflujo.toFixed(2)}</Text> */}
                    <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Tiempo de Vaciado: <Text style={{fontWeight: 'bold'}}>{yUlt.x.toFixed(2)} segs</Text></Text>
                    {/* <Text style={{ margin: 2, paddingTop: 20, fontSize: 14 }}>Intervalos:</Text> */}
                </View>
            </View>
            </ScrollView></SafeAreaView>
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
        backgroundColor: 'cyan',
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 10 
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
        backgroundColor: "cyan",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
});