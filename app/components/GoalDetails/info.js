import React, { Component } from 'react';
import { View,Text,Button,Platform, StyleSheet } from 'react-native';
import Table from 'react-native-simple-table'
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


class AllGoals extends Component{
  render() {
    let goal = this.props.goal
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {"Amount saved: " + goal.amount_saved+"\n"}
          {"Time Frame: " + moment(goal.timeframe.toString()).format('ll') +"\n"}
          {"Achieved: " + goal.achieved+"\n"}
          {"Total: " + goal.total+"\n"}
        </Text>
      </View>
    );
  }
}
export default AllGoals;
