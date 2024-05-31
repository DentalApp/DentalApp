// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const SignUpScreen = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [focusedInput, setFocusedInput] = useState(null); // To track the focused input

//   const handleFocus = inputName => {
//     setFocusedInput(inputName);
//   };

//   const handleBlur = () => {
//     setFocusedInput(null);
//   };

//   // const handleSignup = () => {
//   //   // Check constraints before proceeding
//   //   if (username.length < 8) {
//   //     Alert.alert('Error', 'Username should be minimum 8 characters.');
//   //     return;
//   //   }

//   //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   //   if (!emailRegex.test(email)) {
//   //     Alert.alert('Error', 'Please enter a valid email address.');
//   //     return;
//   //   }

//   //   const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/;
//   //   if (!passwordRegex.test(password)) {
//   //     Alert.alert(
//   //       'Error',
//   //       'Password should contain at least one uppercase letter, one lowercase letter, one number, one special symbol, and be at least 8 characters long.',
//   //     );

//   const handleSignup = async () => {
//     try {
//       const response = await fetch('http://192.168.186.29:3002/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({username, email, password}),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log('Signup successful:', result.message);
//         // Redirect or navigate to the login page after successful signup
//         // You might need to update this depending on your navigation setup
//         navigation.navigate('LandingScreen');
//       } else {
//         Alert.alert('Error', result.error || 'Signup failed');
//       }
//     } catch (error) {
//       console.error('Error during signup:', error.message);
//       Alert.alert('Error', 'An unexpected error occurred');

//       return;
//     }
//     // Handle signup logic here, e.g., API call to register the user
//     console.log('Username:', username);
//     console.log('Email:', email);
//     console.log('Password:', password);
//     //navigation.navigate('Login');
//     Alert.alert(
//       'Success!',
//       'You have successfully signed up. Navigating to LoginScreen',
//       [
//         {
//           text: 'OK', // Button text
//           onPress: () => console.log('OK Pressed'), // Action when OK is pressed
//         },
//       ],
//       {cancelable: false}, // Prevents the user from dismissing the alert by tapping outside
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>DentXpert</Text>
//       <Text style={styles.text}>Signup</Text>

//       <TextInput
//         style={[
//           styles.input,
//           focusedInput === 'username' && styles.inputFocused,
//         ]}
//         placeholder="Username"
//         placeholderTextColor="#5072A7"
//         value={username}
//         onChangeText={setUsername}
//         onFocus={() => handleFocus('username')}
//         onBlur={handleBlur}
//         color="#5072A7"
//       />

//       <TextInput
//         style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
//         placeholder="Email"
//         placeholderTextColor="#5072A7"
//         value={email}
//         onChangeText={setEmail}
//         onFocus={() => handleFocus('email')}
//         onBlur={handleBlur}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         color="#5072A7"
//       />

//       <TextInput
//         style={[
//           styles.input,
//           focusedInput === 'password' && styles.inputFocused,
//         ]}
//         placeholder="Password"
//         placeholderTextColor="#5072A7"
//         value={password}
//         onChangeText={setPassword}
//         onFocus={() => handleFocus('password')}
//         onBlur={handleBlur}
//         secureTextEntry
//         color="#5072A7"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     // backgroundColor: '#5072A7',
//     backgroundColor: '#FAF9F6',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#5072A7',
//     marginBottom: 30,
//   },
//   text: {
//     fontSize: 24,
//     color: '#5072A7',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: '#5072A7',
//     borderRadius: 30,
//     width: 200,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   inputFocused: {
//     borderColor: '#5072A7', // Adjust color or add more styles as needed
//     shadowColor: '#5072A7',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//   },
// });

// export default SignUpScreen;

//////////////////////////////////////////////////////////////////////////////for async storage

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null); // To track the focused input

  const handleFocus = inputName => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSignup = async () => {
    try {
      //  signup logic here...
      const response = await fetch('http://0.0.0.0:3002/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Signup successful:', result.message);
        // Redirect or navigate to the login page after successful signup
        // You might need to update this depending on your navigation setup
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.error || 'Signup failed');
      }

      // Assuming signup is successful, store user data in AsyncStorage
      await AsyncStorage.setItem(
        'userProfile',
        JSON.stringify({username, email}),
      );

      // Alert user about successful signup
      Alert.alert('Success', 'Signup successful!');

      // Navigate to login or any other screen after successful signup
      // navigation.navigate('Login');
    } catch (error) {
      console.error('Error during signup:', error.message);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DentXpert</Text>
      <Text style={styles.text}>Signup</Text>

      {/* Input fields */}
      {/* Username */}
      <TextInput
        style={[
          styles.input,
          focusedInput === 'username' && styles.inputFocused,
        ]}
        placeholder="Username"
        placeholderTextColor="#5072A7"
        value={username}
        onChangeText={setUsername}
        onFocus={() => handleFocus('username')}
        onBlur={handleBlur}
        color="#5072A7"
      />

      {/* Email */}
      <TextInput
        style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
        placeholder="Email"
        placeholderTextColor="#5072A7"
        value={email}
        onChangeText={setEmail}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
        keyboardType="email-address"
        autoCapitalize="none"
        color="#5072A7"
      />

      {/* Password */}
      <TextInput
        style={[
          styles.input,
          focusedInput === 'password' && styles.inputFocused,
        ]}
        placeholder="Password"
        placeholderTextColor="#5072A7"
        value={password}
        onChangeText={setPassword}
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
        secureTextEntry
        color="#5072A7"
      />

      {/* Signup button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

// Your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5072A7',
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    color: '#5072A7',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5072A7',
    borderRadius: 30,
    width: 200,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#5072A7',
    shadowColor: '#5072A7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default SignUpScreen;
