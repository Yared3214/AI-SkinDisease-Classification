import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import ProductsScreen from '../Screens/ProductsScreen'
import EducationalResourceScreenStackNav from './EducationalResourceScreenStackNav';
import HomeScreenStackNav from './HomeScreenStackNav'
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{headerShown:false}}>
              <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" size={size} color={color} />
                ),
              }} name="Home" component={HomeScreenStackNav} />
              <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="book-outline" size={size} color={color} />
                ),
              }} name="Resources" component={EducationalResourceScreenStackNav} />
              <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cart-outline" size={size} color={color} />
                ),
              }} name="Products" component={ProductsScreen} />
              <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-outline" size={size} color={color} />
                )
                
              }} name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
    )}

