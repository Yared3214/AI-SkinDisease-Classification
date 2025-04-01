import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput, FlatList, Alert, ActivityIndicator } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [existingReview, setExistingReview] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loadingReviews, setLoadingReviews] = useState(false)
  const user = FIREBASE_AUTH.currentUser

  useEffect(() => {
    fetchReviews();
  }, []);

  const checkAndSubmitReview = async () => {
    const userId = user.uid;
    if (!userId) {
      Alert.alert("Error", "You must be logged in to submit a review.");
      return;
    }
    setLoading(true)

    try {
      
      // 1️⃣ Check AsyncStorage first
      const storedReview = await AsyncStorage.getItem(`reviewed_${product.id}_${userId}`);
      if (storedReview) {
        // console.log(storedReview)
        // Alert.alert("Review Already Submitted", "You have already reviewed this product.");
        // return;
        const reviewsRef = collection(FIRESTORE_DB, "reviews");

      // 1️⃣ Check Firestore for an existing review
        const q = query(reviewsRef, where("userId", "==", userId), where("productId", "==", product.id));
        const querySnapshot = await getDocs(q);
        const existingReviewDoc = querySnapshot.docs[0];
        const reviewDocRef = doc(FIRESTORE_DB, "reviews", existingReviewDoc.id);
        await updateDoc(reviewDocRef, {
          reviewText,
          rating,
          publishedAt: new Date(),
        });
        Alert.alert("Success", "Your review has been updated.");
        setRating(0);
        setReviewText("");
        return;
      }

      // 2️⃣ If no review found locally, check Firestore
      const reviewsRef = collection(FIRESTORE_DB, "reviews");
      const q = query(reviewsRef, where("userId", "==", userId), where("productId", "==", product.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Review Already Submitted", "You have already reviewed this product.");
        await AsyncStorage.setItem(`reviewed_${product.id}_${userId}`, "true"); // Save in AsyncStorage
        return;
      }

      // 3️⃣ Submit the review to Firestore
      await addDoc(reviewsRef, {
        userId,
        productId: product.id,
        rating,
        reviewText,
        publishedAt: new Date(),
      });

      // 4️⃣ Save the review in AsyncStorage to prevent multiple submissions
      await AsyncStorage.setItem(`reviewed_${product.id}_${userId}`, "true");

      Alert.alert("Success", "Your review has been submitted!");
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Failed to submit review. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  const fetchReviews = async () => {
    setLoadingReviews(true)
    try {
       // Fetch reviews for the current product
    const q = query(collection(FIRESTORE_DB, "reviews"), where("productId", "==", product.id));
    const reviewSnapshot = await getDocs(q);

    // Extract review data
    const reviews = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch user details for each review
    const userPromises = reviews.map(async (review) => {
      const userRef = doc(FIRESTORE_DB, "users", review.userId); // Reference to user document
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return { ...review, user: userSnap.data() }; // Merge user data with review
      } else {
        return { ...review, user: { name: "Anonymous", email: "N/A" } }; // Default values
      }
    });

    // Resolve all user fetches and update state
    const reviewsWithUsers = await Promise.all(userPromises);
    setReviewList(reviewsWithUsers);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false)
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Product Image & Details */}
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}birr</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Contact Seller Section */}
      <Text style={styles.contactTitle}>Contact Seller:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${product.sellerPhone}`)}>
        <Text style={styles.contactText}>📞 Call: {product.sellerPhone}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${product.sellerEmail}`)}>
        <Text style={styles.contactText}>✉️ Email: {product.sellerEmail}</Text>
      </TouchableOpacity>

      {/* Rating Section */}
      <Text style={styles.sectionTitle}>Rate this Product:</Text>
      <StarRating rating={rating} onChange={setRating} />

      {/* Review Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />

      {/* Submit Review Button */}
      
      <TouchableOpacity style={styles.submitButton} onPress={checkAndSubmitReview}>
        {loading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Review</Text>
                )}
      </TouchableOpacity>
      
{/* Display Reviews */}
<Text style={styles.sectionTitle}>Customer Reviews:</Text>{
  loadingReviews ? <ActivityIndicator style={styles.loader} />
  : reviewList.length === 0 ? (
    <Text style={styles.noReviews}>No reviews yet. Be the first to review!</Text>
  ) : (
  <FlatList
    data={reviewList}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.reviewContainer}>
        {/* Profile Image */}
        {/* <Image source={{ uri: item.user?.profileImage }} style={styles.profileImage} /> */}
        <View style={{
                      borderRadius: 100,
                      backgroundColor: "#FF5733",
                      width: "18%",
                      height: '90%',
                      alignItems: 'center',
                      paddingTop: 15,
                      color: "#fff"
                    }}><Text style={{alignItems: 'center'}}>{item?.user?.name.split(' ')[0][0] + item?.user?.name.split(' ')[1][0]}</Text></View>

        {/* Review Details */}
        <View>
          <Text style={styles.reviewText}>{item.reviewText}</Text>

          {/* Star Rating */}
          <StarRating rating={item.rating} starSize={18} disabled />

          {/* Reviewer Name & Date */}
          <Text style={styles.reviewDate}>
            <Text style={styles.userName}>{item.user?.name}</Text> at{" "}
            {moment(item.publishedAt).format("DD-MMM-YYYY")}
          </Text>
        </View>
      </View>
    )}
  /> )}

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: "center", alignItems: "center"},
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 18, color: "#777", marginBottom: 10 },
  description: { fontSize: 16, color: "#555", marginBottom: 20 },
  contactTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  contactText: { fontSize: 16, color: "#007bff", marginTop: 5 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 5, 
    padding: 10, 
    marginTop: 10, 
    fontSize: 16 
  },
  submitButton: { 
    backgroundColor: "#6BA292", 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10, 
    alignItems: "center" 
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  reviewContainer: { 
    backgroundColor: "#f8f8f8", 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10 
  },
  reviewText: { fontSize: 16, color: "#333", marginTop: 5 },
  noReviews: { fontSize: 16, color: "#777", marginTop: 10, fontStyle: "italic" },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#555",
  },
  userName: {
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
