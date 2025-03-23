import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const ResourceDetailScreen = () => {
  // Demo data (fallback if route.params is undefined)
  const demoData = {
    title: "Understanding Eczema",
    type: "Article",
    author: "Dr. Lisa Tan",
    image: "data:image/jpeg;base64,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",
    content: "Eczema is a common skin condition that causes dry, itchy, and inflamed skin Eczema is a common skin condition that causes dry, itchy, and inflamed skin Eczema is a common skin condition that causes dry, itchy, and inflamed skin Eczema is a common skin condition that causes dry, itchy, and inflamed skin Eczema is a common skin condition that causes dry, itchy, and inflamed skin Eczema is a common skin condition that causes dry, itchy, and inflamed skin Eczema is a common skin condition that causes dry, itchy, and inflamed skin...",
    likes: 120,
    comments: 45,
    views: 300,
  };
  
  // Use route params if available, otherwise use demoData
  const { title, type, author, image, content, likes, comments, views } = demoData;

  return (
    <ScrollView style={styles.container}>
      {/* Image */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Title & Info */}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{type} by {author}</Text>

        {/* Stats */}
        <View style={styles.stats}>
          <Text>❤️ {likes}</Text>
          <Text>💬 {comments}</Text>
          <Text>👁️ {views}</Text>
        </View>

        {/* Content */}
        <Text style={styles.content}>{content}</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResourceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: "#6BA292",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  secondaryButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});