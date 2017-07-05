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
          {"$"+bill.amount+"\n"}
          {"Due in "+moment(bill.due_date).endOf('day').fromNow() +"\n"}
          {"Status: " + bill.status+"\n"}
        </Text>
      </View>
    );
  }
}

export default AllBills
