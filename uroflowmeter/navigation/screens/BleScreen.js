import { BleManager } from 'react-native-ble-plx';
import RNFS from 'react-native-fs';

// Crear una instancia del gestor de bluetooth
const manager = new BleManager();

// Escanear los dispositivos bluetooth disponibles
manager.startDeviceScan(null, null, (error, device) => {
if (error) {
    // Manejar el error
    return;
}

// Buscar el dispositivo con el nombre del esp32
if (device.name === 'ESP32') {
    // Detener el escaneo
    manager.stopDeviceScan();

    // Conectar al dispositivo
    device.connect()
    .then((device) => {
        // Descubrir los servicios y características del dispositivo
        return device.discoverAllServicesAndCharacteristics();
    })
    .then((device) => {
        // Obtener el servicio y la característica del protocolo RFCOMM
        return device.writeCharacteristicWithResponseForService(
        '0000dfb0-0000-1000-8000-00805f9b34fb', // UUID del servicio
        '0000dfb1-0000-1000-8000-00805f9b34fb', // UUID de la característica
        '01' // Comando para iniciar la transferencia del archivo
        );
    })
    .then((characteristic) => {
        // Leer los datos que llegan al dispositivo bluetooth
        return manager.readCharacteristicForDevice(
        device.id, // ID del dispositivo
        '0000dfb0-0000-1000-8000-00805f9b34fb', // UUID del servicio
        '0000dfb1-0000-1000-8000-00805f9b34fb' // UUID de la característica
        );
    })
    .then((characteristic) => {
        // Obtener el valor de los datos en formato binario
        const data = characteristic.value;

        // Guardar el archivo en el almacenamiento del dispositivo
        RNFS.writeFile(
        RNFS.DocumentDirectoryPath + '/archivo.bin', // Ruta del archivo
        data, // Datos del archivo
        'base64' // Codificación de los datos
        )
        .then(() => {
            // Mostrar un mensaje de éxito
            console.log('Archivo guardado');
        })
        .catch((err) => {
            // Manejar el error
            console.log(err.message);
        });
    })
    .catch((error) => {
        // Manejar el error
        console.log(error.message);
    });
}
});