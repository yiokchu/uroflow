import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert, Image, StyleSheet, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { auth, app } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const hei = Dimensions.get('screen').height;

// const uri = 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg';

export default function SessionScreen({ navigation }) { 

    // const userName = 'Vincent';
    // const passName = 'Barrios';

    // const mojaberLogin = () => {

    //     if(usuario === userName && pass === passName){
    //         console.log('Funciono');
    //         navigation.replace('Main');
    //         ToastAndroid.show('Sesion iniciada con exito', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //     } else {
    //         console.log('Eror');
    //         ToastAndroid.show('Usuario y/o Constrasena incorrectas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    //     }

    // };

    const [usuario, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [vpass, setVpass] = useState(true);

    const singIn = () => {
        signInWithEmailAndPassword(auth, usuario, pass)
        .then ((userCredential) => {
            console.log('Account Created')
            const user = userCredential.user;
            console.log(user)
            navigation.replace('Main');
            ToastAndroid.show('Sesion iniciada con exito', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }).catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    }
    
    return(
        <View style={styles.cont}><LinearGradient
            // Background Linear Gradient
            colors={['#B4A7F6', '#09184D']}
            style={styles.background}
        />
            {/* <Image source={{uri}} style={[styles.bicho,StyleSheet.absoluteFill]}/> */}
            <View style={styles.login}><Ionicons style={{marginTop: -40}} name={"people-outline"} size={hei*0.15} color={'white'}/>
                <Text style={{fontSize: 30, color: "white", paddingBottom: 20,}}>Login</Text>
                <TextInput
                    style={styles.texin}
                    placeholder="Usuario"
                    onChangeText={T => setUser(T)}
                    value={usuario}/>
                <View style={[styles.texin, {marginBottom: 30}]}><TextInput
                    style={{width: 260, color: '#09184D'}}
                    placeholder="Contrasena"
                    onChangeText={Te => setPass(Te)}
                    value={pass}
                    secureTextEntry={vpass}/><Ionicons style={{}} name={vpass? "eye-off-outline":"eye-outline"} size={20} color={'#B4A7F6'} onPress={() => {setVpass(!vpass)}}/></View>
                {/* <Text style={styles.tex}> Tu texto es: {pass}</Text> */}
                {/* <TouchableOpacity style= {{backgroundColor:'cyan', padding: 10, marginBottom: 20, borderRadius: 10}} title='Iniciar' onPress={mojaberLogin}> */}
                {/* <TouchableOpacity style='auto' title='Iniciar' onPress={mojaberLogin(usuario, pass)}>
                invoca la función mojaberLogin inmediatamente cuando se renderiza el componente, en lugar de esperar a que se presione el botón */}
                    {/* <Text style={{color: 'white', fontWeight: 'bold',}}>Iniciar Sesion</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {{backgroundColor:'cyan', padding: 10, marginBottom: 20, borderRadius: 10}} title='Iniciar'>
                    <Text style={{color: 'white', fontWeight: 'bold',}}>Crear Account</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style= {styles.button} title='Iniciar' onPress={singIn}>
                    <Text style={styles.buttonText}>Iniciar Sesion</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.button2} title='Ir a Crear' onPress={() => navigation.replace('Account')}>
                    <Text style={styles.buttonText2}>Ir a Crear Cuenta</Text>
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
        width: 200,
        height: 50,
        backgroundColor: "#B4A7F6",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    button2: {
        width: 200,
        height: 50,
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "#B4A7F6",
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
        color: '#09184D',
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row'
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
        height: hei*0.65,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5F60A2',
        borderRadius: 20,
    }
});