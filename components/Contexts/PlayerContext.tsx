import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BusinessManager from "../gameComponents/BusinessManager";

interface PlayerContextType {
  coins: number;
  prestigeCoins: number;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  addPrestigeCoins: (amount: number) => void;
  removePrestigeCoins: (amount: number) => void;
  prestige: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [prestigeCoins, setPrestigeCoins] = useState(400);

  useEffect(() => {
    const loadData = async () => {
      try {
        const coinsData = await AsyncStorage.getItem("coins");
        const prestigeCoinsData = await AsyncStorage.getItem("prestigeCoins");

        if (coinsData !== null) {
          setCoins(parseInt(coinsData));
        }
        if (prestigeCoinsData !== null) {
          setPrestigeCoins(parseInt(prestigeCoinsData));
        }
      } catch (error) {
        console.error("Error loading player data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("coins", coins.toString());
        await AsyncStorage.setItem("prestigeCoins", prestigeCoins.toString());
      } catch (error) {
        console.error("Error saving player data:", error);
      }
    };

    saveData();
  }, [coins, prestigeCoins]);

  const addCoins = (amount: number) => {
    setCoins((prevCoins) => prevCoins + amount);
  };

  const removeCoins = (amount: number) => {
    if (coins >= amount) {
      setCoins((prevCoins) => prevCoins - amount);
    } else {
      console.log("Not enough coins!");
    }
  };

  const addPrestigeCoins = (amount: number) => {
    setPrestigeCoins((prevCoins) => prevCoins + amount);
  };

  const removePrestigeCoins = (amount: number) => {
    if (prestigeCoins >= amount) {
      setPrestigeCoins((prevCoins) => prevCoins - amount);
    } else {
      console.log("Not enough prestige coins!");
    }
  };

  const prestige = () => {
    const coinsRemaining = coins * 0.1;
    const prestigeCoinsAmount = coins * 0.002;
    
    setCoins(coinsRemaining);
    setPrestigeCoins((prevPrestigeCoins) => prevPrestigeCoins + prestigeCoinsAmount);
  
    // Reiniciar todos os negócios para valores iniciais
    BusinessManager.resetarNegocios()
    
    // Exibir os negócios resetados no console
    console.log("Negócios resetados:");
    BusinessManager.getTodosNegocios(0).forEach((negocio, index) => {
      console.log(`Negócio ${index + 1}:`, negocio);
    });
  
    console.log("Prestige completed!");
  };

  const playerContextValue: PlayerContextType = {
    coins,
    prestigeCoins,
    addCoins,
    removeCoins,
    addPrestigeCoins,
    removePrestigeCoins,
    prestige,
  };

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
