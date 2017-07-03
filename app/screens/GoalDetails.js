import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';


//want amount and name of bill in this screen
class GoalDetails extends Component{
    render(){
      const contact = this.props.navigation.state.params;


        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
                <Header {...contact} />
                <Actions {...contact}/>
                <Info {...contact }/>
            </ScrollView>
        );
    }
}

export default GoalDetails;
