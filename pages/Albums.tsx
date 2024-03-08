import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PrestigeButton from "../components/PrestigeButton";
import CustomHeader from "../components/CustomHeader";
import { usePlayer } from "../components/Contexts/PlayerContext";
import BusinessManagerPrestige from "../components/gameComponents/BusinessManagerPrestige";
import BuyBusiness from "../components/BuyBusiness";

const Albums = () => {
  const [selectedQuantity, setSelectedQuantity] = useState("1x");
  const [value, forceUpdate] = useState(0);

  const [isProgressBarActive, setIsProgressBarActive] = useState(false); // Estado para rastrear se a barra de progresso está ativa
  const { prestigeCoins, addPrestigeCoins } = usePlayer();



  function update() {
    console.log(`update`);
    forceUpdate(new Date().getTime());
    updateList(BusinessManagerPrestige.getTodosOsNegociosPrestige());
  }

  const [list, updateList] = useState(BusinessManagerPrestige.getTodosOsNegociosPrestige());

  useEffect(() => {
    BusinessManagerPrestige.addListener(update);
    return () => {
      BusinessManagerPrestige.removeListener(update);
    };
  }, []);


  const handleSelectQuantity = (quantity: string) => {
    setSelectedQuantity(quantity);
  };


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
          onSelectQuantity={handleSelectQuantity}
          borderIconColor="#7D2929"
        />
        <ScrollView>
            {list.map((business, index) => (
              <BuyBusiness
                key={index}
                business={business}
                selectedQuantity={selectedQuantity}
                playerCoins={prestigeCoins}
              />
            ))}
          </ScrollView>
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
