import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import colors from '../config/colors';
import  {BudgetList}  from '../components/ListItem';
import { PrimaryButton } from '../components/Buttons';

class Budgets extends Component {

  constructor(){
    super();
    this.state = {
      budgets: [],
      status: null
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/budgets")
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            budgets: [].concat(responseData),
            status: responseData.status
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

        {this.state.budgets === [] ? <Text>No budgets for this user</Text>: <FlatList
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

        {/* {this.state.status === true ? <PrimaryButton
          onPress={()=> this.handleSubmit()}
          label="Add Budget"}
        /> */}


    </View>
    );
  }
}

export default Budgets;
