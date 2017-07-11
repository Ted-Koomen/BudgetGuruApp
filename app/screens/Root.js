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
    this.state={
      pressedStatus: false,
      pressedStatus2: false
    }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
  handleSubmit = (routeName) => { 
    this.props.navigation.navigate(routeName)
  }

    _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }
   _onHideUnderlay2(){
    this.setState({ pressStatus2: false });
  }
  _onShowUnderlay2(){
    this.setState({ pressStatus2: true });
  }



    render() {
        return (
          <View style={styles.container}>
            <View style={styles.subcontainer}>
              <Image resizeMode="contain" style={styles.logo} source={require('../components/Images/BudgetGURU-01.png')}/>
              <TouchableHighlight onPress={()=> this.handleSubmit('Register')} style={this.state.pressStatus2? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay2.bind(this)}
                onShowUnderlay={this._onShowUnderlay2.bind(this)}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=> this.handleSubmit('Login')} style={this.state.pressStatus? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay.bind(this)}
                onShowUnderlay={this._onShowUnderlay.bind(this)}>
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

  },
  pressedButton:{
    height: 50,
    backgroundColor: '#29593c',
    
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'

  }
});


export default Root;