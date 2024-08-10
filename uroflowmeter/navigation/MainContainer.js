import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
import SessionScreen from './screens/SessionScreen';
import WifiScreen from './screens/Wifi';
import DatosScreen from './screens/DatosScreen';
import AccountsScreen from './screens/CreateAcScreen';

//Screen names
const homeName = 'Home';
const detailsName = 'Details';
const settingsName = 'Settings';
const sessionName = 'Session';
const accountName = 'Account';
const wifiName = 'Wifi';
const datosName = 'Cloud';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

var hei = Dimensions.get('window').height;
    // console.log(hei);

function HomeTabs() { //lo puse en otra funcion para que este mas organizado y porque es lo recomendado
    return (
        <Tab.Navigator
        // sceneContainerStyle={{paddingBottom: 128}}
        initialRouteName={homeName}
        screenOptions={({route}) => ({
            "headerStyle": {backgroundColor: '#DFE0F9'},
            "headerTintColor": '#09184D',
            "headerTitleStyle": {fontWeight: 'bold'},
            "tabBarInactiveBackgroundColor": '#09184D',
            "tabBarActiveBackgroundColor": '#09184D',
            "tabBarActiveTintColor": '#B4A7F6',
            "tabBarInactiveTintColor": 'lightgrey',
            "tabBarLabelStyle": {
                fontSize: 10,
            },
            "tabBarStyle": {
                backgroundColor: '#09184D',
                paddingBottom: 10,
                height: hei*0.08,
            },
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (rn === detailsName) {
                    iconName = focused ? 'analytics' : 'analytics-outline';
                } else if (rn === settingsName) {
                    iconName = focused ? 'settings' : 'settings-outline';
                } else if (rn === wifiName) {
                    iconName = focused ? 'wifi' : 'wifi-outline';
                } else if (rn === datosName) {
                    iconName = focused ? 'cloud' : 'cloud-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>

            },
        })}
        // tabBarOptions={{
        //     activeTintColor:'tomato',
        //     inactiveTintColor: 'grey',
        //     labelStyle: { paddingBottom: 10, fontSize: 10 },
        //     style: {padding: 10, height: 70}
        // }}
        // Lo comente porque decia que ponerlo de esta manera no era recomendado, que usara lo de arriba ""tabBarActiveTintColor": 'tomato',"
        >

        <Tab.Screen name={homeName} component={HomeScreen}/>
        <Tab.Screen name={detailsName} component={DetailsScreen}/>
        <Tab.Screen name={datosName} component={DatosScreen}/>
        <Tab.Screen name={wifiName} component={WifiScreen}/>
        <Tab.Screen name={settingsName} component={SettingsScreen}/>
        </Tab.Navigator>
    );
}

export default function MainContainer() {
    return (
        <NavigationContainer> 
            {/* pone las pantallas una sobre la otra siendo Session la principal, despues que el boton sea presionado en session lo lleva a Main
            (le puse ese nombre porque ya en la otra funcion se llama Home y no es bueno ponerle el mismo nombre a las cosas) */}
            <Stack.Navigator
                initialRouteName={sessionName}>
                <Stack.Screen 
                    name={sessionName} 
                    component={SessionScreen} 
                    options={{
                        headerShown: false,
                    }}/>
                <Stack.Screen
                    name={accountName} 
                    component={AccountsScreen} 
                    options={{
                        headerShown: false,
                    }}/>
                <Stack.Screen
                    name="Main"
                    component={HomeTabs} 
                    options={{
                        headerShown: false,
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}