// SoundProvider.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Audio } from 'expo-av';

interface SoundContextProps {
  playSound: () => Promise<void>;
  stopSound: () => Promise<void>;
}

const SoundContext = createContext<SoundContextProps | null>(null);

export const useSound = (): SoundContextProps => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let sound: Audio.Sound | null = new Audio.Sound();

    const loadSound = async () => {
      try {
        await sound!.loadAsync(require('../../assets/sounds/gameMusic.mp3'));
        await sound!.setIsLoopingAsync(true);
      } catch (error) {
        console.error('Erro ao carregar o som:', error);
      }
    };

    loadSound();

    setBackgroundSound(sound);

    return () => {
      if (sound) {
        sound!.unloadAsync().catch(error => {
          console.error('Erro ao parar o som:', error);
        });
      }
    };
  }, []);

  const playSound = async () => {
    if (backgroundSound) {
      await backgroundSound.playAsync().catch(error => {
        console.error('Erro ao reproduzir o som:', error);
      });
    }
  };

  const stopSound = async () => {
    if (backgroundSound) {
      await backgroundSound.stopAsync().catch(error => {
        console.error('Erro ao parar o som:', error);
      });
    }
  };

  const contextValue: SoundContextProps = {
    playSound,
    stopSound
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
