import React, { Component } from 'react';
import { ScrollView,AlertIOS  } from 'react-native';

import colors from '../config/colors';
import { TextInput, View} from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'

const fields = [
  { placeholder: 'Bill', stateKey: 'billName' },
  { placeholder: 'Amount', stateKey: 'billAmount' }
]

class NewBudget extends Component{
    constructor(props){
      super(props);

      this.state = {
        budget_name: "",
        monthly_spend: null,
        goal: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }

    handleSubmit = () => {
      fetch("http://localhost:3000/budgets/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          budget_name: this.state.budget_name,
          monthly_spend: this.state.monthly_spend,
          goal: this.state.goal,
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "Budget Saved Successfully"
            )
            this.props.navigation.navigate('Budgets')
        })
      .done();
    }

    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                placeholder="Budget Name"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({budget_name:text})}
              />
              <TextInput
                placeholder="Monthly Spend"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({monthly_spend:text})}
              />
              <TextInput
                placeholder="Met Goal?"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({goal:text})}
              />

              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
            </ScrollView>
        );
    }
}

export default NewBudget;
