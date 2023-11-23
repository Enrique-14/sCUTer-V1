import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Asset } from 'expo-asset';
import SignupScreen from './SignupScreen';
import { validateSignup } from './SignupScreen';
import RecuperacionScreen from './RecuperacionScreen';
import { useNavigation } from '@react-navigation/native';
import RegistroScreen from './RegistroScreen';




function LoginScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleSignup = () => {
    const validationResult = validateSignup(email, password);

    if (!validationResult.success) {
        alert(validationResult.message);
        return;
    }
    console.log('Inicio de sesión exitoso:', email);
    toggleModal();
    setTimeout(() => {
      navigation.navigate('Home');
      
    }, 1000);

  };
  const handleForgotPassword = () => {
    console.log ('olvidaste tu contraseña');
    navigation.navigate('Recuperacion');
  };
  const handleRegistro = () => {
    navigation.navigate('Registro');
  };

  // imagen de fondo
  const imageUri = Asset.fromModule(require('../asset/images/pexels-photo-825995.png')).uri;

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={{ uri: imageUri }} />

{/* Login */}
<View style={styles.loginContainer}>
<Text style={styles.loginText}>Iniciar Sesión</Text>
  <TextInput
    style={styles.input}
    placeholder="Usuario"
    onChangeText={(text) => setEmail(text)}
  />
  <TextInput
    style={styles.input}
    placeholder="Contraseña"
    secureTextEntry={true}
    onChangeText={(text) => setPassword(text)}
  />
  <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
    <Text style={styles.buttonText}>Ingresar</Text>
  </TouchableOpacity>
  <View style={styles.additionalOptions}>
    <TouchableOpacity onPress={handleForgotPassword}>
      <Text style={styles.additionalOptionsText}>¿Olvidaste la contraseña?</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleRegistro}>
      <Text style={styles.additionalOptionsText}>Regístrate</Text>
    </TouchableOpacity>
  </View>
</View>

{/* Modal */}
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      toggleModal();
    }}
  >
<View style={styles.centeredView}>
  <View style={styles.modalView}>
        <Text style={styles.modalText}>Tu sCUTer ¡Cuídalo!</Text>
    <TouchableOpacity
        style={{ ...styles.loginButton, backgroundColor: 'blue' }} onPress={toggleModal}>
        <Text style={styles.buttonText}>Bienvenido</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Estilos del modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  additionalOptions: {
    color: 'white',
    flexDirection: '',
    justifyContent: 'flex-end',
    marginTop: 1,
    opacity: 0.9,
  },
  additionalOptionsText: {
    color: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  
});

export default LoginScreen;
