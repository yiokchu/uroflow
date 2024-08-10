import React, { useEffect, useState, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, SafeAreaView, Dimensions, FlatList, RefreshControl, Alert } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { auth, app } from '../../firebase-config';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from '@rneui/themed';

var wid = Dimensions.get('window').width;
var hei = Dimensions.get('screen').height;

let dataPacCloud = [{ "x": 0, "y": 0 }, { "x": 1, "y": 1 }];
let nombreGraficas = "Bienvenido";

let xMind = 0, xMaxd = 0, yMind = 1, yMaxd = 1;
xMind = Math.min(...dataPacCloud.map((item) => item.x));
    xMaxd = Math.max(...dataPacCloud.map((item) => item.x));
    yMind = Math.min(...dataPacCloud.map((item) => item.y));
    yMaxd = Math.max(...dataPacCloud.map((item) => item.y));

const DatosScreen = ({navigation}) => {

    

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // const [desRef, setDesRef] = useState();

    // // Get a database reference to our posts
    //     const db = getDatabase();
    //     const refe = ref(db,'users');

    // // Attach an asynchronous callback to read the data at our posts reference
    //     ref.on('value', (snapshot) => {
    //     console.log(snapshot.val());
    //     }, (errorObject) => {
    //     console.log('The read failed: ' + errorObject.name);
    //     }); 

    // const [data, setData] = useState(null);

    const [search, setSearch] = useState("");
        const updateSearch = (search) => {
        setSearch(search);
        filterPaciData();
    };
    const filterPaciData = () => {
        // Si search está vacío, devolver todo el arreglo
        if (search === "") {
            return paciData;
        }
        // Si no, devolver solo los elementos que contienen el valor de search en el item.id
        return paciData.filter((item) => item.id.includes(search));
    };

    const db = getDatabase();

    // Get a database reference to our posts
        const [todoData, setTodoData] = useState([])
        const [paciData, setPaci] = useState([])
        const uids = auth.currentUser.uid;
        console.log('UID:' + uids);

        // useEffect (() => {
        //     const pruebaRef = ref(db, 'users/' + uids + '/');
        //     console.log(pruebaRef)
        //     onValue(pruebaRef, (snapshot) => {
        //         const pij = snapshot.val();
        //         console.log(snapshot);
        //         console.log(pij);
        //     });
        // }, [])  

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
                // try{
                // for(let i in data){
                //     const v = data[i];
                //     console.log(v);
                // }}catch(error){
                //     console.log(error);
                // }
                console.log(nombresPacien);
                setPaci(nombresPacien);
            });
        }, [])  
    
        const [expanded, setExpanded] = useState ([]);
        for (let i = 0; i < paciData.length; i++) {
            expanded.push(false);
        }
        const [expanded2, setExpanded2] = useState ([]);
        for (let i = 0; i < filterPaciData.length; i++) {
            expanded2.push(false);
        }

        function descargaDatos(desRef, llave, itemid){
            const datRef = desRef;
            onValue(datRef, (snapshot) => {
                const datosUro = snapshot.val();
                console.log(snapshot);
                dataPacCloud = datosUro.Datos.map((valor, indice) => {
                    return { x: (indice+1)*0.0625, y: valor/1000 };
                });
                nombreGraficas = itemid.toString();
                console.log(datRef);
                console.log(dataPacCloud);
                // console.log(datosUro);
                // setPaci(nombresPacien);
            });
            Alert.alert("Datos Descargados", '\n' + itemid + ': ' + llave + '\n\n' + 'Ha sido redirigido a Home.\nActualice para ver la Grafica');
            navigation.navigate('Home');
        };

    // // Crear un efecto para leer los datos una vez
    // useEffect(() => {
    // // Obtener una referencia a la ruta '/users/123'
    //     const db = getDatabase(app);
    //     const ref = db.ref('/users/123');
    //     // const ref = ref(db,'users');
    //     // const ref = database().ref('/users/123');
    
    //     // onValue(ref, (snapshot) => {
    //     //     // // Actualizar el estado con el valor del snapshot
    //     //             setData(snapshot.val());
    //     //         });
    //     ref.on('value',(snapshot) => {
    //         // // Actualizar el estado con el valor del snapshot
    //                 console.log(snapshot.val())})
    //         }, []);




        // const ref = useRef(null);
        // console.log(ref.current);


    // // Leer los datos una vez
    //     ref.once('value').then(snapshot => {
    // // Actualizar el estado con el valor del snapshot
    //         setData(snapshot.val());
    //     });
    // }, []);

    // useEffect(()  => {funcionjson()}, [] );

    // const [datajson, setDatajson] = useState(null);
    // const funcionjson = async() => {
    //     try{
    //         const respuesta = await fetch ('http://192.168.0.112/datos.json');
    //         const datosjson = await respuesta.json();
    //         //setDatajson(datosjson);
    //         const extractedData = Object.values(datosjson.X);
    //         setDatajson(extractedData);
    //     }catch(error){
    //         console.error(error);
    //     }
    // }

        // function jsonDB(datajson){
    //     const uids = auth.currentUser.uid;
    //     const db = getDatabase();
    //     const reference = ref(db, 'users/' + uids + '/' + 'Datos-Uro/' + new Date().toString());
    //     set (reference, { Datos: datajson,
    //     });
    // }

        return (
            <SafeAreaView style={{backgroundColor: '#F5F8FC'}}><ScrollView 
                stickyHeaderIndices={[0]}
                // scrollEnabled={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                <SearchBar
                    cursorColor='#09184D'
                    placeholder="Buscar un paciente..."
                    onChangeText={(e) => updateSearch(e.replaceAll('-','_'))}
                    value={search}
                    lightTheme={true}
                    round={true}
                    showCancel={true}
                    platform='android'
                />
                {search?(
                <FlatList 
                    scrollEnabled={false}
                    data={filterPaciData()} // Pasar el arreglo filtrado como data
                    renderItem={({ item }) => ( // Pasar una función que renderiza cada elemento
                    <View key={item.id}>
                        <ListItem.Accordion
                        content={
                            <ListItem.Content>
                            <ListItem.Title>{item.id}</ListItem.Title>
                            </ListItem.Content>
                        }
                        isExpanded={expanded2[item.id]}
                        onPress={() => {
                            let newExpanded = {};
                            // Recorre el arreglo paciData
                            for (let i = 0; i < paciData.length; i++) {
                            // Agrega el valor false al objeto newExpanded
                            newExpanded[paciData[i].id] = false;
                            }
                            // Cambia el valor de expanded según el id
                            newExpanded[item.id] = !expanded2[item.id];
                            // Actualiza el estado con el nuevo objeto
                            setExpanded2(newExpanded);
                            // Muestra el resultado por consola
                            // console.log(expanded2);
                            // console.log(expanded2[item.id]);
                        }}
                        >
                        {Object.keys(item.Datos_Uro).map((key, i) => (
                            <View>
                            <ListItem>
                                <ListItem.Content>
                                <TouchableHighlight activeOpacity={0.9} underlayColor="#EDF2FA" 
                                    onPress={() => {
                                        try{
                                            // console.log(key);
                                            // console.log(item.id);
                                            const datRef = ref(db, 'users/' + uids + '/Pacientes/' + item.id + '/Datos_Uro/' + key);
                                            // setDesRef(datRef);
                                            // console.log(desRef);
                                            descargaDatos(datRef, key, item.id);
                                        console.log(desRef);
                                    }catch(error){console.log(error)}}}
                                ><View>
                                    <ListItem.Title key={i}>{key}</ListItem.Title>
                                </View></TouchableHighlight>
                                </ListItem.Content>
                            </ListItem>
                            </View>
                        ))}
                        </ListItem.Accordion>
                    </View>
                    )}
                />):(<View>
                {/* <ScrollView 
                    // stickyHeaderIndices={[0]}
                    refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    > */}
                    <Text style={styles.tex}>Pacientes:</Text>
                    {
                        paciData.map((item,index) => {try{
                            return(
                                <View key={index}>
                                    {/* <Text>{item.id}</Text> */}
                                    <ListItem.Accordion
                                        content={
                                        <ListItem.Content>
                                            <ListItem.Title>{item.id}</ListItem.Title>
                                        </ListItem.Content>
                                        }
                                        isExpanded={expanded[index]}
                                        onPress={() => {
                                            let newExpanded = [];
                                            // Recorre el arreglo paciData
                                            for (let i = 0; i < paciData.length; i++) {
                                            // Agrega el valor false al final del arreglo newExpanded
                                            newExpanded.push(false);
                                            }
                                            // Cambia el valor de expanded según el índice
                                            newExpanded = expanded.map ( (item, idx) => idx === index ? !item : item);
                                        
                                            // Actualiza el estado con el nuevo arreglo
                                            setExpanded(newExpanded);
                                        
                                            // Muestra el resultado por consola
                                            // console.log(expanded);
                                            // console.log(expanded[index]);
                                        }}
                                    >
                                        {Object.keys(item.Datos_Uro).map((key, i) => (
                                            <View>
                                                <ListItem>
                                                    <ListItem.Content>
                                                        <TouchableHighlight activeOpacity={0.9} underlayColor="#EDF2FA" onPress={() => {
                                                            // console.log(key);
                                                            // console.log(item.id);
                                                            const datRef = ref(db, 'users/' + uids + '/Pacientes/' + item.id + '/Datos_Uro/' + key);
                                                            // setDesRef(datRef);
                                                            // console.log(desRef);
                                                            descargaDatos(datRef, key, item.id);
                                                        }}><View>
                                                        <ListItem.Title key={i}>{key}</ListItem.Title>
                                                        </View></TouchableHighlight>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </View>
                                        ))}
                                    </ListItem.Accordion>
                                    {/* console.log(Object.keys(item.Datos_Uro).length) */}
                                </View>
                            )}catch(error){console.log(error)}
                        })
                    }
                    {/* </ScrollView></SafeAreaView> */}
                    </View>)}
            </ScrollView></SafeAreaView>
        );
    };

export default DatosScreen;
export {dataPacCloud, xMind, xMaxd, yMind, yMaxd, nombreGraficas};

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eeee'
    },
    boton: {
        backgroundColor:'midnightblue ',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    texin: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        color: 'white',
        backgroundColor: 'gray'
    },
    tex: {
        fontSize: 18,
        margin: 10,
        color: 'black'
    },tex2: {
        fontSize: 15,
        margin: 5,
        color: 'black'
    }
});