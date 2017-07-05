import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {contacts} from  '../config/data';
import colors from '../config/colors';
import { ListItem } from '../components/ListItem';
import { PrimaryButton } from '../components/Buttons';
class Budgets extends Component {

  handleRowPress = (item) => {
    this.props.navigation.navigate('BudgetDetails', item)
  };

  handleSubmit = ()=>{
    this.props.navigation.navigate('BudgetAdd')
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
          label="Add Budget"
        />
    </View>
    );
  }
}

export default Budgets;
