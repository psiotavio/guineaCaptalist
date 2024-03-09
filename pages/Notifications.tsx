import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSound } from '../components/Contexts/AudioContext'; // Importe useSound
import SoundButton from '../components/SountButton';

const Notifications = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/gameImg/background3.jpg")}
          style={styles.image}
        >
         <SoundButton />
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#002B1E"
  },
  image: {
    height: "100%",
    objectFit: "cover",
    alignItems: 'center', // Centraliza os botões na tela
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notifications;
