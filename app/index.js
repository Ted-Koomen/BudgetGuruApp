import React, { Component } from 'react';
import Contacts from './screens/Contacts';
import { Tabs, Drawer } from './config/router.js'
import { Platform, View } from 'react-native';
import Root from './screens/Root';

class App extends React.Component {
  render () {
    let logged_in = true;
    let test = logged_in ? <Tabs /> : <Root />
    return (
      test
    )
  }
}


export default App;
