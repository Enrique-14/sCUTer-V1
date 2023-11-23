import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function RecuperacionScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleRecuperacion = () => {
    console.log('Olvidaste contraseña');

    // Muestra el mensaje al usuario
    setShowMessage(true);

    // Simulando el envío del correo
    setTimeout(() => {
      setShowMessage(false);

      // Muestra la alerta con el correo
      Alert.alert('Correo de recuperación enviado', `Se ha enviado un correo de recuperación a: ${email}`, [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    }, 3000); // Ocultar el mensaje después de 3 segundos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.recoverButton} onPress={handleRecuperacion}>
        <Text style={styles.buttonText}>Recuperar Contraseña</Text>
      </TouchableOpacity>

      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Enviando correo de recuperación...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  recoverButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 22,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RecuperacionScreen;
