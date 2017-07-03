import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Platform } from 'react-native';
import Bills from '../screens/Bills';
import Contacts from '../screens/Contacts';
import BillDetails from '../screens/BillDetails';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me';
import NewBill from '../screens/NewBill';
import NewGoal from '../screens/NewGoal';
import Goals from '../screens/Goals';
import GoalDetails from '../screens/GoalDetails';
import Incomes from '../screens/Incomes';
import Root from '../screens/Root'


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
  },
    GoalAdd:{
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

})



export const BillsStack = StackNavigator({
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
  NewBill:{
    screen: NewBill,
    navigationOptions:{
      title: 'New Bill'
    },
  },
});



const LeftDrawerButton = ({ navigation }) => {
  if (Platform.OS === 'android'){
    return <Button title="Open" onPress={()=> navigation.navigate('DrawerOpen')} />
  }
  return null;
}

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
    screen: BillsStack,
    navigationOptions:{
      tabBarLabel:'Bills',
      tabBarIcon: ({ tintColor }) => <Icon name='ion-clipboard' size={35} color={tintColor}/>
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

// export const Drawer = DrawerNavigator({
//   Contacts:{
//       screen: ContactsStack,
//       navigationOptions:{
//         drawerLabel: 'Contacts'
//       },
//   },
//   NewContact:{
//     screen: NewContactStack,
//     navigationOptions:{
//       drawerLabel: 'New Conctact'
//     },
//   },
//
//   Me:{
//     screen: MeStack,
//     navigationOptions:{
//       drawerLabel: 'Me'
//     },
//   },
//
// })
