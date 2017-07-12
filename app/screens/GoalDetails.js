import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, AlertIOS } from 'react-native';
import {Info } from '../components/GoalDetails';
import colors from '../config/colors';
import {PrimaryButton} from '../components/Buttons'

//want amount and name of bill in this screen
class GoalDetails extends Component{

     handleSubmit = () => {
       const goal = this.props.navigation.state.params;
       this.props.navigation.navigate('EditGoal',goal)
     }

     handleDelete = () => {
       fetch("https://budgetguru.herokuapp.com/goals", {
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
             this.props.navigation.navigate('Goals')
         })
       .done();
     }

    render(){
      const goal = this.props.navigation.state.params;

        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* <Header {...budget} /> */}
                <Info goal={goal}/>

            <PrimaryButton
              onPress={()=> this.handleSubmit()}
              label="Edit Goal"
            />

              <PrimaryButton
                onPress={()=> this.handleDelete()}
                label="Delete Goal"
              />

          </ScrollView>
        );
    }
}

export default GoalDetails;
