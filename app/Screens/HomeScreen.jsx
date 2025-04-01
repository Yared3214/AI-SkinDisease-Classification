import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createStaticNavigation, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';


const SkinImageUploadScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "We need access to your camera roll to continue.");
      }
    })();
  }, []);

  const pickImage = async (fromCamera) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Affected Skin Image</Text>

      <View style={styles.buttonRow}>
        {/* <Button title="Take a Photo" onPress={() => pickImage(true)} />
        <Button title="Select from Gallery" onPress={() => pickImage(false)} /> */}
        <TouchableOpacity style={[styles.photoButton, { backgroundColor: "#6BA292" }]} onPress={() => pickImage(true)}>
            <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.photoButton, { backgroundColor: "#008CBA" }]} onPress={() => pickImage(false)}>
            <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>

      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.instructions}>
        Ensure the image is clear and well-lit, focusing on the affected skin area.
      </Text>

      {/* Wrapper to push the button to the bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.analyzeButton}
        onPress={() => navigation.navigate('analysis-result')}>
          <Text style={styles.analyzeText}>Analyze Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginVertical: 10 },
  imageContainer: { alignItems: "center", marginVertical: 10 },
  image: { width: 100, height: 100, borderRadius: 10 },
  removeText: { color: "red", marginTop: 5 },
  instructions: { textAlign: "center", marginVertical: 10, color: "#555" },

  bottomContainer: { 
    flex: 1, 
    justifyContent: "flex-end", 
    width: "100%", 
    paddingBottom: 20 
  },
  analyzeButton: { 
    backgroundColor: "#6BA292", 
    padding: 15, 
    borderRadius: 5, 
    width: "80%", 
    alignItems: "center", 
    alignSelf: "center" 
  },
  analyzeText: { color: "#fff", fontWeight: "bold" },
  photoButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
  
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  
});

export default SkinImageUploadScreen;


// import React, { useState } from "react";
// import { View, Image, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const SkinImageUploadScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const pickImage = async (fromCamera) => {
//     let result;
//     if (fromCamera) {
//       result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });
//     } else {
//       result = await ImagePicker.launchImageLibraryAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });
//     }

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Upload Affected Skin Image</Text>

//       <View style={styles.buttonRow}>
//         <Button title="Take a Photo" onPress={() => pickImage(true)} />
//         <Button title="Select from Gallery" onPress={() => pickImage(false)} />
//       </View>

//       {selectedImage && (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//           <TouchableOpacity onPress={() => setSelectedImage(null)}>
//             <Text style={styles.removeText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <Text style={styles.instructions}>
//         Ensure the image is clear and well-lit, focusing on the affected skin area.
//       </Text>

//       <TouchableOpacity style={styles.analyzeButton}>
//         <Text style={styles.analyzeText}>Analyze Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#fff" },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginVertical: 10 },
//   imageContainer: { alignItems: "center", marginVertical: 10 },
//   image: { width: 100, height: 100, borderRadius: 10 },
//   removeText: { color: "red", marginTop: 5 },
//   instructions: { textAlign: "center", marginVertical: 10, color: "#555" },
//   analyzeButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 5, width: "80%", alignItems: "center" },
//   analyzeText: { color: "#fff", fontWeight: "bold" },
// });

// export default SkinImageUploadScreen;
