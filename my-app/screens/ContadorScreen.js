import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

const ContadorScreen = () => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(600); // Inicializar el contador en 10 minutos
  const [color, setColor] = useState('green'); // Color inicial
  const [expired, setExpired] = useState(false); // Estado para el mensaje de tiempo agotado
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);

      // Cambiar el color según el rango de tiempo
      if (seconds >= 240) {
        setColor('green'); // Verde para 10 a 4 minutos
      } else if (seconds >= 130) {
        setColor('#ffff00'); // Amarillo para 3 a 2 minutos
      } else {
        setColor('red'); // Rojo para 1 a 0 minutos
      }

      // Mostrar el mensaje de tiempo agotado
      if (seconds === 0) {
        setExpired(true);
        clearInterval(interval);

        // Alerta de tiempo agotado
        Alert.alert(  
          '¡Tiempo agotado!',
          'Por favor, toma una foto de donde estás dejando el scooter.',
          [
            {
              text: 'OK',
              onPress: async () => {
                // permisos camara
                const { status } = await Camera.requestCameraPermissionsAsync();
                if (status === 'granted') {
                  navigation.navigate('CameraScreen');
                } else {
                  Alert.alert('Permiso denegado', 'No se otorgaron permisos para la cámara.');
                }
              },
            },
          ]
        );
      }
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [seconds, navigation]);

  // Segundero
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      {expired ? (
        <View style={styles.expiredContainer}>
          <Text style={styles.expiredText}>¡Tiempo agotado!</Text>
          <Text style={styles.instructionsText}>Por favor, deja el scooter en un lugar visible.</Text>
        </View>
      ) : (
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 36,
    color: 'white',
  },
  expiredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  expiredText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  instructionsText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ContadorScreen;
