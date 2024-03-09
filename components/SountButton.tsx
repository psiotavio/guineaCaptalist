import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones desejados
import { useSound } from '../components/Contexts/AudioContext';

const SoundButton = () => {
  const { setVolume } = useSound(); // Use setVolume para controlar o volume
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const newVolume = isMuted ? 1.0 : 0.0; // Se estiver mudo, definir o volume para 100%; caso contrário, definir para 0%
    setVolume(newVolume); // Define o volume
    setIsMuted(!isMuted); // Inverte o estado de som mudo
  };

  return (
    <TouchableOpacity style={isMuted? styles.buttonMutted : styles.button} onPress={toggleSound}>
      <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={34} color={ isMuted? "lightgray" : "white"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Alinha o ícone e o texto horizontalmente
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 15,
    borderRadius: 10,
  },
  buttonMutted: {
    flexDirection: 'row', // Alinha o ícone e o texto horizontalmente
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    backgroundColor: '#787878',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 15,
    borderRadius: 10,
  },
});

export default SoundButton;
