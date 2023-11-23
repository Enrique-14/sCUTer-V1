import React from "react";
import { View, Text } from "react-native";

const SignupScreen = () => {
    return (
        <View>
            <Text style={{ opacity: 0 }}>SignupScreen Component</Text>
        </View>
    )
}

export const validateSignup = (email, password) => {
  const emailRegex = /^(.+)@(alumnos\.udg\.mx|academicos\.udg\.mx|cutonala\.udg\.mx)$/i;
  const isEmailValid = emailRegex.test(email);

  if (!isEmailValid) {
    return { success: false, message: 'El correo electrónico debe ser válido y pertenecer a la comunidad universitaria.' };
  }

  const isPasswordValid = password.length <= 8 && /^[A-Z]\w*\d/i.test(password);

  if (!isPasswordValid) {
    return { success: false, message: 'La contraseña debe tener máximo 8 dígitos, empezar con una letra mayúscula y contener máximo un número.' };
  }

  return { success: true, message: 'Validación exitosa.' };
};

export default SignupScreen;
