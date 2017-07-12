import React, { Component } from 'react';
import { ScrollView, AlertIOS,  Picker, StyleSheet, View, AsyncStorage, Text} from 'react-native';
import colors from '../config/colors';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import Calendar from 'react-native-calendar-datepicker'
import moment from 'moment'

const fields = [
  { placeholder: 'Bill', stateKey: 'billName' },
  { placeholder: 'Amount', stateKey: 'billAmount' }
]

class NewIncome extends Component{
    constructor(props){
      super(props);
      this.state = {
        source: "",
        post_tax_amount: null,
        fixed: null,
        pay_schedule: null,
        errors:[]
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
        let response = await fetch('https://budgetguru.herokuapp.com/incomes/'+global.ACCESS_TOKEN, {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                source: this.state.source,
                                post_tax_amount:this.state.post_tax_amount,
                                fixed: this.state.fixed.toLowerCase(),
                                pay_schedule:this.state.pay_schedule.toLowerCase()
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
              placeholder="Source"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({source:text})}
            />
            <TextInput
              placeholder="Post Tax"
              keyboardType="numeric"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({post_tax_amount:text})}
            />
            <TextInput
              placeholder="Fixed Income? (True or False)"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({fixed:text})}
            />
            <TextInput
              placeholder="Weekly/Bi-Weekly/Monthly"
              keyboardType='numeric'
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

export default NewIncome;
