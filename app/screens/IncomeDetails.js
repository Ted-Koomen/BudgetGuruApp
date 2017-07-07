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
       this.props.navigation.navigate('BillEdit')
     }

     handleDelete = () => {
       fetch("http://localhost:3000/incomes", {
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
          <View>
            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* <Header {...budget} /> */}
                <Info income={income}/>

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

export default IncomeDetails;
