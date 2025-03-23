import { Text, View } from "react-native";
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import TabNavigation from "./Navigation/TabNavigation";
import SignupScreen from './Screens/SignupScreen'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <HomeScreen/> */}
      {/* <LoginScreen/> */}
      {/* <SignupScreen/> */}
      <TabNavigation/>
    </View>
  );
}
