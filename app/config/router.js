import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, Platform } from 'react-native';
import Bills from '../screens/Bills';
import Contacts from '../screens/Contacts'
import BillDetails from '../screens/BillDetails';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me'
import NewBill from '../screens/NewBill'
import NewGoal from '../screens/NewGoal'
import Goals from '../screens/Goals'
import GoalDetails from '../screens/GoalDetails'
import Incomes from '../screens/Incomes'

export const ContactsStack = StackNavigator({
  Bills:{
      screen: Bills,
      navigationOptions:( { navigation }) => ({
        title: 'Bills',
        headerLeft: <LeftDrawerButton />,
      }),
  },
  Details:{
      screen: BillDetails,
      navigationOptions:{
        title: 'Details',
      }
  },
});

export const IncomeStack = StackNavigator({
  Incomes:{
    screen: Incomes,
    navigationOptions:( { navigation }) => ({
      title: 'Incomes',
      headerLeft: <LeftDrawerButton />,
    })
  }
})

export const GoalsStack = StackNavigator({
  Goals:{
    screen: Goals,
    navigationOptions:( { navigation } ) => ({
      title: 'Goals',
      headerLeft: <LeftDrawerButton />,
    }),
    NewGoal:{
      screen:NewGoal,
      navigationOptions:{
        title:'New Goal',
      },
    },
    GoalDetails:{
      screen:GoalDetails,
      navigationOptions:{
        title:'Details',
      },
    },
  },
})



const LeftDrawerButton = ({ navigation }) => {
  if (Platform.OS === 'android'){
    return <Button title="Open" onPress={()=> navigation.navigate('DrawerOpen')} />
  }
  return null;
}

export const NewBillStack = StackNavigator({
  NewBill:{
    screen: NewBill,
    navigationOptions:( { navigation }) => ({
      title: 'New Bill',
      headerLeft: <Button title="Open" onPress={() => navigation.navigate('DrawerOpen')} />
    })
  },
})

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
  Bills:{
    screen: ContactsStack,
    navigationOptions:{
      tabBarLabel:'Bills',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-add' size={35} color={tintColor}/>
    },
  },
  Goals:{
    screen: GoalsStack,
    navigationOptions:{
      title: 'Goals',
      tabBarLabel:'Goals',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-list' size={35} color={tintColor}/>
    },
  },
  Me:{
    screen: MeStack,
    navigationOptions:{
      tabBarLabel:'Me',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-contact' size={35} color={tintColor}/>
    },
  },
  Incomes:{
    screen: IncomeStack,
    navigationOptions:{
      tabBarLabel:'Incomes',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-contact' size={35} color={tintColor}/>
    },
  },

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
