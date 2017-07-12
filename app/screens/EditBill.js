import React, { Component } from 'react';
import { ScrollView,StyleSheet,View } from 'react-native';

import colors from '../config/colors';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import Calendar from 'react-native-calendar-datepicker'



class EditBill extends Component{
    constructor(props){
      super(props);

      this.state = {
        bill_name: this.props.navigation.state.params.bill_name,
        amount: this.props.navigation.state.params.amount.toString(),
        due_date: this.props.navigation.state.params.due_date,
        status: this.props.navigation.state.params.status,
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
        let response = await fetch('https://budgetguru.herokuapp.com/bills/update/'+global.ACCESS_TOKEN, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.props.navigation.state.params.id,
            bill_name: this.state.bill_name,
            amount: this.state.amount,
            due_date: this.state.due_date,
            status: this.state.status
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
      const bill = this.props.navigation.state.params
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <Errors errors={this.state.errors}/>
              <TextInput
                value={this.state.bill_name}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({bill_name:text})}
              />
              <TextInput
                value={this.state.amount}
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({amount:text})}
              />
              <TextInput
                value={this.state.status}
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

export default EditBill;
