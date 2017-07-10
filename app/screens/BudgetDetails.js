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

     handleDelete = () => {
       fetch("http://localhost:3000/budgets", {
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
          <View>
            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* <Header {...budget} /> */}
                <Info bill={budget}/>

            </ScrollView>
            <PrimaryButton
              onPress={()=> this.handleSubmit()}
              label="Edit Budget"
            />
            <View>
              <PrimaryButton
                onPress={()=> this.handleDelete()}
                label="Delete Budget"
              />
            </View>

          </View>
        );
    }
}

export default BudgetDetails;
