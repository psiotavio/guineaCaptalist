import { StyleSheet, Text, View, StatusBar } from "react-native";
import MyDownTabs from "./components/BottomNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PlayerProvider } from "./components/Contexts/PlayerContext";
import { SoundProvider } from "./components/Contexts/AudioContext";

export default function App() {


  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <PlayerProvider>
          <SoundProvider>
            <StatusBar hidden={true} />
            <MyDownTabs />
          </SoundProvider>
        </PlayerProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
