// PlayerContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Business } from "./Business";
import { BusinessManager } from "./BusinessManager";
import { inicializarNegocios } from "../../datas/businessData";

interface PlayerContextType {
  coins: number;
  prestige: number;
  negocios: Business[];
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  increasePrestige: () => void;
  resetPlayer: () => void; // Função para resetar o jogador
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
  const [prestige, setPrestige] = useState(0);
  const [negocios, setNegocios] = useState<Business[]>([]); // Adicione um estado para armazenar os negócios

  const { businessManager, businesses } = inicializarNegocios(); // Inicializa os negócios

  const resetPlayer = () => {
    // Redefinir moedas para 0
    setCoins(0);
    // Redefinir a quantidade de negócios para 0
    businessManager.resetarNegocios(); // Adicione uma função resetarNegocios ao BusinessManager
  
    // Atualiza os negócios no contexto do jogador
    const newBusinesses = businessManager.getTodosNegocios(0); // Obtém os negócios resetados
    setNegocios(newBusinesses);
  };
  
  const playerContextValue: PlayerContextType = {
    coins,
    prestige,
    negocios, // Use o estado atualizado para os negócios
    resetPlayer: resetPlayer, // Adiciona a função resetPlayer ao contexto do jogador
    addCoins: (amount: number) => {
      setCoins((prevCoins) => prevCoins + amount);
    },
    removeCoins: (amount: number) => {
      if (coins >= amount) {
        setCoins((prevCoins) => prevCoins - amount);
      } else {
        console.log("Not enough coins!");
      }
    },
    increasePrestige: () => {
      resetPlayer(); // Resetar o jogador antes de incrementar o prestígio
      setPrestige((prevPrestige) => prevPrestige + 1);
    },
  };

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
