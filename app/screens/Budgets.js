import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {contacts} from  '../config/data';
import colors from '../config/colors';
import  {BudgetList}  from '../components/ListItem';
import { PrimaryButton } from '../components/Buttons';

class Budgets extends Component {

  constructor(){
    super();
    this.state = {
      budgets: [],
    }
    this.onLoad()
  }

  onLoad(){
    fetch("https://tranquil-taiga-66066.herokuapp.com/budgets")
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            budgets: [].concat(responseData)
          })
          console.log(this.state.budgets)
        })
        .done();
  }

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
          data={this.state.budgets}
          renderItem={({item})=>
          <BudgetList budget={item.budget_name} onPress={() => this.handleRowPress(item)}/>
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
