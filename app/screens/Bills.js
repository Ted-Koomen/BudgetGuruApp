import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {bills} from  '../config/data';
import colors from '../config/colors';
import { ListItem } from '../components/ListItem'
import { PrimaryButton } from '../components/Buttons'
import axios from 'axios'


class Bills extends Component {

  constructor(){
    super();
    this.state= {
      username:"hec",
    }
    console.log(bills)
    console.log("here")
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
        data={bills}
        renderItem={({item})=>
        <ListItem contact={item} user_first_name={this.state.username} onPress={() => this.handleRowPress(item)}/>
      }
      keyExtractor={(item)=>item.email}
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
