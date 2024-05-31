// import React, {useState, useEffect} from 'react';
// import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const UserProfile = () => {
//   const navigation = useNavigation();
//   const [userData, setUserData] = useState(null);

//   // Simulated user data
//   const fetchUserData = () => {
//     // Simulated delay to mimic an API call
//     setTimeout(() => {
//       const mockUserData = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         // Other user data fields
//       };
//       setUserData(mockUserData);
//     }, 1000); // 1 second delay
//   };

//   useEffect(() => {
//     // Fetch user data when component mounts (after login)
//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     // Clear user data on logout
//     setUserData(null);
//     // You can also add navigation logic here to navigate to the login screen
//     navigation.navigate('LandingScreen');
//   };

//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <View style={styles.profileContainer}>
//           <Text style={styles.title}>User Profile</Text>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.value}>{userData.name}</Text>
//           <Text style={styles.label}>Email:</Text>
//           <Text style={styles.value}>{userData.email}</Text>
//           {/* Add other user data fields here */}
//           <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//             <Text style={styles.buttonText}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <Text>Loading user data...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   profileContainer: {
//     backgroundColor: '#5072A7',
//     padding: 90,
//     borderRadius: 10,
//     shadowColor: '#5072A7',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#fff',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 5,
//     color: '#fff',
//   },
//   value: {
//     fontSize: 16,
//     marginBottom: 15,
//     color: '#fff',
//   },
//   logoutButton: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: 'red',
//     fontSize: 18,
//   },
// });

// export default UserProfile;

////////////////////////////////////////////////////////for async storage

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfileJSON = await AsyncStorage.getItem('userProfile');
        if (userProfileJSON !== null) {
          const userProfileData = JSON.parse(userProfileJSON);
          setUserProfile(userProfileData);
        } else {
          console.log('User profile not found.');
        }
      } catch (error) {
        console.error('Error getting user profile:', error);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userProfile');
      setUserProfile(null);
      Alert.alert('Logout', 'You have been logged out successfully.');
      // Navigate to login screen or any other screen after logout
      navigation.navigate('LandingScreen');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An unexpected error occurred while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {userProfile && (
        <View style={styles.card}>
          <Text style={styles.text}>Username: {userProfile.username}</Text>
          <Text style={styles.text}>Email: {userProfile.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5072A7',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  text: {
    color: '#5072A7',
  },
  button: {
    marginTop: 20,
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
});

export default UserProfile;
