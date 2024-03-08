// PlayerContext.tsx

import React, { createContext, useContext, useMemo, useState } from "react";
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
  const [prestigeCoins, setPrestigeCoins] = useState(0);
  const [, forceUpdate] = useState(0);
  const newListener = () => {
    forceUpdate(prev => prev + 1);
  };

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
      console.log("Not enough coins!");
    }
  };

  const prestige = () => {
    const coinsRemaining = coins * 0.1;
    const prestigeCoinsAmount = coins * 0.002;
    
    setCoins(coinsRemaining);
    setPrestigeCoins(prestigeCoins + prestigeCoinsAmount)
  
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
    addCoins,
    removeCoins,
    prestige,
    prestigeCoins,
    addPrestigeCoins,
    removePrestigeCoins,
  };

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
