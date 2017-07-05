import React, { Component } from 'react';
import { View,Text,Button } from 'react-native';
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


class AllBills extends Component{
  constructor(){
    super();
    this.state = {
      bills: []
    }
    this.onLoad()
  }

  onLoad(){
    fetch("https://enigmatic-chamber-19729.herokuapp.com/bills/all")
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            bills: [].concat(responseData)
          })
          console.log(this.state.bills)
            // AlertIOS.alert(
            //      this.state.bills
            // )
        })
        .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.bills.map((bill,idx)=>
          bill.bill_name +bill.amount  +bill.due_date   +bill.status
        )}
        </Text>
      </View>
    );
  }
}

export default AllBills
