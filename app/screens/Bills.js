import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {contacts} from  '../config/data';
import colors from '../config/colors';
import { ListItem } from '../components/ListItem'
import { PrimaryButton } from '../components/Buttons'

class Bills extends Component {

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
        data={contacts}
        renderItem={({item})=>
        <ListItem contact={item} onPress={() => this.handleRowPress(item)}/>
      }
      keyExtractor={(item)=>item.email}
      />
      <PrimaryButton
        onPress={()=> this.handleSubmit()}
        label="Add Bill"
      />
      <View>
        <PrimaryButton
          onPress={()=> this.handleDelete()}
          label="Delete Bill"
        />
      </View>
    </View>
    );
  }
}

export default Bills
