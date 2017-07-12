import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, AlertIOS } from 'react-native';
import {Info } from '../components/BudgetDetails';
import colors from '../config/colors';
import {PrimaryButton} from '../components/Buttons'

//want amount and name of bill in this screen
class BudgetDetails extends Component{

     constructor(){
       super()
     }

     handleSubmit = () => {
       let budget = this.props.navigation.state.params
       this.props.navigation.navigate('BudgetEdit',budget)
     }

     addGoal = () => {
       let budget = this.props.navigation.state.params
       this.props.navigation.navigate('GoalAdd',budget)
     }

     handleDelete = () => {
       fetch("https://budgetguru.herokuapp.com/budgets", {
         method: "DELETE",
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           id: this.props.navigation.state.params.id,
         })
       })
         .then((response) => response.json())
         .then((responseData) => {
             AlertIOS.alert(
                 "Successfully deleted"
             )
             this.props.navigation.navigate('Budgets')
         })
       .done();
     }

    render(){
      const budget = this.props.navigation.state.params;


        return(

            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* <Header {...budget} /> */}
                <Info bill={budget}/>


              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Edit Budget"
              />

              <PrimaryButton
                onPress={()=> this.handleDelete()}
                label="Delete Budget"
              />

              <PrimaryButton
                onPress={()=> this.addGoal()}
                label="Add Goal to this Budget"
              />
          </ScrollView>
        );
    }
}

export default BudgetDetails;
