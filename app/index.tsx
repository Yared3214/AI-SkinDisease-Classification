  import { ActivityIndicator, Text, View } from "react-native";
  import TabNavigation from "./Navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import LoginSignupScreenStackNav from './Navigation/LoginSignupScreenStackNav'

  export default function Index() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authenticatedUser: any) => {
        setUser(authenticatedUser);
        setLoading(false);
      });

    return () => unsubscribe(); // Cleanup listener
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6BA292" />
        </View>
      );
    }

    return (
      <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}>
        {user ? <TabNavigation /> : <LoginSignupScreenStackNav />}
      </View>
    );
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: "center",
    //       // alignItems: "center",
    //     }}
    //   >
    //     <TabNavigation/>
    //   </View>
    // );
  }
