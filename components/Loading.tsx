import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Animated } from 'react-native';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    const timer2 = setTimeout(() => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ImageBackground
          source={require('../assets/gameImg/background1.jpg')}
          style={styles.imageBackground}
        />
      ) : (
        <ImageBackground
          source={require('../assets/gameImg/background2.jpg')}
          style={styles.imageBackground}
        >
          <Animated.View
            style={[
              styles.progressBar,
              { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
            ]}
          />
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default LoadingScreen;
