import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSound } from '../components/Contexts/AudioContext'; // Importe useSound

const Notifications = () => {
  const { playSound, stopSound } = useSound(); // Use useSound aqui

  useEffect(() => {
    // Reproduz o som ao entrar na aba de Notificações
    playSound();
  }, []); // Execute somente uma vez, quando o componente é montado

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/gameImg/background3.jpg")}
          style={styles.image}
        >
          <TouchableOpacity style={styles.button} onPress={playSound}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopSound}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
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
