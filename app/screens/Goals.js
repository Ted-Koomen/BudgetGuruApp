import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
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
    fetch("http://localhost:3000/goals/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            goals: responseData.goals,
            array: responseData.array,
            status: responseData.positive
          })
          console.log(this.state.goals)
        })
        .done();
  }

  handleRowPress = (item) => {
    this.props.navigation.navigate('GoalDetails', item)
  };

  handleSubmit = ()=>{
    this.props.navigation.navigate('GoalAdd')
  }

  render() {
    return (
      <View>
        {this.state.array == 0  ? <Text style={style.text2}>No goals for this user</Text>: <FlatList
          style={{backgroundColor: colors.background}}
          data={this.state.goals}
          renderItem={({item})=>
          <BudgetList itemName={item.goal_name} onPress={() => this.handleRowPress(item)}/>
        }
        keyExtractor={(item)=>item.id}
        /> }

        {this.state.status === true ? <ScrollView><PrimaryButton
          onPress={()=> this.handleSubmit()}
          label="Add Goal"
        /></ScrollView>: <Text style={style.text}>Sorry, adding a goal is currently disabled because your account is Negative.</Text> }

    </View>
    );
  }
}

const style = StyleSheet.create({
  text:{
    color:'#1D2B59',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    fontWeight:'bold'
  },
  text2:{
    color:'#2E3033',
    fontWeight:'bold',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    paddingBottom:20
  },
  subcontainer:{
    backgroundColor: '#F5FCFF',
    height: 1000

  },
})

export default Goals;
