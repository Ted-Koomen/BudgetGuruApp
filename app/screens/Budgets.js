import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import colors from '../config/colors';
import  {BudgetList}  from '../components/ListItem';
import { PrimaryButton,styles } from '../components/Buttons';

class Budgets extends Component {

  constructor(){
    super();
    this.state = {
      budgets: [],
      status: null,
      array:null
    }
  }

  refresh(){
    fetch("https://budgetguru.herokuapp.com/budgets/"+global.ACCESS_TOKEN)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          budgets: responseData.budgets,
          status: responseData.status,
          array:responseData.array
      })
    })
  }

  componentWillMount(){
    fetch("https://budgetguru.herokuapp.com/budgets/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        budgets: responseData.budgets,
        status: responseData.status,
        array:responseData.array
      })
      console.log(this.state.budgets)
    })
  }

  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

  _onHideUnderlay2(){
    this.setState({ pressStatus2: false });
  }
  _onShowUnderlay2(){
    this.setState({ pressStatus2: true });
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
        {this.state.array == 0  ?
          <Text style={style.welcome}>No budgets for this user.</Text>: <FlatList
          style={{backgroundColor: colors.background}}
          data={this.state.budgets}
          renderItem={({item})=>
          <BudgetList itemName={item.budget_name} onPress={() => this.handleRowPress(item)}/>
        }
        keyExtractor={(item)=>item.email}
        /> }


        {this.state.status === true ? <ScrollView>
          <TouchableHighlight onPress={this.refresh.bind(this)} style={this.state.pressStatus? styles.pressedButton : styles.button}
            onHideUnderlay={this._onHideUnderlay.bind(this)}
            onShowUnderlay={this._onShowUnderlay.bind(this)}>
            <Text style={styles.primaryButtonText}
              onPress={()=> this.handleSubmit()}>
              Add Budget
            </Text>
          </TouchableHighlight>
        </ScrollView>: <Text style={styles.text}>Sorry, adding a budget is currently disabled because your account is either negative or at does not have sufficient funds.</Text> }

        <TouchableHighlight onPress={this.refresh.bind(this)} style={this.state.pressStatus2? styles.pressedButton : styles.button}
          onHideUnderlay={this._onHideUnderlay2.bind(this)}
          onShowUnderlay={this._onShowUnderlay2.bind(this)}>
          <Text style={styles.primaryButtonText}>
            Refresh
          </Text>
        </TouchableHighlight>
    </View>
    );
  }
}

const style = StyleSheet.create({
 welcome:{
    paddingTop: 20,
    paddingBottom: 10, 
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    fontSize:16,
  }
})


export default Budgets;
