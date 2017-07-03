import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'



class NewGoal extends Component{
    constructor(props){
      super(props);

      this.state = {

      };
    }

    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }


    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                placeholder="Company"
              />
              <TextInput
                placeholder="Target Date"
                keyboardType='numeric'
              />
              <TextInput
                placeholder="Amount"
                keyboardType='numeric'
              />
              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
            </ScrollView>
        );
    }
}

export default NewGoal;
