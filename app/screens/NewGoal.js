import React, { Component } from 'react';
import { ScrollView, AlertIOS,  Picker, Text, StyleSheet, AsyncStorage, View} from 'react-native';

import colors from '../config/colors';
import { TextInput} from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import Calendar from 'react-native-calendar-datepicker'


const fields = [
  { placeholder: 'Bill', stateKey: 'billName' },
  { placeholder: 'Amount', stateKey: 'billAmount' }
]

class NewGoal extends Component{
    constructor(props){
      super(props);

      this.state = {
        goal_name:null,
        amount_saved: null,
        time_frame: null,
        total:null,
        errors:[]
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
        let response = await fetch('https://budgetguru.herokuapp.com/goals/new', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                id: this.props.navigation.state.params.id,
                                goal_name: this.state.goal_name,
                                amount_saved: this.state.amount_saved,
                                time_frame: this.state.time_frame,
                                total:this.state.total
                              })
                            });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            this.props.navigation.navigate('Goals',this.props.navigation.state.params.id)
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
                placeholder="Goal Name"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({goal_name:text})}
              />
              <TextInput
                placeholder="Amount Saved"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({amount_saved:text})}
              />

              <TextInput
                placeholder="Total"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({total:text})}
              />

              <Calendar
                onChange={(date) => this.setState({time_frame:date})}
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
