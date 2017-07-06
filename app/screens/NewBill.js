import React, { Component } from 'react';
import { Picker, ScrollView } from 'react-native';
import { Select, Option } from 'react-native-chooser';
import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import Calendar from 'react-native-calendar-datepicker'
import moment from 'moment'

const fields = [
  { placeholder: 'Bill', stateKey: 'billName' },
  { placeholder: 'Amount', stateKey: 'billAmount' }
]

class NewBill extends Component{
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

    handleSubmit = () => {
      alert("Submit");
    }

    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                placeholder="Name"
              />
              <TextInput
                placeholder="Status: Paid/Not Paid/Past Due"
              />
              <TextInput
                placeholder="Company"
              />
              <TextInput
                placeholder="Amount"
                keyboardType='numeric'
              />

              <Calendar
                onChange={(date) => this.setState({date})}
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

export default NewBill;
