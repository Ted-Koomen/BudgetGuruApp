import React, { Component } from 'react';
import Contacts from './screens/Contacts';
import { Tabs, Drawer } from './config/router.js';
import { Platform } from 'react-native';
import { Register } from './register';

const App = () =>{
  if (Platform.OS === 'ios'){
    return <Tabs />

  }
  return 
  <div>
    <Drawer />
    <Register />
  </div>
};

export default App;
