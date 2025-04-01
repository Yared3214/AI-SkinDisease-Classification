import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, ActivityIndicator } from "react-native";
import RenderHtml from "react-native-render-html";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ResourceDetailScreen = () => {
  const route = useRoute();
  const { resource } = route.params;
  const [likes, setLikes] = useState(resource.likes);
  const [comments, setComments] = useState(resource.comments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false)
  const [hasLiked, setHasLiked] = useState(false);
  const resourceRef = doc(FIRESTORE_DB, "resources", resource.id);
  const user_ = FIREBASE_AUTH.currentUser;
  const width = Dimensions.get("window").width;

  useEffect(() => {
    const unsubscribe = onSnapshot(resourceRef, (docSnap) => {
      if (docSnap.exists()) {
        // const resourceData = docSnap.data();
        setLikes(docSnap?.data()?.likes.length);
  
        // Check if current user has liked the post
        setHasLiked(docSnap.data()?.likes?.includes(user_.uid)); // Assuming `likes` is an array of userIds
      }
    });
  
    return unsubscribe;
  }, [resource.id]);

  useEffect(() => {
    fetchComments(setComments);
  }, [resource.id]);

  const handleLikeToggle = async () => {
    const updatedLikes = hasLiked
      ? arrayRemove(user_.uid) // Remove user ID if already liked
      : arrayUnion(user_.uid); // Add user ID if not liked
  
    try {
      await updateDoc(resourceRef, {
        likes: updatedLikes,
      });
  
      setHasLiked(!hasLiked); // Toggle the like status locally
      setLikes(hasLiked ? likes - 1 : likes + 1); // Update the likes count locally
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  

  const handleComment = async () => {
    if (newComment.trim() === "") return;

    // Check if the user has already commented on this resource
  const commentQuery = query(
    collection(FIRESTORE_DB, "comment"),
    where("resourceId", "==", resource.id),
    where("userId", "==", user_.uid)
  );

  const querySnapshot = await getDocs(commentQuery);

  if (!querySnapshot.empty) {
    // User has already commented on this resource
    alert("You have already commented on this resource.");
    return;
  }

  const commentData = {
    text: newComment,
    userId: user_.uid, // Store userId instead of full user object
    resourceId: resource.id, // Link comment to specific resource
    createdAt: serverTimestamp(), // Firestore timestamp for accurate ordering
  };

  try {
    await addDoc(collection(FIRESTORE_DB, "comment"), commentData);

    // Increment comment count in resource document
    const resourceRef = doc(FIRESTORE_DB, "resources", resource.id);
    await updateDoc(resourceRef, { commentCount: increment(1) });

    // Update local state (Optional: You may want to fetch comments again instead)
    setComments([...comments, { ...commentData, user_ }]);
    setNewComment(""); // Reset input field
  } catch (error) {
    console.error("Error posting comment:", error);
  }
  };

  const fetchComments = async (setComments) => {
    setLoading(true)
    try {
      const q = query(
        collection(FIRESTORE_DB, "comment"),
        where("resourceId", "==", resource.id),
        orderBy("createdAt", "desc")
      );
  
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      // Fetch user data for each comment
      const commentsWithUserData = await Promise.all(
        commentsData.map(async (comment) => {
          const userRef = doc(FIRESTORE_DB, "users", comment.userId);
          const userSnap = await getDoc(userRef);
  
          return {
            ...comment,
            user: userSnap.exists()
              ? userSnap.data()
              : { name: "Anonymous", profileImage: "https://via.placeholder.com/50" }, // Fallback
          };
        })
      );
  
      setComments(commentsWithUserData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: resource.image }} style={styles.image} />
      <Text style={styles.title}>{resource.title}</Text>
      <Text style={styles.type}>{resource.type}</Text>
      <Text style={styles.author}>by {resource.author}</Text>

      {/* Like & Views */}
      <View style={styles.statsRow}>
        <TouchableOpacity onPress={handleLikeToggle} style={styles.statItem}>
          <FontAwesome name={hasLiked ? "heart" : "heart-o"} size={20} color="red" />
          <Text>{likes}</Text>
        </TouchableOpacity>
        <View style={styles.statItem}>
          <FontAwesome name="eye" size={20} color="gray" />
          <Text>{resource.views}</Text> 
        </View>
      </View>

      {/* Full Article Content */}
      <RenderHtml contentWidth={width} source={{ html: resource.description }} />

      {/* Comments Section */}
      <Text style={styles.commentHeader}>Comments:</Text>
      {loading ? <ActivityIndicator style={styles.loader} />
      : comments.length === 0 ? (
          <Text style={styles.noReviews}>No comments yet. Be the first to comment!</Text>
        ) : (
          <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            gap: 10
          }}>
            <View style={{
              borderRadius: 100,
              backgroundColor: "#FF5733",
              width: "14%",
              height: '100%',
              alignItems: 'center',
              paddingTop: 15,
              color: "#fff"
            }}><Text>{item?.user?.name.split(' ')[0][0] + item?.user?.name.split(' ')[1][0]}</Text></View>
            <View style={styles.commentContainer}>
            {/* <Image source={{ uri: item?.user?.profileImage }} style={styles.profileImage} /> */}
            <View>
              <Text style={styles.commentUser}>{item?.user?.name}</Text>
              <Text style={styles.comment}>{item?.text}</Text>
            </View>
          </View>
          </View>
          
        )}
      />
        )}
      

      {/* Comment Input */}
      {user_ && (
        <View style={styles.commentBox}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleComment} style={styles.sendButton}>
            <FontAwesome name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView> 
  );
};

export default ResourceDetailScreen;

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: "center", alignItems: "center"},
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  type: { fontSize: 16, color: "gray", marginBottom: 3 },
  author: { fontSize: 14, color: "#666", marginBottom: 10 },

  statsRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  statItem: { flexDirection: "row", alignItems: "center", marginRight: 15 },

  commentHeader: { fontSize: 18, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  commentContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  commentUser: { fontSize: 14, fontWeight: "bold" },
  comment: { fontSize: 14, color: "#333" },

  commentBox: { flexDirection: "row", alignItems: "center", marginTop: 10, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  input: { flex: 1, height: 40, paddingHorizontal: 5 },
  sendButton: { backgroundColor: "#006666", padding: 10, borderRadius: 5, marginLeft: 10 },
  content: { fontSize: 16, lineHeight: 24, textAlign: "justify" },
  markdown: { fontSize: 16, lineHeight: 24 },
});