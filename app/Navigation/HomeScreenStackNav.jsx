import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen'
import ResultScreen from '../Screens/ResultScreen'

export default function HomeScreenStackNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="analysis-result" component={ResultScreen}
      options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  )
}