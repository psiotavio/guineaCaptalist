import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Recents = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>ABA 3</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'green',
  },
  text:{
    textAlign:"center",
  },
});

export default Recents;
