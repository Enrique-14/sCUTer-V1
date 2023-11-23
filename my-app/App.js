import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




import WelcomeScreen from './screens/WelcomeScreen';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen';
import RecuperacionScreen from './screens/RecuperacionScreen';
import RegistroScreen from './screens/RegistroScreen';
import HomeScreen from './screens/HomeScreen'
import ContadorScreen from './screens/ContadorScreen';
import CamaraScreen from './screens/CamaraScreen';
import ComentariosScreen from './screens/ComentariosScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Contador' component={ContadorScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Recuperacion" component={RecuperacionScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Camara" component={CamaraScreen} />
        <Stack.Screen name='Comentarios' component={ComentariosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
