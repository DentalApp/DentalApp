// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const LandingScreen = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLoginPress = () => {
//     // Navigate to the Login screen
//     // navigation.navigate('Login');
//     console.log('Username:', username);
//     console.log('Password:', password);
//     // Navigating to the next screen after successful login
//     navigation.navigate('Home');
//   };

//   const handleSignUpPress = () => {
//     // Navigate to the Signup screen
//     navigation.navigate('SignUpScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>DentXpert</Text>
//       <Text style={styles.text1}>"Your Smile, Our Priority"</Text>

//       <Text style={styles.text}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="white"
//         value={username}
//         onChangeText={text => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="white"
//         secureTextEntry={true}
//         value={password}
//         onChangeText={text => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#5072A7',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 30,
//   },
//   text1: {
//     fontSize: 18,
//     color: 'white',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 30,
//   },
//   input: {
//     marginTop: 20,
//     width: '80%',
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: 'white',
//     color: 'white',
//   },
//   text: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   loginButton: {
//     marginTop: 15,
//     backgroundColor: 'white',
//     borderRadius: 30,
//     width: 200,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   signUpButton: {
//     backgroundColor: 'white',
//     borderRadius: 30,
//     width: 200,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#3498db',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default LandingScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    try {
      const response = await fetch('http://0.0.0.0:3002/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Navigate to the next screen after successful login
        alert('login successfully');
        const {token, user} = data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userProfile', JSON.stringify(user));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const handleSignUpPress = () => {
    // Navigate to the Signup screen
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentXpert</Text>
      <Text style={styles.text1}>"Your Smile, Our Priority"</Text>

      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  text1: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 200,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 200,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
