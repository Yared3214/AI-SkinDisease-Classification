import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons"; // For icons
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native'

const EducationalResources = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const resources = [
    {
      id: "1",
      title: "Understanding Eczema",
      type: "Article",
      author: "Dr. Lisa Tan",
      likes: 120,
      comments: 45,
      views: 300,
      image: "https://via.placeholder.com/60", // Replace with actual image URL
    },
    {
      id: "2",
      title: "Acne Treatment Video",
      type: "Video",
      author: "Dr. Michael Lee",
      likes: 230,
      comments: 75,
      views: 500,
      image: "https://via.placeholder.com/60",
    },
    {
      id: "3",
      title: "Psoriasis Infographic",
      type: "Infographic",
      author: "Dr. Sarah Green",
      likes: 180,
      comments: 60,
      views: 400,
      image: "https://via.placeholder.com/60",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('resource-detail')}>
      <View style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.author}>by {item.author}</Text>

          {/* Likes, Comments, Views */}
          <View style={styles.stats}>
            <FontAwesome name="heart" size={14} color="gray" />
            <Text style={styles.statText}>{item.likes}</Text>
            <FontAwesome name="comment" size={14} color="gray" />
            <Text style={styles.statText}>{item.comments}</Text>
            <FontAwesome name="eye" size={14} color="gray" />
            <Text style={styles.statText}>{item.views}</Text>
          </View>
        </View>

        {/* Thumbnail */}
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

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
    