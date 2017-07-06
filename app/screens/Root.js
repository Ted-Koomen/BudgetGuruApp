import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  FlatList,
  Text,
  View
} from 'react-native';
import colors from '../config/colors';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Register from './Register';
import Login from './Login';
import { ListItem } from '../components/ListItem';
import { PrimaryButton } from '../components/Buttons';
// import { Tabs, Drawer, RootStack } from '../config/router.js'


const ACCESS_TOKEN = 'access_token';


class Root extends Component {
    constructor(props){
    super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
  handleSubmit = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  

  //   componentWillMount() {
  //   this.getToken();
  // }

  //   async getToken() {
  //   try {
  //     let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     if(!accessToken) {
  //         console.log("Token not set");
  //     } else {
  //         this.verifyToken(accessToken)
  //     }
  //   } catch(error) {
  //       console.log("Something went wrong");
  //   }
  // }
  // //If token is verified we will redirect the user to the home page
  // async verifyToken(token) {
  //   let accessToken = token

  //   try {
  //     let response = await fetch('https://localhost:8080/api/verify'+accessToken);
  //     let res = await response.text();
  //     if (response.status >= 200 && response.status < 300) {
  //       //Verified token means user is logged in so we redirect him to home.
  //       this.navigate('home');
  //     } else {
  //         //Handle error
  //         let error = res;
  //         throw error;
  //     }
  //   } catch(error) {
  //       console.log("error response: " + error);
  //   }
  // }
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Budget Guru </Text>
        <TouchableHighlight onPress={()=> this.handleSubmit('Register')} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=> this.handleSubmit('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 180
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  }
});


export default Root;