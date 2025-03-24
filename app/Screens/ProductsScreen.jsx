import React from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";

const products = [
  {
    id: "1",
    name: "Hydrating Face Cream",
    price: "25o birr",
    description: "A deeply hydrating cream infused with natural extracts.",
    rating: 4.5,
    reviews: 120,
    category: "Moisturizer",
    image: "https://www.bathandbodyworks.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master-catalog/default/dw5adb88f8/hires/028000253.jpg?sh=471",
  },
  {
    id: "2",
    name: "Vitamin C Serum",
    price: "300 birr",
    description: "Brightens skin and reduces dark spots with Vitamin C.",
    rating: 4.8,
    reviews: 98,
    category: "Serum",
    image: "https://m.media-amazon.com/images/I/51h+qCXUaSL._SL1000_.jpg",
  },
  {
    id: "3",
    name: "Aloe Vera Gel",
    price: "200 birr",
    description: "Soothing aloe vera gel for moisturizing and healing skin.",
    rating: 4.6,
    reviews: 150,
    category: "Natural",
    image: "https://drorganic.co.uk/shop/images/products/DROALOEGEL_large@2x.jpg?t=5086802349",
  },
];

const SkinCareProductsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("product-detail", { product: item })}
          >
            <Card containerStyle={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>

              {/* Rating & Reviews */}
              <View style={styles.ratingContainer}>
                <Icon name="star" type="font-awesome" color="#FFD700" size={16} />
                <Text style={styles.rating}>{item.rating} ({item.reviews} reviews)</Text>
              </View>

              {/* Contact Seller Button */}
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contact Seller</Text>
              </TouchableOpacity>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 10 },
  card: { borderRadius: 10, padding: 15, alignItems: "center", elevation: 3 },
  image: { width: 120, height: 120, borderRadius: 10 },
  category: { fontSize: 12, color: "#007bff", marginTop: 5 },
  name: { fontSize: 16, fontWeight: "bold", marginVertical: 5, textAlign: "center" },
  price: { fontSize: 14, color: "#555", marginBottom: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  rating: { fontSize: 14, marginLeft: 5, color: "#444" },
  contactButton: { backgroundColor: "#6BA292", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  contactButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});

export default SkinCareProductsScreen;


// import React from "react";
// import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Card } from "react-native-elements";
// import { useNavigation } from '@react-navigation/native'


// const products = [
//   {
//     id: "1",
//     name: "Hydrating Face Cream",
//     price: "250 birr",
//     description: "A deeply hydrating cream infused with natural extracts.",
//     image: "https://www.bathandbodyworks.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master-catalog/default/dw5adb88f8/hires/028000253.jpg?sh=471",
//   },
//   {
//     id: "2",
//     name: "Vitamin C Serum",
//     price: "300 birr",
//     description: "Brightens skin and reduces dark spots with Vitamin C.",
//     image: "https://m.media-amazon.com/images/I/51h+qCXUaSL._SL1000_.jpg",
//   },
//   {
//     id: "3",
//     name: "Aloe Vera Gel",
//     price: "200 birr",
//     description: "Soothing aloe vera gel for moisturizing and healing skin.",
//     image: "https://drorganic.co.uk/shop/images/products/DROALOEGEL_large@2x.jpg?t=5086802349",
//   },
// ];

// const ProductsScreen = () => {
//     const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('product-detail', { product: item })}
//           >
//             <Card containerStyle={styles.card}>
//               <Image source={{ uri: item.image }} style={styles.image} />
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.price}>{item.price}</Text>
//             </Card>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f8f8", padding: 10 },
//   card: { borderRadius: 10, padding: 15, alignItems: "center" },
//   image: { width: 120, height: 120, borderRadius: 10 },
//   name: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
//   price: { fontSize: 14, color: "#777" },
// });

// export default ProductsScreen;

