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
      <View style={styles.container}>
        <Text style={{fontWeight:"bold",color: "#064F9C"}}>
          {budget.budget_name+"\n"}
          {budget.monthly_spend+"\n"}
        </Text>
      </View>
    );
  }
}

export default AllBudgets
