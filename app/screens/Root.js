import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, AsyncStorage, FlatList, Text, View } from 'react-native';
import colors from '../config/colors';
import { Tabs, Drawer, RootStack } from '../config/router.js'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Register from './Register';
import Login from './Login';


class Root extends Component {
    constructor(props){
    super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
  handleSubmit = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Budget Guru</Text>
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
    backgroundColor: '#064F9C',
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