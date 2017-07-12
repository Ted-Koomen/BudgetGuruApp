import React, { Component } from 'react';
import { View,Text,Button,Platform, StyleSheet } from 'react-native';
import Table from 'react-native-simple-table'
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


class AllBudgets extends Component{
  render() {
    let budget = this.props.bill
    return (
      <View style={styles.headerContainer}>
        <Text style={style.welcome}>
        <Text style={{fontWeight: "bold", color:"#064F9C"}}>
          Name:
        </Text>
          {budget.budget_name+"\n"}
        <Text style={{fontWeight: "bold", color:"#064F9C"}}>
          Monthly Allowance:
        </Text>
          {budget.monthly_spend+"\n"}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
 welcome:{
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    fontSize:16,
  }
})

export default AllBudgets
