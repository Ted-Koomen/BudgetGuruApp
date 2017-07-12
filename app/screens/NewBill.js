import React, { Component } from 'react';
import { ScrollView, AlertIOS,  Picker, Text, StyleSheet, View, AsyncStorage } from 'react-native';
import colors from '../config/colors';
import { TextInput } from '../components/TextInput';
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
        amount: null,
        due_date: null,
        status: null,
        errors: [],
        showProgress: false
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
        let response = await fetch('https://budgetguru.herokuapp.com/bills/new/'+global.ACCESS_TOKEN, {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                bill_name: this.state.bill_name,
                                amount: this.state.amount,
                                due_date: this.state.due_date,
                                status: this.state.status.toLowerCase()
                              })
                            });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            this.props.navigation.navigate('Bills')
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
      //  this.setState({showProgress: false});
      }
    }

    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <Errors errors={this.state.errors}/>
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
                placeholder="Status: Paid/Not Paid"
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

export default NewBill;
