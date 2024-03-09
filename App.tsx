import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MyDownTabs from './components/BottomNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PlayerProvider } from './components/Contexts/PlayerContext';
import { SoundProvider } from './components/Contexts/AudioContext';
import LoadingScreen from './components/Loading';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 7000); // Defina o tempo de 7 segundos para a tela de loading
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <PlayerProvider>
            <SoundProvider>
              <StatusBar hidden={true} />
              <MyDownTabs />
            </SoundProvider>
          </PlayerProvider>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
