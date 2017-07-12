import React, { Component } from 'react';
import { View,Text,Button,Platform, StyleSheet } from 'react-native';
import Table from 'react-native-simple-table'
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


class AllIncomes extends Component{
  render() {
    let income = this.props.income
    return (
      <View style={styles.container}>
        <Text style={{fontWeight:"bold",color: "#064F9C"}}>
          {"Source: " + income.source+"\n"}
          {"Post Tax: " + income.post_tax_amount+"\n"}
          {"Fixed: " + income.fixed+"\n"}
          {"Pay Schedule: " + income.pay_schedule+"\n"}
        </Text>
      </View>
    );
  }
}
export default AllIncomes;
