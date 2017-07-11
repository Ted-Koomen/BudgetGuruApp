import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  AlertIOS,
  Text,
  ScrollView,
  Dimensions,
  Platform, 
  View
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator }from 'react-navigation';
import Root from './Root';

class Settings extends Component{
    onUpdatePressed(){
      this.props.navigation.navigate('Update');
    }

    onLogoutPressed(){
        AlertIOS.alert(
          "You have successfully been logged out"
        )
      this.props.navigation.navigate('Root');
    }

    render(){
        return(
            <View style={styles.container}>
            <TouchableHighlight onPress={this.onUpdatePressed.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Update Profile
            </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.onLogoutPressed.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Logout
            </Text>
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
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    width: Platform.OS == 'ios' ? window.width - 20 : 375
  },
  button: {
    height: 50,
    backgroundColor: '#064F9C',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Settings;