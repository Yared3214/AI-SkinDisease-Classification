import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen'
import ExpertSignupScreen from '../Screens/ExpertSignupScreen'

export default function LoginSignupScreenStackNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="signup" component={SignupScreen}
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="forgot-pass" component={ForgotPasswordScreen}
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="expert-signup" component={ExpertSignupScreen}
      options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  )
}