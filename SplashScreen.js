// SplashScreen.js
import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LandingScreen');
    }, 2200);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/DentXpertLogo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5072A7',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;
