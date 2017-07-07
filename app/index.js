import React, { Component } from 'react';
import Contacts from './screens/Contacts';
import { Drawer, RootStack, LeftDrawerButton } from './config/router.js'
import {
  Platform,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  AlertIOS,
  Text
} from 'react-native';
import Root from './screens/Root';
import { StackNavigator } from 'react-navigation';

class App extends Component {

  render () {
      return ( <RootStack /> )
  }
}


export default App;
