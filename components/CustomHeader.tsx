import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import QuantityButton from "./QuantityButton";

const separateNumberAndDefinition = (value: number): [string, string] => {
  if (value >= 1000000000000000) {
    const formattedValue = (value / 1000000000000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return [formattedValue, "Quadrillion"];
  } else if (value >= 1000000000000) {
    const formattedValue = (value / 1000000000000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return [formattedValue, "Trillion"];
  } else if (value >= 1000000000) {
    const formattedValue = (value / 1000000000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return [formattedValue, "Billion"];
  } else if (value >= 10000000) {
    const formattedValue = (value / 1000000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return [formattedValue, "Million"];
  } else {
    const formattedValue = value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return [formattedValue, ""];
  }
};

interface HeaderProps {
  borderIconColor: string;
  profileImage: any;
  coins: number;
  onSelectQuantity: (quantity: string) => void;
}


const CustomHeader: React.FC<HeaderProps> = ({
  profileImage,
  coins,
  onSelectQuantity,
  borderIconColor,
}) => {
  const handleSelectQuantity = (quantity: string) => {
    onSelectQuantity(quantity);
  };

  const [formattedValue, definition] = separateNumberAndDefinition(coins);

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        <View style={styles.profileImageShadow}>
          <Image source={profileImage} style={[styles.profileImage, {borderColor: borderIconColor}]} />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.valueText}>${formattedValue}</Text>
          <Text style={styles.wordText}>{definition}</Text>
        </View>
      </View>
      <QuantityButton onSelectQuantity={onSelectQuantity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 70,
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0, 0.25)",
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 15,
    marginRight: 12,
    borderWidth: 4,
  },
  profileImageShadow: {
    width: 85,
    height: 85,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
  },
  valueText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  wordText: {
    color: "white",
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  priceContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  player: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default CustomHeader;
