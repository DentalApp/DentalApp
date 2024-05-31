import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the other screen
    navigation.navigate('UploadXray');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentXpert</Text>
      <Image
        style={styles.displayImage}
        source={require('../assets/displayimage.jpg')}
      />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Upload Xray</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5072A7',
    marginTop: 10,
  },
  displayImage: {
    marginTop: 20,
    height: 300,
    width: 300,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#5072A7',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
