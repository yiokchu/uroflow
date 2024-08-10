import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert, Image, StyleSheet, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { auth, app } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const uri = 'https://www.laprensa.hn/binrepository/715x900/0c0/0d0/none/11004/QPYV/cristiano-ronaldo-vs-liechtenstein03_4076180_20230323155707.jpg';

const hei = Dimensions.get('screen').height;

export default function AccountsScreen({ navigation }) { 

    const [usuario, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setName] = useState('');
    const [lastname, setLast] = useState('');

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, usuario, pass)
        .then ((userCredential) => {
            console.log('Sesion suseful')
            const user = userCredential.user;
            storeUser(usuario,firstname,lastname);
            console.log(user)
            navigation.replace('Main');
            ToastAndroid.show('Sesion Creada con exito', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }).catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    }

    function storeUser(userEmail,firstname,lastname){
        const uids = auth.currentUser.uid;
        console.log(uids);
        const db = getDatabase();
        const reference = ref(db, 'users/' + uids + '/Datos_Personales/');
        set (reference, {Email: userEmail, 
            Nombre: firstname,
            Apellido: lastname,
            Creado: new Date().toString()});
        const referenceP = ref(db, 'users/' + uids + '/Pacientes/');
        set (referenceP, {'---': false});
    }

    return(
        <View style={styles.cont}><LinearGradient
            // Background Linear Gradient
            colors={['#09184D', '#30638E']}
            style={styles.background}
        />
            {/* <Image source={{uri}} style={[styles.bicho,StyleSheet.absoluteFill]}/> */}
            <View style={styles.login}><Ionicons style={{marginTop: -0}} name={"mail-outline"} size={hei*0.10} color={'white'}/>
            <Text style={{fontSize: 30, color: "white", paddingBottom: 20,}}>Cree una Cuenta</Text>
                <TextInput
                    style={styles.texin}
                    placeholder="Usuario"
                    onChangeText={T => setUser(T)}
                    value={usuario}/>
                <TextInput
                    style={styles.texin}
                    placeholder="Contraseña"
                    onChangeText={Te => setPass(Te)}
                    value={pass}
                    secureTextEntry/>
                <TextInput
                    style={styles.texin}
                    placeholder="Nombre"
                    onChangeText={T => setName(T)}
                    value={firstname}/>
                <TextInput
                    style={[styles.texin, {marginBottom: 30}]}
                    placeholder="Apellido"
                    onChangeText={Te => setLast(Te)}
                    value={lastname}/>
                {/* <Text style={styles.tex}> Tu texto es: {pass}</Text> */}
                <TouchableOpacity style= {styles.button} title='Crear Cuenta' onPress={createAccount}>
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.button2} title='Volver' onPress={() => navigation.replace('Session')}>
                    <Text style={styles.buttonText2}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: hei,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    },
    buttonText2: {
        color: "white",
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: "#30638E",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    button2: {
        width: 150,
        height: 50,
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "#30638E",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    boton: {
        backgroundColor:'midnightblue ',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    texin: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    bicho: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    tex: {
        fontSize: 18,
        margin: 10,
        color: 'white'
    },
    login: {
        width: 350,
        height: hei*0.7,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1D3E6E',
        borderRadius: 20,
    }
});