import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import Calendar from 'react-native-calendar-datepicker'



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
                placeholder={bill.bill_name}
              />

              <TextInput
                placeholder={bill.amount.toString()}
              />

              <TextInput
                placeholder={bill.status}
              />

              <Calendar
                onChange={(date) => this.setState({due_date:date})}
                selected={this.state.date}
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
