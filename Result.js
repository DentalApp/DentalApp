// import React from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const Result = () => {
//   const navigation = useNavigation();

//   const handleFindDoctorsPress = () => {
//     // navigation.navigate('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.Logotitle}>DentXpert</Text>
//       <Text style={styles.title}>Results</Text>

//       {/* Display Image */}
//       <Image
//         source={require('../assets/download.jpg')}
//         style={styles.resultImage}
//       />

//       {/* Display Textual Results */}
//       <View style={styles.resultTextContainer}>
//         <Text style={styles.resultText}>
//           Your Results: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         </Text>
//       </View>

//       {/* Find Doctors Button */}
//       <TouchableOpacity
//         style={styles.findDoctorsButton}
//         onPress={handleFindDoctorsPress}>
//         <Text style={styles.buttonText}>Find Doctors</Text>
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
//   Logotitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 18,
//     color: 'white',
//   },
//   resultImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   resultTextContainer: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//     width: '80%', // Adjust the width as needed
//   },
//   resultText: {
//     textAlign: 'center',
//     color: '#5072A7',
//   },
//   findDoctorsButton: {
//     backgroundColor: 'white',
//     borderRadius: 25,
//     width: 150,
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#5072A7',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Result;

import React from 'react';
import {View, Text, Button, Share} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Result = () => {
  const generatePDF = async () => {
    const disclaimer =
      'Results are for demonstration purposes only and may not be accurate. Consult your doctor for accurate medical advice.';
    const results =
      'Dummy results: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis mauris eget eros ultrices.';

    const htmlContent = `
      <h1>Dummy Results</h1>
      <p>${results}</p>
      <p>${disclaimer}</p>
    `;

    try {
      const {filePath} = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'DummyResults',
        directory: 'Documents',
      });

      return filePath;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };

  const handleSharePDF = async () => {
    try {
      const filePath = await generatePDF();

      if (filePath) {
        Share.share({
          title: 'Share Dummy Results PDF',
          message: 'Sharing PDF file',
          url: `file://${filePath}`,
        });
      } else {
        console.log('PDF generation failed: File path not available');
      }
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>Dummy Results</Text>
      <Text style={{marginBottom: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis
        mauris eget eros ultrices.
      </Text>
      <Text style={{marginBottom: 20}}>
        Results are for demonstration purposes only and may not be accurate.
        Consult your doctor for accurate medical advice.
      </Text>
      <Button title="Share PDF" onPress={handleSharePDF} />
    </View>
  );
};

export default Result;
