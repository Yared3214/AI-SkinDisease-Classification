import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from '../Screens/ProductsDetailScreen';
import ProductsScreen from '../Screens/ProductsScreen'

export default function ProductsScreenStackNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="products" component={ProductsScreen} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="product-detail" component={ProductDetailsScreen}/>
    </Stack.Navigator>
  )}