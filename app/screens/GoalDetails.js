import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { PrimaryButton } from '../components/Buttons';

//want amount and name of bill in this screen
class GoalDetails extends Component{
  handleSubmit = () => {
    this.props.navigation.navigate('EditGoal')
  }

  handleDelete = () => {
    // route to delete budget
  }
    render(){
      const contact = this.props.navigation.state.params;


        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
                <Header {...contact} />
                <Actions {...contact}/>
                <Info {...contact }/>
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
            </ScrollView>
        );
    }
}

export default GoalDetails;
