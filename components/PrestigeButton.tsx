import React from "react";
import { usePlayer } from "./gameComponents/PlayerContext";
import { TouchableOpacity, View, Text} from "react-native";

const PrestigeButton: React.FC = () => {
  const { prestige } = usePlayer(); // Obtém a função de prestígio do contexto do jogador

  const handleClick = () => {
    prestige();
  };

  return (
    <TouchableOpacity onPress={handleClick}>
        <Text>Prestige</Text>
    </TouchableOpacity>
  );
};

export default PrestigeButton;
