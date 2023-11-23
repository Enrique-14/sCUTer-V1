import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

function IntroScreen() {
  const navigation = useNavigation();

  const handleContinue = () => {

    navigation.navigate('Login');
  };

  const imageUri = Asset.fromModule(require('../asset/images/pexels-photo-825995.png')).uri;

  return (
    <ImageBackground source={{ uri: imageUri }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a la Aplicación de sCUTer</Text>
        <Text style={styles.description}>
          Explora y disfruta de la nueva movilidad dentro de CUTonalá.
        </Text>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>¿Qué es sCUTer?</Text>
          <Text style={styles.aboutInfo}>
            sCUTer es una aplicación que facilita la movilidad dentro del centro universitario
            mediante la renta de scooters eléctricos. Descubre una forma rápida, ecológica y
            divertida de desplazarte.
          </Text>
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={() => handleContinue()}>
          <Text style={styles.buttonText}>Continuar al Inicio de Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 25,
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0', 
    borderRadius: 8,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutInfo: {
    fontSize: 20,
    marginBottom: 10,
  },
  continueButton: {
    margin: 15,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default IntroScreen;
