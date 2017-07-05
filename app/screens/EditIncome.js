import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import colors from '../config/colors';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'



class EditIncome extends Component{
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
                placeholder="Yearly Pay After Tax"
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

export default EditIncome;
