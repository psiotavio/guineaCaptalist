import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { usePlayer } from "./Contexts/PlayerContext";
import BusinessManager from "./gameComponents/BusinessManager";
import { Business } from "./gameComponents/Business";
import { BusinessPrestige } from "./gameComponents/BusinessPrestige";
import BusinessManagerPrestige from "./gameComponents/BusinessManagerPrestige";

interface BuyButtonManagerProps {
  image: any;
  coins: number; // Moedas disponíveis do jogador
  itemCost: number; // Função para calcular o custo inicial do item
  additionalText?: string; // Texto adicional opcional para o estilo 2
  business: BusinessPrestige;
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
  coins,
  additionalText,
  itemCost,
  business,
}) => {
  const { removePrestigeCoins } = usePlayer();


  const handlePress = () => {
    BusinessManagerPrestige.setAuto(business.getBusinessAlvo()!);
    console.log(BusinessManager.getNegocio(business.getBusinessAlvo()!.getNome())!.getAutomatic());
    business.setDesbloqueado(true);
    removePrestigeCoins(itemCost);
  };

  const formattedCost = formatNumber(itemCost);


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


  else return coins >= itemCost ? (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={coins < itemCost}
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
    paddingRight: 15,
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
    width: 90,
    height: 90,
   
  },
  button: {
    paddingRight: 15,
    width: "100%",
    backgroundColor: "#FF7F50",
    height: 90,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonDisabled: {
    paddingRight: 15,
    backgroundColor: "#ccc",
    width: "100%",
    height: 90,
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
