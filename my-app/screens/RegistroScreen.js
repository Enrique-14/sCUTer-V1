import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistro = () => {
    //lógica para la validación del correo electrónico
    const emailRegex = /^(.+)@(alumnos\.udg\.mx|docentes\.udg\.mx|cutonala\.udg\.mx)$/i;
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) {
      alert('Por favor, utiliza un correo válido de la red universitaria.');
      return;
    }

    //lógica para la validación de la contraseña
    const isPasswordValid = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,7}$/i.test(password);

    if (!isPasswordValid) {
      alert('La contraseña debe tener menos de 8 caracteres, al menos una letra mayúscula y máximo un número.');
      return;
    }

    // Verificación si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Registrando usuario:', {
      nombre,
      apellidos,
      email,
    });

    // Muestra mensaje de bienvenida en la consola y al usuario
    console.log('Usuario nuevo, ', nombre, '!');

    Alert.alert('Registro exitoso', `¡Bienvenido a sCUTer, ${nombre}!` , [
      {
        text: 'OK',
        onPress: () => {

          navigation.navigate('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        onChangeText={(text) => setApellidos(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.registroButton} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  registroButton: {
    backgroundColor: 'green', 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegistroScreen;

