import React, { Component } from 'react';
import Contacts from './screens/Contacts';
import { Tabs, Drawer, RootStack, LeftDrawerButton } from './config/router.js'
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
    constructor(props){
    super(props);

    this.state = {
      loggedIn: "",
      showProgress: false,
      accessToken: "",
    }
  // }
  // componentWillMount() {
  //   this.getToken();
  // }
  // async getToken() {
  //   try {
  //     let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     if(!accessToken) {
  //         this.redirect('login');
  //     } else {
  //         this.setState({accessToken: accessToken})
  //     }
  //   } catch(error) {
  //       console.log("Something went wrong");
  //       this.redirect('login');
  //   }
  // }
  // async deleteToken() {
  //   try {
  //       await AsyncStorage.removeItem(ACCESS_TOKEN)
  //       this.redirect('root');
  //   } catch(error) {
  //       console.log("Something went wrong");
  //   }
  // }
  // redirect(routeName){
  //   this.props.navigator.push({
  //     name: routeName,
  //     passProps: {
  //       accessToken: this.state.accessToken
  //     }
  //   });
  // }
  // onLogout(){
  //   this.setState({showProgress: true})
  //   this.deleteToken();
  // }

  // confirmDelete() {
  //   AlertIOS.alert("Are you sure?", "This action cannot be undone", [
  //     {text: 'Cancel'}, {text: 'Delete', onPress: () => this.onDelete()}
  //   ]);
  // }

  // async onDelete(){
  //   let access_token = this.state.accessToken
  //   try {
  //     let response = await fetch('https://localhost:8080/api/users'+access_token,{
  //                             method: 'DELETE',
  //                           });
  //       let res = await response.text();
  //       if (response.status >= 200 && response.status < 300) {
  //         console.log("success sir: " + res)
  //         this.redirect('root');
  //       } else {
  //         let error = res;
  //         throw error;
  //       }
  //   } catch(error) {
  //       console.log("error: " + error)
  //   }
  }
  render () {
    let loggedIn = true;
    let test = loggedIn ? <Tabs /> : <RootStack />
    return (
      test
    )
  }
}


export default App;
