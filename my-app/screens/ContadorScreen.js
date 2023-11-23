import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

const ContadorScreen = () => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(180);
  const [color, setColor] = useState('green');
  const [expired, setExpired] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);

      if (seconds >= 60) {
        setColor('green');
      } else if (seconds >= 60) {
        setColor('#ffff00');
      } else {
        setColor('red');
      }

      if (seconds === 0) {
        setExpired(true);
        clearInterval(interval);

        Alert.alert(
          '¡Tiempo agotado!',
          'Por favor, toma una foto de donde estás dejando el sCUTer.',
          [
            {
              text: 'OK',
              onPress: async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                if (status === 'granted') {
                  navigation.navigate('Camara', { cameraRef });
                } else {
                  Alert.alert('Permiso denegado', 'No se otorgaron permisos para la cámara.');
                }
              },
            },
          ]
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, navigation]);

  const handleEndJourney = () => {
    Alert.alert(
      '¿Estás seguro de que quieres terminar tu viaje?',
      'Al hacer clic en "OK", tomarás una foto de el lugar donde estás dejando tu sCUTer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
              navigation.navigate('Camara', { cameraRef });
            } else {
              Alert.alert('Permiso denegado', 'No se otorgaron permisos para la cámara.');
            }
          },
        },
      ]
    );
  };

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
          <Text style={styles.instructionsText}>Por favor, deja el sCUTer en un lugar visible.</Text>
        </View>
      ) : (
        <>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          <Button title="¿Quieres terminar tu viaje?" onPress={handleEndJourney} />
        </>
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
    fontSize: 95,
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
