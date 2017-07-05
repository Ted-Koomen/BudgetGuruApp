import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import {PrimaryButton} from '../components/Buttons'

//want amount and name of bill in this screen
class IncomeDetails extends Component{

     constructor(){
       super()

     }

     handleSubmit = () => {
       this.props.navigation.navigate('EditIncome')
     }

     handleDelete = () => {
       //delete function
     }
    render(){
      const contact = this.props.navigation.state.params;


        return(
          <View>
            <ScrollView style={{ backgroundColor: colors.background }}>
                <Header {...contact} />
            </ScrollView>
            <PrimaryButton
              onPress={()=> this.handleSubmit()}
              label="Edit Income"
            />
            <View>
              <PrimaryButton
                onPress={()=> this.handleDelete()}
                label="Delete Income"
              />
            </View>
          </View>
        );
    }
}

export default IncomeDetails;
