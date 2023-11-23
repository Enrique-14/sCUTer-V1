import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Camera } from 'expo-camera';
import LoginScreen from './LoginScreen';


const CameraScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
    }
  };

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleGoToLoginScreen = () => {
    // Aquí deberías navegar al LoginScreen o a tu pantalla de comentarios
    navigation.navigate('Login'); // Reemplaza 'LoginScreen' con tu ruta real
  };

  const handleGoToCommentsScreen = () => {
    // Navegar a tu pantalla de comentarios
    navigation.navigate('Comentarios'); // Reemplaza 'CommentsScreen' con tu ruta real
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No tienes permiso para acceder a la cámara</Text>
      </View>
    );
  }

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Gracias por usar sCUTer. ¿Deseas dejar un comentario para mejorar tu experiencia?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleGoToCommentsScreen}>
              <Text style={styles.buttonText}>Sí, dejar comentario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleGoToLoginScreen}>
              <Text style={styles.buttonText}>No, gracias</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Tomar foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const { width } = Dimensions.get('window');
const cameraAspectRatio = 4 / 3;
const cameraHeight = width * cameraAspectRatio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: width,
    height: cameraHeight,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  previewImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default CameraScreen;
