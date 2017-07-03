import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, Platform } from 'react-native';
import Contacts from '../screens/Contacts';
import Details from '../screens/Details';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me'

export const ContactsStack = StackNavigator({
  Contacts:{
      screen: Contacts,
      navigationOptions:( { navigation }) => ({
        title: 'Contacts',
        headerLeft: <LeftDrawerButton />,
      }),
  },
  Details:{
      screen: Details,
      navigationOptions:{
        title: 'Details',
      }
  },
});

const LeftDrawerButton = ({ navigation }) => {
  if (Platform.OS === 'android'){
    return <Button title="Open" onPress={()=> navigation.navigate('DrawerOpen')} />
  }
  return null;
}

export const NewContactStack = StackNavigator({
  NewContact: {
    screen: NewContact,
    navigationOptions:( { navigation }) => ({
      title: 'New Contact',
      headerLeft: <Button title="Open" onPress={() => navigation.navigate('DrawerOpen')} />
    }),

  },
})

export const MeStack = StackNavigator({
  Me:{
    screen: Me,
    navigationOptions:( { navigation }) => ({
      title: 'Me',
      headerLeft: <Button title="Open" onPress={() => navigation.navigate('DrawerOpen')} />
    }),
  },
})
export const Tabs = TabNavigator({
  Contacts:{
    screen: ContactsStack,
    navigationOptions:{
      tabBarLabel:'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-add' size={35} color={tintColor}/>
    },
  },
  NewContact:{
    screen: NewContactStack,
    navigationOptions:{
      tabBarLabel:'New Contact',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-list' size={35} color={tintColor}/>
    },
  },
  Me:{
    screen: MeStack,
    navigationOptions:{
      tabBarLabel:'Me',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-contact' size={35} color={tintColor}/>
    },
  }
});

export const Drawer = DrawerNavigator({
  Contacts:{
      screen: ContactsStack,
      navigationOptions:{
        drawerLabel: 'Contacts'
      },
  },
  NewContact:{
    screen: NewContactStack,
    navigationOptions:{
      drawerLabel: 'New Conctact'
    },
  },

  Me:{
    screen: MeStack,
    navigationOptions:{
      drawerLabel: 'Me'
    },
  },

})
