import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { inicializarNegocios } from "../datas/businessData";
import BuyBusiness from "../components/BuyBusiness";
import { Business } from "../components/gameComponents/Business";
import CustomHeader from "../components/CustomHeader";
import { usePlayer } from "../components/gameComponents/PlayerContext";

const Home = () => {
  const [selectedQuantity, setSelectedQuantity] = useState("1x");
  const { businessManager, businesses } = inicializarNegocios();
  const { coins, addCoins } = usePlayer();

  useEffect(() => {
    // Carregar os negócios ao montar o componente
    const loadBusinesses = async () => {
      // Lógica para carregar os negócios, se necessário
    };
    loadBusinesses();
  }, []);

  const handleBusinessPress = (business: Business) => {
    console.log(`Negócio ${business.getNome()} pressionado`);
  };

  const handleSelectQuantity = (quantity: string) => {
    setSelectedQuantity(quantity);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/gameImg/background1.jpg")}
          style={styles.image}
        >
          <CustomHeader
            coins={coins}
            profileImage={require("../assets/gameImg/guineaProfile.jpg")}
            onSelectQuantity={handleSelectQuantity}
          />
          <ScrollView>
            {businesses.map((business, index) => (
              <BuyBusiness
                key={index}
                business={business}
                selectedQuantity={selectedQuantity}
                playerCoins={coins}
              />
            ))}
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "100%",
    objectFit: "cover",
  },
});

export default Home;
