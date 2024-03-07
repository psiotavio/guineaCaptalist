import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

interface StoreItemProps {
  image: any; // Tipo da propriedade de imagem
}

const StoreItem: React.FC<StoreItemProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.border}>
          <Avatar.Image size={80} source={image} style={styles.avatar} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
  },
  avatar: {
    backgroundColor: "lightgray",
    alignItems: "center",
  },
  border: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    width: 95, // Tamanho da borda deve ser ajustado conforme necessário
    height: 95, // Tamanho da borda deve ser ajustado conforme necessário
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "gray", // Cor da borda
    shadowOpacity: 0.5,
    shadowColor:"black",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  
});

export default StoreItem;
