import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CameraExample = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    console.log(`Código QR escaneado: ${data}`);
    navigation.navigate('Contador');
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.camera}
        />
      ) : (
        <Text>No se otorgaron permisos para la cámara</Text>
      )}
      <Text style={styles.scanText}>Escanea el QR de tu sCUTer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  camera: {
    width: '80%',
    aspectRatio: 1,
  },
  scanText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default CameraExample;
