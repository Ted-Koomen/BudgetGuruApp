import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, AlertIOS } from 'react-native';
import {Info } from '../components/GoalDetails';
import colors from '../config/colors';
import {PrimaryButton} from '../components/Buttons'

//want amount and name of bill in this screen
class GoalDetails extends Component{

     constructor(){
       super()
     }

     handleSubmit = () => {
       this.props.navigation.navigate('BudgetEdit')
     }

     handleDelete = () => {
       fetch("http://localhost:3000/goals", {
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
          <View>
            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* <Header {...budget} /> */}
                <Info goal={goal}/>

            </ScrollView>
            <PrimaryButton
              onPress={()=> this.handleSubmit()}
              label="Edit Goal"
            />
            <View>
              <PrimaryButton
                onPress={()=> this.handleDelete()}
                label="Delete Goal"
              />
            </View>

          </View>
        );
    }
}

export default GoalDetails;
