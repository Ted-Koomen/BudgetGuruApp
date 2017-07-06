import React, { Component } from 'react';
import { ScrollView, AlertIOS } from 'react-native';

import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'

const fields = [
  { placeholder: 'Bill', stateKey: 'billName' },
  { placeholder: 'Amount', stateKey: 'billAmount' }
]

class NewContact extends Component{
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
        })
      .done(
        this.props.navigation.navigate('Bills')

      );
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
                placeholder="Due Date"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({due_date:text})}
              />
              <TextInput
                placeholder="Status"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({status:text})}
              />
              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
            </ScrollView>
        );
    }
}

export default NewContact;
