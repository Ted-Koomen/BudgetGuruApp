import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import colors from '../config/colors';
import  { BudgetList }  from '../components/ListItem';
import { PrimaryButton,styles } from '../components/Buttons';

class Goals extends Component {

  constructor(){
    super();
    this.state = {
      goals: [],
      array: null,
      status: null
    }
  }

  componentWillMount(){
    fetch("https://budgetguru.herokuapp.com/goals/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            goals: responseData.goals,
            array: responseData.array,
            status: responseData.status
          })
          console.log(this.state.goals)
        })
        .done();
  }

  handleRowPress = (item) => {
    this.props.navigation.navigate('GoalDetails', item)
  };

  refresh(){
    fetch("https://budgetguru.herokuapp.com/goals/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            goals: responseData.goals,
            array: responseData.array,
            status: responseData.status
          })
          console.log(this.state.goals)
        })
    .done();
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


  render() {
    return (
      <View>

        {this.state.array == 0  ? <Text style={style.welcome}>No goals for this user.</Text>: <FlatList
          style={{backgroundColor: colors.background}}
          data={this.state.goals}
          renderItem={({item})=>
          <BudgetList itemName={item.goal_name} onPress={() => this.handleRowPress(item)}/>
        }
        keyExtractor={(item)=>item.id}
        /> }

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
  text:{
    color:'#FFF',
    fontSize: 18,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  text2:{
    color:'#2E3033',
    fontWeight:'bold',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    paddingBottom:20,
    paddingTop: 20
  },
  subcontainer:{
    backgroundColor: '#F5FCFF',
    height: 1000
  },
   welcome:{
    paddingTop: 20,
    paddingBottom: 10, 
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    fontSize:16,
  }
})

export default Goals;
