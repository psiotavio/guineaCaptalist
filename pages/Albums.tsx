import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PrestigeButton from "../components/PrestigeButton";
import CustomHeader from "../components/CustomHeader";
import { usePlayer } from "../components/gameComponents/PlayerContext";

const Albums = () => {
  const [isProgressBarActive, setIsProgressBarActive] = useState(false); // Estado para rastrear se a barra de progresso está ativa
  const { coins, addCoins } = usePlayer();

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
        <CustomHeader
          coins={coins}
          profileImage={require("../assets/gameImg/guineaProfile.jpg")}
          onSelectQuantity={() => {}}
        />
        <View style={styles.prestigeButton}>
          <PrestigeButton />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  prestigeButton: {
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    display: "flex",
    flex: 1,
  },
});

export default Albums;
