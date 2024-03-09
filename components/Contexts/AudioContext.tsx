// AudioContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Audio } from 'expo-av';

interface SoundContextProps {
  playSound: () => Promise<void>;
  stopSound: () => Promise<void>;
  isSoundPlaying: boolean;
  setVolume: (volume: number) => Promise<void>;
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
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    let sound: Audio.Sound | null = new Audio.Sound();

    const loadSound = async () => {
      try {
        await sound!.loadAsync(require('../../assets/sounds/gameMusic.mp3'));
        await sound!.setIsLoopingAsync(true);
        await sound!.setVolumeAsync(volume); // Definindo o volume inicial
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
      setIsSoundPlaying(true);
    }
  };

  const stopSound = async () => {
    if (backgroundSound) {
      await backgroundSound.stopAsync().catch(error => {
        console.error('Erro ao parar o som:', error);
      });
      setIsSoundPlaying(false);
    }
  };

  const updateVolume = async (volume: number) => {
    if (backgroundSound) {
      await backgroundSound.setVolumeAsync(volume).catch(error => {
        console.error('Erro ao definir o volume:', error);
      });
      setVolume(volume);
    }
  };

  const contextValue: SoundContextProps = {
    playSound,
    stopSound,
    isSoundPlaying,
    setVolume: updateVolume,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
