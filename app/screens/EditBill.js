import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'



class EditBill extends Component{
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
      const bill = this.props.navigation.state.params
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                // {bill.bill_name}
              />

              <TextInput
                // {bill.amount}
              />

              <TextInput
                // {bill.due_date}
              />

              <TextInput
                // {bill.status}
              />

              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
            </ScrollView>
        );
    }
}

export default EditBill;
