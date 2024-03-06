import React from "react";
import { usePlayer } from "./gameComponents/PlayerContext";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const PrestigeButton: React.FC = () => {
  const { increasePrestige } = usePlayer();

  const handlePrestigeClick = () => {
    increasePrestige();
  };

  return (
    <TouchableOpacity onPress={handlePrestigeClick} style={styles.container}>
      <Text>Fazer Prestígio</Text>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({ 
    container: {
        width: 100,
        height:50,
        backgroundColor:"purple",
        borderRadius: 5,
    } 
});

export default PrestigeButton;
