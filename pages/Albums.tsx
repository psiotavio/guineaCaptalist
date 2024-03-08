import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PrestigeButton from "../components/PrestigeButton";
import CustomHeader from "../components/CustomHeader";
import { usePlayer } from "../components/gameComponents/PlayerContext";

const Albums = () => {
  const [isProgressBarActive, setIsProgressBarActive] = useState(false); // Estado para rastrear se a barra de progresso está ativa
  const { prestigeCoins, addPrestigeCoins } = usePlayer();

  const handleProgressBarPress = () => {
    if (!isProgressBarActive) {
      // Inicia a barra de progresso se ela não estiver ativa
      setIsProgressBarActive(true);
    }
  };

  const handleProgressBarCompletion = () => {
    // Reseta a barra de progresso após a conclusão do tempo definido
    setIsProgressBarActive(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
      <ImageBackground
          source={require("../assets/gameImg/background2.jpg")}
          style={styles.image}
        >
        <CustomHeader
          coins={prestigeCoins}
          profileImage={require("../assets/gameImg/guineaProfilePrestige.jpg")}
          onSelectQuantity={() => {}}
          borderIconColor="#7D2929"
        />
        <View style={styles.prestigeButton}>
          <PrestigeButton />
        </View>
      </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D2929",
  },
  prestigeButton: {
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    display: "flex",
    flex: 1,
  },
  image: {
    height: "100%",
    objectFit: "cover",
  },
});

export default Albums;
