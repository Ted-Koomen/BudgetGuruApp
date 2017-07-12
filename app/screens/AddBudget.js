import React, { Component } from 'react';
import { ScrollView, AlertIOS,  Picker, Text, StyleSheet, AsyncStorage, View} from 'react-native';

import colors from '../config/colors';
import { TextInput} from '../components/TextInput';
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
        errors: []
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }

    async handleSubmit(){
      this.setState({showProgress: true})
      try {
        let response = await fetch('https://budgetguru.herokuapp.com/budgets/new/'+global.ACCESS_TOKEN, {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                budget_name: this.state.budget_name,
                                monthly_spend: this.state.monthly_spend
                              })
                            });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            this.props.navigation.navigate('Budgets')
          } else {
            let errors = res;
            throw errors;
          }
      } catch(errors) {
        console.log("catch errors: " + errors);

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
              <Errors errors={this.state.errors}/>

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

              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />

            </ScrollView>
        );
    }
}

const Errors = (props) => {
return (
  <View>
    {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default NewBudget;
