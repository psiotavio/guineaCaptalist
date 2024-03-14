import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { usePlayer } from "./Contexts/PlayerContext";
import BusinessManager from "./gameComponents/BusinessManager";
import { Business } from "./gameComponents/Business";

interface BuyButtonProps {
  quantity: string;
  coins: number; // Moedas disponíveis do jogador
  initialItemCost: () => number; // Função para calcular o custo inicial do item
  increaseQuantity: () => void; // Função para aumentar a quantidade de itens
  style: number; // Adiciona a propriedade de estilo
  additionalText?: string; // Texto adicional opcional para o estilo 2
  business: Business;
}

const formatNumber = (value: number): string => {
  if (value >= 1000000000000000) {
    return `${(value / 1000000000000000).toFixed(2)} quadrillion`;
  } else if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(2)} trillion`;
  } else if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)} billion`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)} million`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} thousand`;
  } else {
    return `${value.toFixed(2)} $`;
  }
};

const BuyButton: React.FC<BuyButtonProps> = ({
  quantity,
  coins,
  initialItemCost,
  increaseQuantity,
  style,
  additionalText,
  business,
}) => {
  const [itemCost, setItemCost] = useState(initialItemCost());
  const { removeCoins } = usePlayer();

  useEffect(() => {
    // Atualiza o custo do item sempre que os valores dos negócios mudarem
    setItemCost(initialItemCost());
  }, [business]);

  const calculateTotalCost = (
    quantity: string
  ): { totalCost: number; numItems: number } => {
    let numItems = parseInt(quantity, 10);
    // Calcula o custo total com base na quantidade de itens
    let totalCost = numItems * itemCost;
    return { totalCost, numItems };
  };

  const { totalCost, numItems } = calculateTotalCost(quantity);

  const handlePress = () => {
    removeCoins(totalCost);
    setItemCost(totalCost * 1.3);
    BusinessManager.setCoin(totalCost, business.getNome());
    BusinessManager.salvarNegocios();
    increaseQuantity(); // Aumenta a quantidade de itens
  };

  const formattedCost = formatNumber(totalCost);

  return coins >= totalCost ? (
    <TouchableOpacity
      style={style === 1 ? styles.button : styles.buttonLarge}
      onPress={() => {
        handlePress();
        BusinessManager.salvarNegocios();
      }}
    >
      <Text style={styles.buttonText}>{numItems}x</Text>
      {style === 2 && (
        <Text style={styles.buttonTextLarge}>{additionalText}</Text>
      )}
      <Text style={styles.buttonText}>({formattedCost})</Text>
    </TouchableOpacity>
  ) : (
    <View
      style={style === 1 ? styles.buttonDisabled : styles.buttonDisabledLarge}
    >
      <Text style={styles.buttonTextDisabled}>{numItems}x</Text>
      {style === 2 && (
        <Text style={styles.buttonTextLargeDisabled}>{additionalText}</Text>
      )}
      <Text style={styles.buttonTextDisabled}>({formattedCost})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#FF7F50",
    padding: 10,
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    width: "100%",
    height: 45,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonTextLarge: {
    left: "40%",
    display: "flex",
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  buttonTextLargeDisabled: {
    left: "40%",
    display: "flex",
    fontSize: 22,
    fontWeight: "bold",
    color: "#888",
  },
  buttonLarge: {
    width: "100%",
    backgroundColor: "#FF7F50",
    height: 80,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonDisabledLarge: {
    backgroundColor: "#ccc",
    width: "100%",
    height: 80,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: "#888",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BuyButton;
