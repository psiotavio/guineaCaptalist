import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Notifications = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
      <ImageBackground
          source={require("../assets/gameImg/background3.jpg")}
          style={styles.image}
        >
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

export default Notifications;
