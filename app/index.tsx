  import { ActivityIndicator, Text, View } from "react-native";
  import TabNavigation from "./Navigation/TabNavigation";
  import DrawerNavigator from './Navigation/DrawerNavigator'
import { NavigationContainer, createStaticNavigation,
  useNavigation,} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import LoginSignupScreenStackNav from './Navigation/LoginSignupScreenStackNav'
import { doc, getDoc } from "firebase/firestore";
import AdminHomeScreen from './Screens/AdminHomeScreen'

  export default function Index() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authenticatedUser: any) => {
        setUser(authenticatedUser);
    
        if (authenticatedUser) {
          (async () => {
            try {
              const userDocRef = doc(FIRESTORE_DB, "users", authenticatedUser.uid);
              const userSnap = await getDoc(userDocRef);
    
              if (userSnap.exists()) {
                const userData = userSnap.data();
                setRole(userData.role || "user");
              }
            } catch (error) {
              console.error("Error fetching user role:", error);
            }
          })();
        }
      });
      setLoading(false)
      return () => unsubscribe();
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
        {user ? ( role == null ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6BA292" />
        </View>
        ) : (
          role === 'admin' ? (
            <AdminHomeScreen />
          ) : (
            <DrawerNavigator/>
          ) ) ) : (
            <LoginSignupScreenStackNav />
          ) 
        }
      </View>
    );
  }
