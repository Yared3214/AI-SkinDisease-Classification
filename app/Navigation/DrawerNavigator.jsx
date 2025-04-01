import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import NotificationScreen from '../Screens/NotificationsScreen';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Linking } from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          icon={<Entypo name="help" size={24} color="black" />}
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
        />
      </DrawerContentScrollView>
    );
  }

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator screenOptions={({route}) =>({
        drawerIcon: ({color, size}) => {
            let iconName
            if (route.name === 'home-tabs') {
                iconName = 'home'  
            } else {
                return <AntDesign name="notification" size={24} color="black" />
            }
            return<Entypo name={iconName} size={24} color="black" />
        },
        drawerActiveTintColor: '#6BA292'
      })}>
        <Drawer.Screen name="home-tabs" component={TabNavigation} options={{ title: 'AI SkinDisease Classification' }} />
        <Drawer.Screen name="notifications" component={NotificationScreen} />
      </Drawer.Navigator>
  );
}
