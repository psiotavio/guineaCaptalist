import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Business } from "../components/gameComponents/Business";
import StoreItem from "./StoreIcon";
import BuyButtonManager from "./BuyButtonManager";

interface BuyBusinessPrestigeProps {
  business: Business;
  selectedQuantity: string;
  playerPrestigeCoins: number;
}

const BuyBusinessPrestige: React.FC<BuyBusinessPrestigeProps> = ({
  business,
  selectedQuantity,
  playerPrestigeCoins,
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
          <View style={styles.buyManager}>
            <BuyButtonManager
              image={business.imagem}
              quantity={selectedQuantity}
              coins={playerPrestigeCoins}
              initialItemCost={() => business.custo}
              additionalText={business.getNome()}
              style={2}
              increaseQuantity={increaseQuantity}
              business={business}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.buyManager}>
            <BuyButtonManager
              image={business.imagem}
              quantity={selectedQuantity}
              coins={playerPrestigeCoins}
              initialItemCost={() => business.custo}
              increaseQuantity={increaseQuantity}
              additionalText={business.getNome()}
              business={business}
            />
          </View>
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
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    gap: 5,
    marginTop: 10,
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
  buyManager: {
    display: "flex",
    alignItems: "center",
  },
});

export default BuyBusinessPrestige;
