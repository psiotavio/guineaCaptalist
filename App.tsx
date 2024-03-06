import { StyleSheet, Text, View, StatusBar } from 'react-native';
import MyDownTabs from './components/BottomNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PlayerProvider } from './components/gameComponents/PlayerContext';
import { Audio } from 'expo-av';
import { useEffect } from 'react';


export default function App() {
  useEffect(() => {
    let backgroundSound: Audio.Sound | null = null;

    const loadSound = async () => {
      try {
        backgroundSound = new Audio.Sound();
        await backgroundSound.loadAsync(require('./assets/sounds/gameMusic.mp3'));
        await backgroundSound.setIsLoopingAsync(true);
        await backgroundSound.playAsync();
      } catch (error) {
        console.error('Erro ao carregar o som:', error);
      }
    };

    loadSound();

    return () => {
      if (backgroundSound) {
        backgroundSound!.stopAsync().then(() => {
          backgroundSound!.unloadAsync();
          backgroundSound = null;
        }).catch(error => {
          console.error('Erro ao parar o som:', error);
        });
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <PlayerProvider>
          <StatusBar hidden={true} />
          <MyDownTabs />
        </PlayerProvider>
      </View>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
