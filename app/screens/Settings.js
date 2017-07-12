import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  AlertIOS,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  View
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator }from 'react-navigation';
import Root from './Root';
import { PrimaryButton } from '../components/Buttons';




class Settings extends Component{

  constructor(){
    super()
    this.state = {
      account: null ,
      balance: null ,
      bank_name: null
    }
  }

  async handleSubmit(){
    this.setState({showProgress: true})
    try {
      let response = await fetch('https://budgetguru.herokuapp.com/accounts/new/'+global.ACCESS_TOKEN, {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              account: this.state.account,
                              balance: this.state.balance,
                              bank_name: this.state.bank_name
                            })
                          });

        let res = await response.text();

        if (response.status >= 200 && response.status < 300) {
          this.props.navigation.navigate('Profile')
          AlertIOS.alert(
            "Bank Account Created Successfully"
          )
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

    onUpdatePressed(){
      this.props.navigation.navigate('Update');
    }

    onLogoutPressed(){
        AlertIOS.alert(
          "You have successfully been logged out"
        )
      this.props.navigation.navigate('Root');
    }

    render(){
        return(
          <View style={styles.container}>
            

          <View>
          <Text style={styles.heading}>
            Add Bank Account
          </Text>
            <TextInput
              placeholder="Bank Name"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({bank_name:text})}
              style={styles.inputField}
            />

            <TextInput
              placeholder="Checking or Savings"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({account:text})}
              style={styles.inputField}
            />

            <TextInput
              placeholder="Current Total Balance"
              keyboardType="numeric"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({balance:text})}
              style={styles.inputField}
            />
            <PrimaryButton
              onPress={()=> this.handleSubmit()}
              label="Save"
            />
          

          

            <TouchableHighlight onPress={this.onUpdatePressed.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>
                Update Profile
              </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.onLogoutPressed.bind(this)} style={styles.logoutButton}>
              <Text style={styles.buttonText}>
                Logout
              </Text>
            </TouchableHighlight>
            </View>
          
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
    width: Platform.OS == 'ios' ? window.width - 20 : 375
  },
button: {
    height: 50,
    backgroundColor: '#2eba66',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'
  },
logoutButton:{
  height: 50,
    backgroundColor: '#ef042b',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'
},
  buttonText:{
    color:'#FFF',
    alignSelf:'center',
    fontSize: 18,
   },
  heading: {
    fontSize: 30,
    color: "#F3C152",
    justifyContent:'center',
    alignSelf:'center'

  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  },
  inputField: {
    alignSelf: 'center',
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    justifyContent: 'center',
    width: 300,
  },
  subContainer: {
    marginTop: 100
  }
});

export default Settings;
