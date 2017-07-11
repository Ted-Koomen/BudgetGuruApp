import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, AsyncStorage, FlatList, Text, View, Image } from 'react-native';
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
            <View style={styles.subcontainer}>
              <Image resizeMode="contain" style={styles.logo} source={require('../components/Images/BudgetGURU-01.png')}/>
              <TouchableHighlight onPress={()=> this.handleSubmit('Register')} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=> this.handleSubmit('Login')} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight>
            </View>
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
   
    paddingTop: 50,
   
    
  },
  subcontainer:{
    marginTop:10,
    borderRadius: 10

  },
  button: {
    height: 50,
    backgroundColor: '#2eba66',
    
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'
  },
  logo:{
    width: 600,
    height: 400
  },
  buttonText:{
    color:'#FFF',
    alignSelf:'center',
    fontSize: 18,

  }
});


export default Root;