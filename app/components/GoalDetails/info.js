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
          <Text style={{fontWeight:"bold",color: "#064F9C"}}>
            Amount Saved:
          </Text>
          {" " + goal.amount_saved+"\n"}
          <Text style={{fontWeight:"bold",color: "#064F9C"}}>
            Time Frame:
          </Text>
          {" " + goal.timeframe+"\n"}
          <Text style={{fontWeight:"bold",color: "#064F9C"}}>
            Achieved: 
          </Text>
          {" " + goal.achieved+"\n"}
          <Text style={{fontWeight:"bold",color: "#064F9C"}}>
            Total: 
          </Text>
          {" " + goal.total+"\n"}
        </Text>
      </View>
    );
  }
}
export default AllGoals;

const style = StyleSheet.create({
  container: {
    paddingTop: 10
  }
})
