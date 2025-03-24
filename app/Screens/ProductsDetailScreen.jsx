import React from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  // Dummy contact details (replace with actual seller info)
  const sellerPhone = "+1234567890";
  const sellerEmail = "seller@example.com";

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.contactTitle}>Contact Seller:</Text>
      
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${sellerPhone}`)}>
        <Text style={styles.contactText}>📞 Call: {sellerPhone}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${sellerEmail}`)}>
        <Text style={styles.contactText}>✉️ Email: {sellerEmail}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 18, color: "#777", marginBottom: 10 },
  description: { fontSize: 16, color: "#555", marginBottom: 20 },
  contactTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  contactText: { fontSize: 16, color: "#007bff", marginTop: 5 },
});

export default ProductDetailsScreen;
