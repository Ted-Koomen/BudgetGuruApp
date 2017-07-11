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
      bills: []
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/bills/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        bills: [].concat(responseData)
      })
    })
    .done();
  }

  handleRowPress = (item) => {
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
          <ListItem bill_name={item.bill_name} onPress={() => this.handleRowPress(item)}/>
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
