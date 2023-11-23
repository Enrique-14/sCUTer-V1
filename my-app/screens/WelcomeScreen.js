// WelcomeScreen.js

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Intro');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={require('../asset/images/logoscuter.png.png')} 
        style={styles.logo}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
  },
  logo: {
    width: 200, 
    height: 200,
  },
});

export default WelcomeScreen;
