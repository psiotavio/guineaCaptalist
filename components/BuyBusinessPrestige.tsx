import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { BusinessPrestige } from "./gameComponents/BusinessPrestige";
import BuyButtonManager from "./BuyButtonManager";

interface BuyBusinessPrestigeProps {
  business: BusinessPrestige;
  playerPrestigeCoins: number;
}

const BuyBusinessPrestige: React.FC<BuyBusinessPrestigeProps> = ({
  business,
  playerPrestigeCoins,
}) => {
  const [desbloqueado, setDesbloqueado] = useState(business.getDesbloqueado());

  // Atualiza o estado desbloqueado sempre que business.desbloqueado for alterado
  useEffect(() => {
    setDesbloqueado(business.getDesbloqueado());
  }, [business.getDesbloqueado()]);

  // Verifica se o negócio está desbloqueado e define o negócio associado como automático
  useEffect(() => {
    if (desbloqueado) {
       business.setBusinessAlvoAuto();
    }
  }, [desbloqueado, business]);

  return (
    <View style={styles.container}>
      <View style={styles.buyManager}>
        <BuyButtonManager
          image={business.imagem}
          coins={playerPrestigeCoins}
          itemCost={business.getValor()}
          additionalText={business.getNome()}
          style={desbloqueado ? 2 : undefined}
          business={business}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    gap: 5,
    marginTop: 10,
  },
  buyManager: {
    display: "flex",
    alignItems: "center",
  },
});

export default BuyBusinessPrestige;
