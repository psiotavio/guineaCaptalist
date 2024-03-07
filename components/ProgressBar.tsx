import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { usePlayer } from "./gameComponents/PlayerContext";

interface ProgressBarProps {
  duration: number;
  lucro: number;
}

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

const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  duration,
  lucro,
}) => {
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [timer, setTimer] = useState(duration);
  const [pressed, setPressed] = useState(false);
  const [canPress, setCanPress] = useState(true); // Alterado para true para permitir o primeiro clique
  const { coins, addCoins, removeCoins } = usePlayer();

  const handlePress = () => {
    if (!canPress) return; // Não permite clicar se canPress for false
    setPressed(!pressed);
  };

  useEffect(() => {
    if (pressed) {
      setCanPress(false); // Impede futuros cliques até que o timer chegue a 0
      setTimer(duration);
      const newIntervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1 / duration;
          return newProgress >= 1 ? 0 : newProgress;
        });
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    } else {
      clearInterval(intervalId);
      setProgress(0);
      setTimer(duration);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pressed]);

  useEffect(() => {
    if (timer === 0) {
      addCoins(lucro);
      setPressed(false);
      setCanPress(true); // Permite o botão ser pressionado novamente quando o timer chegar a 0
    }
  }, [timer]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const [formattedLucro, definition] = separateNumberAndDefinition(lucro);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.progressSize}>
        <ProgressBar
          progress={progress}
          style={styles.progress}
          color="#F0E68C"
        />
        <View style={styles.lucroContainer}>
          <Text style={styles.lucro}>{formattedLucro}</Text>
          <Text style={styles.lucroText}>{definition}</Text>
        </View>
      </View>
      <View style={styles.time}>
        <Text style={styles.text}>{formatTime(timer)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progress: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 2,
  },
  progressSize: {
    width: "77%",
    position: "relative",
  },
  time: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "lightgray",
    height: 50,
    width: "20%",
    borderRadius: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
  lucro: {
    fontSize: 27,
    fontWeight: "bold",
  },
  lucroText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  lucroContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgressBarComponent;
