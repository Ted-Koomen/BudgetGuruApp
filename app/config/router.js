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
import Incomes from '../screens/Incomes';
import NewIncome from '../screens/NewIncome';
import IncomeDetails from '../screens/IncomeDetails';
import EditIncome from '../screens/EditIncome';
import EditBill from '../screens/EditBill';
import EditGoal from '../screens/EditGoal';
import Budgets from '../screens/Budgets';
import BudgetDetails from '../screens/BudgetDetails';
import Goals from '../screens/Goals';
import GoalDetails from '../screens/GoalDetails';
import EditBudget from '../screens/EditBudget';
import AddBudget from '../screens/AddBudget';
import Root from '../screens/Root';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Update from '../screens/Update';
import Settings from '../screens/Settings';



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
      title: 'New Bill',
    },
  },
  EditBill:{
    screen: EditBill,
    navigationOptions:{
      title: "Edit Bill",
    }
  }
});

export const SettingsStack = StackNavigator({
   Profile:{
    screen: Profile,
    navigationOptions:( { navigation }) => ({
      title: 'Profile',
    }),
  },
  Settings:{
    screen: Settings,
    navigationOptions:{
      title: 'Settings'
    },
  },
  Update:{
    screen: Update,
    navigationOptions:{
    title: 'Update'
    },
  }
})


export const MeStack = StackNavigator({
  Profile:{
    screen: Profile,
    navigationOptions:( { navigation }) => ({
      title: 'Profile',
    }),
  },
  Settings:{
    screen: SettingsStack,
    headerMode: 'screen',
    navigationOptions:{
    header: null,
    title: 'Settings'
    },
  }
})

export const Tabs = TabNavigator({
    Me:{
    screen: SettingsStack,
    navigationOptions:{
      tabBarLabel: Platform.OS == 'ios' ? 'Profile' : 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-contact' size={35} color={"#007AFF"}/>
    },
  },
  Bills:{
    screen: BillsStack,
    navigationOptions:{
      tabBarLabel:'Bills',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-paper' size={35} color={"#f95316"}/>
    },
  },
  Budgets:{
    screen: BudgetStack,
    navigationOptions:{
      tabBarLabel: Platform.OS == 'ios' ? 'Budgets' : 'Budget',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-calculator' size={35} color={"#7309ed"}/>
    },
  },
  Goals:{
    screen: GoalsStack,
    navigationOptions:{
      tabBarLabel:'Goals',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-trophy' size={35} color={"#fcbb16"}/>
    },
  },
  Incomes:{
    screen: IncomeStack,
    navigationOptions:{
      tabBarLabel: Platform.OS == 'ios' ? 'Incomes' : 'Income',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-cash' size={35} color={"#10bc0d"}/>
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