import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, AlertIOS } from 'react-native';
import {Info } from '../components/IncomeDetails';
import colors from '../config/colors';
import {PrimaryButton} from '../components/Buttons'

//want amount and name of bill in this screen
class IncomeDetails extends Component{

     constructor(){
       super()
     }

     handleSubmit = () => {
       const income= this.props.navigation.state.params
       this.props.navigation.navigate('EditIncome',income)
     }

     handleDelete = () => {
       fetch("https://budgetguru.herokuapp.com/incomes/"+global.ACCESS_TOKEN, {
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
             this.props.navigation.navigate('Incomes')
         })
       .done();
     }

    render(){
      const income = this.props.navigation.state.params;


        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* <Header {...budget} /> */}
                <Info income={income}/>

            <PrimaryButton
              onPress={()=> this.handleSubmit()}
              label="Edit Income"
            />

            <PrimaryButton
              onPress={()=> this.handleDelete()}
              label="Delete Income"
            />

          </ScrollView>
        );
    }
}

export default IncomeDetails;
