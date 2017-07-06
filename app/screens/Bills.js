import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {bills} from  '../config/data';
import colors from '../config/colors';
import { ListItem } from '../components/ListItem';
import { PrimaryButton } from '../components/Buttons';
import axios from 'axios';


class Bills extends Component {


  constructor(){
    super();
    this.state = {
      bills: [],
      user_first_name:"hector"
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

  component

  handleRowPress = (item) => {
    // debugger
    //clicking on a bill in the bill index will route to bill show through details
    this.props.navigation.navigate('Details', item)
  };

  handleSubmit = () => {
    this.props.navigation.navigate('NewBill')
  }

  render() {
    return (
      <View>
      <FlatList
        style={{backgroundColor: colors.background}}
        data={this.state.bills}
        renderItem={({item})=>
          <ListItem contact={item} user_first_name={item.bill_name} onPress={() => this.handleRowPress(item)}/>
        }
        keyExtractor={(item)=>item.id}
      />
      <PrimaryButton
        onPress={()=> this.handleSubmit()}
        label="Add Bill"
      />

    </View>
    );
  }
}

export default Bills
