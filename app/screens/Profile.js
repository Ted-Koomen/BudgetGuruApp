import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons';
import colors from '../config/colors';






class Profile extends Component{

    constructor(){
      super()
      this.state = {
        remaining_balance: "",
        positive: "",
        message: "",
        total_income: "",
        total_expenses: "",
        year_spend: "",
        average_monthly_available_spend: "",
        total_budgets_amount: "",
        floor: ""
      }
    }

    goHere(){

    }


    componentWillMount(){
      fetch("http://localhost:3000/summary")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          remaining_balance: responseData.remaining_balance,
          positive: responseData.positive,
          message: responseData.message,
          total_income: responseData.total_income,
          total_expenses: responseData.total_expenses,
          year_spend: responseData.year_spend,
          average_monthly_available_spend: responseData.average_monthly_available_spend,
          total_budgets_amount: responseData.total_budgets_amount,
          floor: responseData.floor
          })
      })
      .done();
    }
    render(){
        return(
             <View style={styles.container}>
              <Text style={styles.heading}>
                Summary
              </Text>
              {this.state.remaining_balance < 0 ? <Text style={{fontSize: 20,fontWeight: 'bold',color: 'red'}}>{this.state.remaining_balance}</Text> : <Text style={{fontSize: 20,fontWeight: 'bold',color: 'green'}}>Balance:{this.state.remaining_balance}</Text>}

              {this.state.remaining_balance > 0 ? <ScrollView><TextInput style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({text})}
              />
              <TouchableHighlight onPress={this.goHere} style={styles.button}>
                <Text style={styles.buttonText}>
                  Feelin Lucky
                </Text>
             </TouchableHighlight></ScrollView>: <Text>Sorry, you cant spend anything right now</Text>}

             <Text>
              {this.state.message}
             </Text>
              <Text>Expenses: {this.state.total_expenses}</Text>
              <Text>Income: {this.state.total_income}</Text>

            </View>
        );
    }
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
    borderColor: '#48bbec',
    width: 130,
    right: 10
  },
  button: {
    height: 50,
    backgroundColor: '#064F9C',
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
    paddingTop: 10,
  },
  loader: {
    marginTop: 20
  }
});

export default Profile;
