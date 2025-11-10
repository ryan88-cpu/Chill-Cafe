import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Navigation timeout
    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 5000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#4E342E" 
        barStyle="light-content" 
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Chill Cafe
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#795548', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
});

export default SplashScreen;
