import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface QuantityButtonProps {
  onSelectQuantity: (quantity: string) => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  onSelectQuantity,
}) => {
  const quantities = ["1x", "10x", "25x", "50x", "100x"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleQuantity = () => {
    const nextIndex = (currentIndex + 1) % quantities.length;
    setCurrentIndex(nextIndex);
    onSelectQuantity(quantities[nextIndex]); // Envie a próxima quantidade selecionada de volta para o componente pai
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleQuantity}>
      <Text style={styles.buttonSubText}>Buy</Text>
      <Text style={styles.buttonText}>{quantities[currentIndex]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#FF7F50",
    padding: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 4,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonSubText: {
    color: "#ffffff",
    fontSize: 11,
  },
});

export default QuantityButton;
