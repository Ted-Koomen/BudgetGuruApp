import React, { Component } from 'react';
import { View,Text,Button,Platform, StyleSheet } from 'react-native';
import Table from 'react-native-simple-table'
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


class AllBudgets extends Component{
  render() {
    let income = this.props.income
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {income.monthly_spend+"\n"}
          {income.goal}
        </Text>
      </View>
    );
  }
}

export default AllBudgets
