import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Platform } from 'react-native';
import Bills from '../screens/Bills';
import Contacts from '../screens/Contacts';
import BillDetails from '../screens/BillDetails';
import Me from '../screens/Me';
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


export const RootStack = StackNavigator({
  Root: {
    screen: Root,
    navigationOptions:( { navigation } ) => ({
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
    Me:{
    screen: Me,
    navigationOptions:{
      tabBarLabel:'Me',
      tabBarIcon: ({ tintColor }) => <Icon name='ios-contact' size={35} color={tintColor}/>
    },
  }
});

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

