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
        <Text style={styles.welcome}>
          {budget.monthly_spend+"\n"}
          {budget.goal}
        </Text>
      </View>
    );
  }
}

export default AllBudgets
