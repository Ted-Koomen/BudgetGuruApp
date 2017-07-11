import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native';
import {contacts} from  '../config/data';
import colors from '../config/colors';
import { BudgetList } from '../components/ListItem'
import { PrimaryButton,styles } from '../components/Buttons';


class Incomes extends Component {

    constructor(){
      super();
      this.state = {
        incomes: [],
      }
    }

    componentWillMount(){
      fetch("http://localhost:3000/incomes/"+global.ACCESS_TOKEN)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          incomes: [].concat(responseData)
        })
        console.log(this.state.budgets)
      })
      .done();
    }

    handleRowPress = (item) => {
      this.props.navigation.navigate('IncomeDetails', item)
    };

    handleSubmit = ()=>{
      this.props.navigation.navigate('IncomeNew')
    }

    render() {
      return (
        <View>
          <FlatList
            style={{backgroundColor: colors.background}}
            data={this.state.incomes}
            renderItem={({item})=>
            <BudgetList itemName={item.source} onPress={() => this.handleRowPress(item)}/>
          }
          keyExtractor={(item)=>item.id}
          />
          <PrimaryButton
            onPress={()=> this.handleSubmit()}
            label="Add Income"
          />
      </View>
      );
    }
  }

export default Incomes
