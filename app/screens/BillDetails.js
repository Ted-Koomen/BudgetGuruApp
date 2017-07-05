import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { PrimaryButton } from '../components/Buttons'

//want amount and name of bill in this screen
class Details extends Component{
    constructor(){
      super()
    }

    handleSubmit(){
      this.props.navigation.navigate('EditBill')
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
              label='Edit Bill'
              />
            </ScrollView>
        );
    }
}

export default Details;
