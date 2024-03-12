import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { usePlayer } from "./Contexts/PlayerContext";
import BusinessManager from "./gameComponents/BusinessManager";
import { Business } from "./gameComponents/Business";

interface BuyButtonManagerProps {
  image: any;
  quantity: string;
  coins: number; // Moedas disponíveis do jogador
  initialItemCost: () => number; // Função para calcular o custo inicial do item
  increaseQuantity: () => void; // Função para aumentar a quantidade de itens
  additionalText?: string; // Texto adicional opcional para o estilo 2
  business: Business;
  style?: number
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

const BuyButtonManager: React.FC<BuyButtonManagerProps> = ({
  style,
  image,
  quantity,
  coins,
  initialItemCost,
  increaseQuantity,
  additionalText,
  business,
}) => {
  const [itemCost, setItemCost] = useState(initialItemCost());
  const { removePrestigeCoins } = usePlayer();

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
    removePrestigeCoins(totalCost);
    increaseQuantity(); 
  };

  const formattedCost = formatNumber(totalCost);


  if (style === 2) {
    return (
      <View
        style={styles.buttonStyle2}
      >
        <Image source={image} style={styles.image} />
        <Text style={styles.buttonText}>{additionalText}</Text>
        <Text style={styles.buttonTextOwned}>{"Owned"}</Text>
      </View>
    );
  }


  else return coins >= totalCost ? (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={coins < totalCost}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.buttonText}>{additionalText}</Text>
      <Text style={styles.buttonText}>({formattedCost})</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.buttonDisabled}>
      <Image source={image} style={styles.image} />
      <Text style={styles.buttonTextDisabled}>{additionalText}</Text>
      <Text style={styles.buttonTextDisabled}>({formattedCost})</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  buttonStyle2:{
    width: "100%",
    padding: 10,
    height: 90,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#2E8B57"
  }, 
  buttonTextOwned:{
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10
  },
  image: {
    objectFit: "contain",
    width: 65,
    height: 65
  },
  button: {
    width: "100%",
    backgroundColor: "#FF7F50",
    padding: 10,
    height: 90,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    width: "100%",
    height: 90,
    padding: 10,
    borderRadius: 5,
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

export default BuyButtonManager;
