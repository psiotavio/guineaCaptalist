import React from "react";
import { usePlayer } from "./gameComponents/PlayerContext";
import { TouchableOpacity, View, Text, StyleSheet} from "react-native";

const PrestigeButton: React.FC = () => {
  const { prestige } = usePlayer(); // Obtém a função de prestígio do contexto do jogador

  const handleClick = () => {
    prestige();
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.prestigeButton}>
        <Text style={styles.textButton}>Prestige</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prestigeButton: {
    width: "100%",
    backgroundColor: "#FF7F50",
    padding: 10,
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent:"center",
    flexDirection: "row",
    
  },
  textButton:{
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  }
});

export default PrestigeButton;
