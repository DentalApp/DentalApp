import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  Modal,
  Button,
  ActivityIndicator,
  Share,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default function UploadXray() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Storage permission granted');
        return true;
      } else {
        console.log('Storage permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleImageSelect = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (hasPermission) {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
          copyTo: 'cachesDirectory',
        });
        if (!result) {
          // Handle case where user canceled or there was an issue accessing the document
          console.warn('No document selected.');
          return;
        }
        console.log(result);
        console.log(result[0].fileCopyUri);
        if (result[0].fileCopyUri) {
          const source = {uri: result[0].fileCopyUri};
          console.log(source);
          setSelectedImage(source);
        } else {
          console.warn(
            'File copy not available, using original URI (if present).',
          );
          if (result.uri) {
            setSelectedImage({uri: result.result.uri}); // Use original URI if available
          } else {
            setResult('No image selected.'); // Handle case where both copy and original URI are missing
          }
        }
      } else {
        console.log('Storage permission not granted');
        setResult('Storage permission is required to select an image.'); // User-friendly error message
      }
    } catch (error) {
      console.error('Error picking document:', error);
      setResult(
        'An error occurred while selecting the image. Please try again.',
      ); // User-friendly error message
    }
  };

  // //axios code for handle submit
  // const handleSubmit = async () => {
  //   if (!selectedImage) {
  //     console.error('No image selected');
  //     setResult('Please select an image to process.'); // User-friendly reminder
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', selectedImage.uri); // Provide the actual image object

  //     const response = await axios.post(
  //       'https://dental-app1.onrender.com/predict',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );

  //     console.log(response);
  //     if (!response.data.ok) {
  //       // Assuming the response structure includes a 'data.ok' property
  //       // Handle non-2xx status codes
  //       const errorText = response.data.error || 'Unknown error'; // Access error message from response (adjust based on API)
  //       setResult(
  //         `Server error: ${response.status} ${response.statusText}. ${errorText}`,
  //       );
  //       console.error('API error:', errorText);
  //       return;
  //     }

  //     const data = response.json(); // Access the actual data from the response
  //     if (data.predicted_class) {
  //       setResult('Prediction: ' + data.predicted_class); // Clear success message
  //     } else {
  //       setResult(
  //         'An error occurred while processing the image. Please try again.',
  //       ); // User-friendly error message
  //       console.error('Unexpected response from backend:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error during API call:', error);
  //     // Handle potential errors during image attachment (formData.append) or other issues
  //     setResult('Network error or image upload issue, please try again.'); // User-friendly error message
  //   }
  // };
  //last hope code before axios
  const handleSubmit = async () => {
    setLoading(true);
    if (!selectedImage) {
      console.error('No image selected');
      setResult('Please select an image to process.');
      setLoading(false); // User-friendly reminder
      return;
    }
    JSON.stringify(selectedImage);
    try {
      setLoading(true);
      const fileName = selectedImage.uri.split('/').pop();
      const formData = new FormData();
      console.log(selectedImage);
      console.log(formData);
      console.log(selectedImage);
      formData.append('file', {
        uri: selectedImage.uri,
        name: fileName,
        type: 'image/jpeg', // Assuming selectedImage is in the format {uri: 'image_uri'}
      });
      console.log(formData);
      const response = await fetch('https://dental-app1.onrender.com/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      console.log(response.status, response.statusText);

      const resText = await response.text();
      console.log('Response text:', resText);

      // Parse JSON response
      const jsonResponse = JSON.parse(resText);
      // Extract predicted_class value
      const predictedClass = jsonResponse.predicted_class;
      // Process the response
      if (response.ok) {
        setResult('You might have to do: ' + predictedClass);
        setShowDisclaimer(true);
      } else {
        setResult(
          'An error occurred while processing the image. Please try again.',
        );
        console.error('Unexpected response from backend:', resText);
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setResult('Network error, please check your connection and try again.');
    } finally {
      setLoading(false); // Stop loading in all cases (success or error)
    }
  };

  const handleReSubmit = () => {
    setSelectedImage(null);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Logotitle}>DentXpert</Text>
      <Text style={styles.title}>Upload Your X-ray Image Here</Text>
      <View style={styles.imageBox}>
        {selectedImage ? (
          <Image source={selectedImage} style={styles.image} />
        ) : (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleImageSelect}>
            <Text style={styles.buttonText}>Tap to Select X-ray Image</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={handleReSubmit}>
            <Text style={styles.buttonText}>Reupload</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <ActivityIndicator size="large" color="#5072A7" /> // Display ActivityIndicator when loading is true
        )}
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </View>
      <Modal
        visible={showDisclaimer}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDisclaimer(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Text style={{marginBottom: 10}}>Disclaimer:</Text>
            <Text style={{color: 'black'}}>
              The prediction result might not always be accurate. Please use it
              with caution.
            </Text>
            <Button
              title="I understand"
              onPress={() => setShowDisclaimer(false)}
            />
          </View>
        </View>
      </Modal>
      <View style={{marginTop: 1}}>
        <TouchableOpacity
          style={[styles.submitButton]}
          onPress={onShare}
          title="Share">
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  Logotitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5072A7',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5072A7',
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  selectButton: {
    backgroundColor: '#5072A7',
    padding: 80,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#5072A7',
    borderRadius: 30,
    width: 130,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resultContainer: {
    height: 70,
    width: 300,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5072A7',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
