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
        canSpend: null,
        message: "",
        // floor: ""
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
          canSpend: responseData.can_spend,
          message: responseData.message,
          // floor: responseData.floor
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
              {this.state.remaining_balance < 0 ? <Text style={{fontSize: 20,fontWeight: 'bold',color: 'red'}}>{this.state.remaining_balance}</Text> : <Text style={{fontSize: 20,fontWeight: 'bold',color: 'green'}}>Remaining Balance:{this.state.remaining_balance}</Text>}

              {this.state.canSpend ? <ScrollView><TextInput style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({text})}
              />
              <TouchableHighlight onPress={this.goHere} style={styles.button}>
                <Text style={styles.buttonText}>
                  Feelin Lucky
                </Text>
              </TouchableHighlight></ScrollView>: <Text style={{color:'red',fontWeight: 'bold'}}>Warning</Text>}

             <Text style={styles.subHeading}>
              {this.state.message}
             </Text>

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
  subHeading: {
    fontSize: 18,
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
