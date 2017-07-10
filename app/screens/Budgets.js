import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import colors from '../config/colors';
import  {BudgetList}  from '../components/ListItem';
import { PrimaryButton } from '../components/Buttons';

class Budgets extends Component {

  constructor(){
    super();
    this.state = {
      budgets: [],
      status: null,
      array:null
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/budgets")
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            budgets: [].concat(responseData),
            status: responseData.status,
            array:responseData.array
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
        {this.state.array == 0  ? <Text>No budgets for this user</Text>: <FlatList
          style={{backgroundColor: colors.background}}
          data={this.state.budgets}
          renderItem={({item})=>
          <BudgetList itemName={item.budget_name} onPress={() => this.handleRowPress(item)}/>
        }
        keyExtractor={(item)=>item.email}
        /> }

        {this.state.status === true ? <ScrollView><PrimaryButton
          onPress={()=> this.handleSubmit()}
          label="Add Budget"
        /></ScrollView>: <Text>Sorry, adding a budget is currently disabled because your account is Negative.</Text> }
    </View>
    );
  }
}

export default Budgets;
