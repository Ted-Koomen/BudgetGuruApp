import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import colors from '../config/colors';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'



class EditIncome extends Component{
    constructor(props){
      super(props);

      this.state = {
        id:this.props.navigation.state.params.id,
        source:this.props.navigation.state.params.source,
        post_tax_amount: this.props.navigation.state.params.post_tax_amount,
        fixed: this.props.navigation.state.params.fixed,
        pay_schedule: this.props.navigation.state.params.pay_schedule
      };
    }

    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }

    async handleSubmit(){
      this.setState({showProgress: true})
      try {
        let response = await fetch('https://budgetguru.herokuapp.com/incomes/update/'+ global.ACCESS_TOKEN, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:this.state.id,
            source:this.state.source,
            post_tax_amount: this.state.post_tax_amount,
            fixed: this.state.fixed,
            pay_schedule: this.state.pay_schedule
          })
        });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            this.props.navigation.navigate('Incomes')
          } else {
            let errors = res;
            throw errors;
          }
      } catch(errors) {

        let formErrors = JSON.parse(errors);
        let errorsArray = [];

        for(var key in formErrors) {
          if(formErrors[key].length > 1) {
              formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
          } else {
              errorsArray.push(`${key} ${formErrors[key]}`);
          }
        }
       this.setState({errors: errorsArray})
      }
    }

    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>

              <TextInput
                placeholder="Source of Income"
                value={this.state.source}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({source:text})}
              />

              <TextInput
                placeholder="Income After Tax"
                value={this.state.post_tax_amount.toString()}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({post_tax_amount:text})}
              />

              <TextInput
                placeholder="true or false"
                value={this.state.fixed.toString()}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({fixed:text})}
              />

              <TextInput
                placeholder="weekly, bi-weekly, monthly"
                value={this.state.pay_schedule}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({pay_schedule:text})}
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
