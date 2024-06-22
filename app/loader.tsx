import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Loader = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
        <View style={styles.halfCircle} />
        <View style={[styles.halfCircle, styles.rightHalf]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },
  spinner: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfCircle: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 9,
    borderColor: 'transparent',
    borderTopColor: '#474bff',
  },
  rightHalf: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 9,
    borderColor: 'transparent',
    borderTopColor: '#474bff',
    transform: [{ rotate: '180deg' }],
  },
});

export default Loader;
