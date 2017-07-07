import React, { Component } from 'react';
import { ScrollView, AlertIOS,  Picker } from 'react-native';
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
        bill_name: "",
        amount: 0,
        due_date: null,
        status: null
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }

    handleSubmit = () => {
      fetch("http://localhost:3000/bills/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bill_name: this.state.bill_name,
          amount: this.state.amount,
          due_date: this.state.due_date,
          status: this.state.status
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "Bill Saved Successfully"
            )
            this.props.navigation.navigate('Bills')
        })
      .done();
    }

    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                placeholder="Bill Name"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({bill_name:text})}
              />
              <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({amount:text})}
              />
              <TextInput
                placeholder="Status: Paid/Not Paid/Past Due"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({status:text})}
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

export default NewBill;
