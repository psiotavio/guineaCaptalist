import React, { createContext, useContext, useState } from "react";
import { BusinessManager } from "./BusinessManager";

interface PlayerContextType {
  coins: number;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  prestige: () => void; // Adicionamos a função de prestígio
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
  const [coins, setCoins] = useState(0); // Estado para armazenar a quantidade de moedas
  const [businessManager] = useState(new BusinessManager()); // Gerenciador de negócios

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

  const prestige = () => {
    // Salvar progresso parcial
    const coinsSpent = coins * 0.2; // 20% das moedas gastas
    const coinsRemaining = coins * 0.1; // 10% das moedas restantes

    // Reiniciar todas as moedas
    setCoins(coinsRemaining);

    // Reiniciar todos os negócios para valores iniciais
    // (Você precisa implementar essa lógica no BusinessManager)

    console.log("Prestige completed!");

    // Outras ações de prestígio, se houver

  };

  const playerContextValue: PlayerContextType = {
    coins,
    addCoins,
    removeCoins,
    prestige,
  };

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
