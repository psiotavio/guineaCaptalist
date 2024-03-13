import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BuyBusiness from "../components/BuyBusiness";
import CustomHeader from "../components/CustomHeader";
import { usePlayer } from "../components/Contexts/PlayerContext";
import { useSound } from "../components/Contexts/AudioContext"; // Importe useSound
import BusinessManager from "../components/gameComponents/BusinessManager";

const Home = () => {

  const { playSound } = useSound();
  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSoundPlayed(true);
      if (isSoundPlayed) {
        playSound();
        setIsSoundPlayed(false);
      }
    }, 1000); // Atraso de 1 segundo
  
    return () => clearTimeout(timeout); // Limpar o timeout se o componente for desmontado antes do tempo limite
  }, [isSoundPlayed]);

 
  
  

  
  const [selectedQuantity, setSelectedQuantity] = useState("1x");
  const [value, forceUpdate] = useState(0);

  function update() {
    forceUpdate(new Date().getTime());
    updateList(BusinessManager.todosNegocios);
  }

  const [list, updateList] = useState(BusinessManager.todosNegocios);

  useEffect(() => {
    BusinessManager.addListener(update);
    return () => {
      BusinessManager.removeListener(update);
    };
  }, []);

  const { coins, addCoins } = usePlayer();


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
            borderIconColor="#233641"
            coins={coins}
            profileImage={require("../assets/gameImg/guineaProfile.jpg")}
            onSelectQuantity={handleSelectQuantity}
          />
          <ScrollView>
            {list.map((business, index) => (
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
