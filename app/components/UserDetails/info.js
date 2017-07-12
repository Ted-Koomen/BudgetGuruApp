import React, { Component } from 'react';
import { View,Text,Button,Platform, StyleSheet } from 'react-native';
import Table from 'react-native-simple-table'
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


class AllBills extends Component{
  render() {
    let bill = this.props.bill
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Text style={{fontWeight: "bold", color:"#064F9C"}}>
          Total: 
          </Text>
          {" "+"$"+bill.amount+"\n"}
           <Text style={{fontWeight: "bold", color:"#064F9C"}}>
          Due:
          </Text>
          {" "+bill.due_date + " of every month."+ "\n"}
           <Text style={{fontWeight: "bold", color:"#064F9C"}}>
          Status:
          </Text>
          {" "+bill.status.charAt(0).toUpperCase() + bill.status.slice(1)+"."+"\n"}
        </Text>
      </View>
    );
  }
}

export default AllBills
