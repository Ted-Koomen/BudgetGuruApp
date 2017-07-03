import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, Platform } from 'react-native';
import Bills from '../screens/Bills';
import BillDetails from '../screens/BillDetails';
import Me from '../screens/Me';
import NewBill from '../screens/NewBill';
import NewGoal from '../screens/NewGoal';
import Goals from '../screens/Goals';
import GoalDetails from '../screens/GoalDetails';
import Incomes from '../screens/Incomes';
import NewIncome from '../screens/Incomes';
import IncomeDetails from '../screens/IncomeDetails';
import EditIncome from '../screens/EditIncome';
import EditBill from '../screens/EditBill';
import EditGoal from '../screens/EditGoal';
export const IncomeStack = StackNavigator({
  Incomes:{
    screen: Incomes,
    navigationOptions:( { navigation }) => ({
      title: 'Incomes',
      headerLeft: <LeftDrawerButton />,
    }),
  },
  NewIncome:{
    screen:NewIncome,
    navigationOptions: ( { navigation }) => ({
      title: 'New Income',
      headerLeft: <LeftDrawerButton />
    }),
  },
  IncomeDetails:{
    screen: IncomeDetails,
    navigationOptions: ( { navigation }) => ({
      title: 'Income Details',
      headerLeft: <LeftDrawerButton />
    }),
  },
  EditIncome:{
    screen: EditIncome,
    navigationOptions: ( { navigation }) => ({
      title: 'Edit Income',
      headerLeft: <LeftDrawerButton />
    }),
  },
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
    EditGoal:{
      screen: EditGoal,
      navigationOptions:{
        title: 'Edit Goal'
      }
    }

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
        title: 'Bill Details',
      }
  },
  NewBill:{
    screen: NewBill,
    navigationOptions:{
      title: 'New Bill'
    },
  },
  EditBill:{
    screen: EditBill,
    navigationOptions:{
      title: "Edit Bill"
    }
  }
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
      tabBarIcon: ({ tintColor }) => <Icon name='ios-clipboard' size={35} color={tintColor}/>
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
