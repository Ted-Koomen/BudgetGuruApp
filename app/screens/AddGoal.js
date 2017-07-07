import React, { Component } from 'react';
import { ScrollView, AlertIOS,  Picker, Text, StyleSheet, AsyncStorage, View} from 'react-native';

import colors from '../config/colors';
import { TextInput} from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'

const fields = [
  { placeholder: 'Bill', stateKey: 'billName' },
  { placeholder: 'Amount', stateKey: 'billAmount' }
]

class NewGoal extends Component{
    constructor(props){
      super(props);
        goal_name: "",
        amount_saved: null,
        timeframe: null,
        achieved: null,
        total:null,
        erorrs:[]
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
        let response = await fetch('http://localhost:3000/budgets/new', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                user:{
                                  budget_name: this.state.goal_name,
                                  monthly_spend: this.state.amount_saved,
                                  goal: this.state.timeframe,
                                  total:this.state.achieved,
                                  total:this.state.total
                                }
                              })
                            });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            this.props.navigation.navigate('Goals')
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
              <TextInput
                placeholder="Goal Name"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({budget_name:goal_name})}
              />
              <TextInput
                placeholder="Amount Saved"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({monthly_spend:amount_saved})}
              />
              <TextInput
                placeholder="Timeframe"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({goal:timeframe})}
              />
              <TextInput
                placeholder="Achieved"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({monthly_spend:achieved})}
              />
              <TextInput
                placeholder="Total"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({monthly_spend:total})}
              />

              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />

              <Errors errors={this.state.errors}/>
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

export default NewGoal;
