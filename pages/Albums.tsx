import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProgressBarComponent from '../components/ProgressBar';

const Albums = () => {
  const [isProgressBarActive, setIsProgressBarActive] = useState(false); // Estado para rastrear se a barra de progresso está ativa

  const handleProgressBarPress = () => {
    if (!isProgressBarActive) {
      // Inicia a barra de progresso se ela não estiver ativa
      setIsProgressBarActive(true);
    }
  };

  const handleProgressBarCompletion = () => {
    // Reseta a barra de progresso após a conclusão do tempo definido
    setIsProgressBarActive(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'lightblue',
  },
});

export default Albums;
