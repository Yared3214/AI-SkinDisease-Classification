import { createStackNavigator } from '@react-navigation/stack';
import EducationalResourceScreen from '../Screens/EducationalResourceScreen'
import ResourceDetailScreen from '../Screens/ResourceDetailScreen';

export default function EducationalResourceScreenStackNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="resources" component={EducationalResourceScreen} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="resource-detail" component={ResourceDetailScreen}/>
    </Stack.Navigator>
  )
}