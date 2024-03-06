import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Notifications = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>ABA 4</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'yellow',
  },
  text:{
    textAlign:"center",
  },
});

export default Notifications;
