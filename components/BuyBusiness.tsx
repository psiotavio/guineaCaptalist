import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Business } from "../components/gameComponents/Business";
import StoreItem from "./StoreIcon";
import BuyButton from "./BuyButton";
import ProgressBarComponent from "./ProgressBar";

interface BuyBusinessProps {
  business: Business;
  selectedQuantity: string;
  playerCoins: number;
}

const BuyBusiness: React.FC<BuyBusinessProps> = ({
  business,
  selectedQuantity,
  playerCoins,
}) => {
  const [itemQuantity, setItemQuantity] = useState(business.getQuantidade());
  const [itemLucro, setItemLucro] = useState(business.getLucro());
  const [desbloqueado, setDesbloqueado] = useState(business.getDesbloqueado());

  // Atualiza o estado itemQuantity sempre que business.quantidade for alterado
  useEffect(() => {
    setItemQuantity(business.getQuantidade());
  }, [business.getQuantidade()]);

  // Atualiza o estado itemLucro sempre que business.lucro for alterado
  useEffect(() => {
    setItemLucro(business.getLucro());
  }, [business.getLucro()]);

  // Atualiza o estado desbloqueado sempre que business.desbloqueado for alterado
  useEffect(() => {
    setDesbloqueado(business.getDesbloqueado());
  }, [business.getDesbloqueado()]);

  const increaseQuantity = () => {
    business.setDesbloqueado(true);
    const selectedQuantityNumber = parseInt(selectedQuantity.slice(0, -1)); // Remove o "x" e converte para número
    const newQuantity = itemQuantity + selectedQuantityNumber;
    setItemQuantity(newQuantity); // Atualiza a quantidade local
    business.setQuantidade(newQuantity); // Atualiza a quantidade no objeto Business
    const newLucro = business.getLucro();
    setItemLucro(newLucro);
  };

  return (
    <>
      {business.desbloqueado ? (
        <View style={styles.container}>
          <StoreItem image={business.imagem}></StoreItem>
          <View style={styles.secondSection}>
            <ProgressBarComponent
              business={business}
              lucro={itemLucro}
              duration={business.tempoProducao}
            />
            <View style={styles.thirdSection}>
              <BuyButton
                quantity={selectedQuantity}
                coins={playerCoins}
                initialItemCost={() => business.custo}
                increaseQuantity={increaseQuantity}
                style={1}
                business={business}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.containerBlocked]}>
            <BuyButton
                quantity={selectedQuantity}
                coins={playerCoins}
                initialItemCost={() => business.custo}
                increaseQuantity={increaseQuantity}
                additionalText={business.getNome()}
                style={2}
                business={business}
              />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lockedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    gap: 5,
  },
  containerBlocked: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 5,
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  secondSection: {
    padding: 5,
    gap: 5,
    alignSelf: "center",
    width: "75%",
  },
  thirdSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default BuyBusiness;
