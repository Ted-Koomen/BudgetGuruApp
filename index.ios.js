/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { 
  Component,
  Navigator,
  Text,
  View } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Root from './app/screens/Root';
import Home from './app/screens/Home';
import Update from './app/screens/Update';
import App from '.screens/app/index';

class MyApp extends Component {

  renderScene(route, navigator) {
    console.log(route);
    if(route.name == 'root') {
      return <Root navigator={navigator} />
    }
    if(route.name == 'register') {
      return <Register navigator={navigator} />
    }
    if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
    if(route.name == 'home') {
      return <Home navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'update') {
      return <Update navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'root'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});



AppRegistry.registerComponent('MyApp', () => App);
