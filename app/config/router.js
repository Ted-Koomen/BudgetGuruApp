import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Platform, StatusBar } from 'react-native';
import Bills from '../screens/Bills';
import Contacts from '../screens/Contacts';
import BillDetails from '../screens/BillDetails';
import Profile from '../screens/Profile';
import NewBill from '../screens/NewBill';
import NewGoal from '../screens/NewGoal';
import Goals from '../screens/Goals';
import GoalDetails from '../screens/GoalDetails';
import Incomes from '../screens/Incomes';
import NewIncome from '../screens/NewIncome';
import IncomeDetails from '../screens/IncomeDetails';
import EditIncome from '../screens/EditIncome';
import EditBill from '../screens/EditBill';
import EditGoal from '../screens/EditGoal';
import Budgets from '../screens/Budgets';
import BudgetDetails from '../screens/BudgetDetails';
import EditBudget from '../screens/EditBudget';
import AddBudget from '../screens/AddBudget';
import Root from '../screens/Root';
import Login from '../screens/Login';
import Register from '../screens/Register';


const LeftDrawerButton = ({ navigation }) => {
  if (Platform.OS === 'android'){
    return <Button title="Open" onPress={()=> navigation.navigate('DrawerOpen')} />
  }
  return null;
}

export const IncomeStack = StackNavigator({
  Incomes:{
    screen: Incomes,
    navigationOptions:{
      title: 'Incomes',
    },
  },
  IncomeNew:{
    screen: NewIncome,
    navigationOptions: {
      title: 'New Income',
    },
  },
  IncomeDetails:{
    screen: IncomeDetails,
    navigationOptions: {
      title: 'Income Details',
    },
  },
  EditIncome:{
    screen: EditIncome,
    navigationOptions:{
      title: 'Edit Income',
      headerLeft: <LeftDrawerButton />
    },
  },
})

export const GoalsStack = StackNavigator({
  Goals:{
    screen: Goals,
    navigationOptions:( { navigation } ) => ({
      title: 'Goals',
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

export const BudgetStack = StackNavigator({
  Budgets:{
    screen: Budgets,
    navigationOptions:( { navigation }) => ({
      title: 'Budgets',
      headerLeft: <LeftDrawerButton />,
    }),
  },
  BudgetDetails:{
    screen: BudgetDetails,
    navigationOptions:{
      title: 'Budget Details',
    },
  },
  BudgetEdit:{
    screen: EditBudget,
    navigationOptions:{
      title: 'Edit Budget',
    },
  },
  BudgetAdd:{
    screen: AddBudget,
    navigationOptions:{
      title: "Add Budget",
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




export const MeStack = StackNavigator({
 Profile:{
    screen: Profile,
    navigationOptions:( { navigation }) => ({
      title: 'Profile'
    }),
  },
})

export const Tabs = TabNavigator({
    Me:{
    screen: MeStack,
    navigationOptions:{
      tabBarLabel:'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-contact' size={35} color={tintColor}/>
    },
  },
  Bills:{
    screen: BillsStack,
    navigationOptions:{
      tabBarLabel:'Bills',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-clipboard' size={35} color={tintColor}/>
    },
  },
  Budgets:{
    screen: BudgetStack,
    navigationOptions:{
      tabBarLabel: "Budgets",
      tabBarIcon: ({ tintColor }) => <Icon name='ios-clipboard' size={35} color={tintColor}/>
    },
  },
  Goals:{
    screen: GoalsStack,
    navigationOptions:{
      tabBarLabel:'Goals',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-list' size={35} color={tintColor}/>
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

export const RootStack = StackNavigator({
  Root: {
    screen: Root,
    navigationOptions:( { navigation } ) => ({
    header: null,
    title: 'Budget Guru'
    })
  },
  Login:{
      screen: Login,
      navigationOptions:{
        title: 'Login'
      }
  },
  Register:{
      screen: Register,
      navigationOptions:{
        title: 'Register'
    }
  },
  Home:{
    screen: Tabs,
    headerMode: 'screen',
    navigationOptions:( { navigation } ) => ({
    header: null,
    title: 'Budget Guru'
    })

  }
});

