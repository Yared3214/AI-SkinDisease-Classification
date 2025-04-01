import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons"; // For icons
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native'
import { collection, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EducationalResources = () => {
  const navigation = useNavigation();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "resources"));
        const resourceList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResources(resourceList);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  },);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#006666" />
      </View>
    );
  }

  const renderItem = ({ item }) => {

    const handlePress = async () => {
  const resourceRef = doc(FIRESTORE_DB, "resources", item.id);

  try {
    // await AsyncStorage.removeItem("viewedResources");
    // Get stored views from AsyncStorage
    const viewedResources = await AsyncStorage.getItem("viewedResources");
    let viewedResourcesArray = viewedResources ? JSON.parse(viewedResources) : [];

     if (!Array.isArray(viewedResourcesArray)) {
      viewedResourcesArray = []; // Fallback in case of unexpected data
    }

    // Check if the user already viewed this resource
    if (!viewedResourcesArray.includes(item.id)) {
      // Update Firestore: Increment view count
      await updateDoc(resourceRef, {
        views: increment(1),
      });

      // Store the viewed resource to prevent counting again
      viewedResourcesArray.push(item.id);
      await AsyncStorage.setItem("viewedResources", JSON.stringify(viewedResourcesArray));
    }

    // Navigate to detail screen (without modifying views manually)
    navigation.navigate("resource-detail", { resource: item });
  } catch (error) {
    console.error("Error updating views:", error);
  }
};
    return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.author}>by {item.author}</Text>

          {/* Likes, Comments, Views */}
          <View style={styles.stats}>
            <FontAwesome name="heart" size={14} color="gray" />
            <Text style={styles.statText}>{item.likes.length}</Text>
            <FontAwesome name="comment" size={14} color="gray" />
            <Text style={styles.statText}>{item.commentCount}</Text>
            <FontAwesome name="eye" size={14} color="gray" />
            <Text style={styles.statText}>{item.views}</Text>
          </View>
        </View>

        {/* Thumbnail */}
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Educational Resources</Text>
        <Feather name="search" size={20} color="black" />
      </View>
      <Text style={styles.subHeader}>
        Explore dermatologist-approved resources to learn more about skin health.
      </Text>

      {/* List of Resources */}
      <FlatList data={resources} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: "center", alignItems: "center"},
  container: { flex: 1, backgroundColor: "#fff", padding: 20, },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  header: { fontSize: 20, fontWeight: "bold" },
  subHeader: { fontSize: 14, color: "#666", marginBottom: 15 },
  
  card: { backgroundColor: "#f9f9f9", borderRadius: 8, padding: 12, marginBottom: 10, elevation: 2 },
  cardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "bold", color: "#006666" },
  type: { fontSize: 14, color: "#444", marginBottom: 3 },
  author: { fontSize: 13, color: "#777" },

  stats: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  statText: { fontSize: 12, color: "gray", marginLeft: 3, marginRight: 8 },

  image: { width: 50, height: 50, borderRadius: 5 },
});

export default EducationalResources;
    