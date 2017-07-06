import React, { Component } from 'react';
import { Picker, ScrollView } from 'react-native';
import { Select, Option } from 'react-native-chooser';
import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import { Calendar } from 'react-native-calendar';

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
                placeholder="Due Date"
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Company"
              />
              <TextInput
                placeholder="Amount"
                keyboardType='numeric'
              />

              {/* <Picker>
                <Picker.Item label="Paid" value="billStatus" />
                <Picker.Item label="Unpaid" value="billStatus" />
                <Picker.Item label="Past Due" value="billStatus" />
              </Picker>
               */}
              

              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
            </ScrollView>
        );
    }
}

export default NewBill;
