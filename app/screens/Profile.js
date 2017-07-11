import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons';
import colors from '../config/colors';

class Profile extends Component{

    constructor(props){
      super(props)
      this.state = {
        remaining_balance: "",
        canSpend: null,
        message: "",
        amount:null
      }
      this.onSettingsPressed = this.onSettingsPressed.bind(this);
    }

    componentWillMount(){
      fetch("http://localhost:3000/summary")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          remaining_balance: responseData.remaining_balance,
          canSpend: responseData.can_spend,
          message: responseData.message,
          })
      })
    }

    refresh(){
      fetch("http://localhost:3000/summary")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          remaining_balance: responseData.remaining_balance,
          canSpend: responseData.can_spend,
          message: responseData.message,
        })
      })
    }

    onSettingsPressed(){
      this.props.navigation.navigate('Settings')
    }

    render(){
        return(
          <View style={styles.container}>
            <Text style={styles.heading}>
              Summary
            </Text>
            {this.state.remaining_balance < 0 ? <Text style={{fontSize: 20,fontWeight: 'bold',color: 'red'}}> {this.state.remaining_balance}</Text> : <Text style={{fontSize: 20,fontWeight: 'bold',color: 'green'}}>Remaining Balance:{this.state.remaining_balance}</Text>}

            {this.state.canSpend && this.state.amount > 0 ? <ScrollView><TextInput style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({amount:text})}
            />
            <TouchableHighlight onPress={this.goHere} style={styles.button}>
              <Text style={styles.buttonText}>
                Feelin Lucky
              </Text>
            </TouchableHighlight></ScrollView>: null}

            <Text style={styles.subHeading}>
              {this.state.message}
            </Text>

            <TouchableHighlight onPress={this.refresh.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>
                Refresh
              </Text>
            </TouchableHighlight>

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





//
//
// async goHere(){
//   this.setState({showProgress: true})
//   try {
//     let response = await fetch('http://localhost:3000/expense/', {
//                           method: 'POST',
//                           headers: {
//                             'Accept': 'application/json',
//                             'Content-Type': 'application/json'
//                           },
//                           body: JSON.stringify({
//                             amount: this.state.amount
//                           })
//                         });
//
//       let res = await response.text();
//
//       if (response.status >= 200 && response.status < 300) {
//         this.props.navigation.navigate('Profile')
//       } else {
//         let errors = res;
//         throw errors;
//       }
//   } catch(errors) {
//     console.log("catch errors: " + errors);
//
//     let formErrors = JSON.parse(errors);
//     let errorsArray = [];
//     for(var key in formErrors) {
//       if(formErrors[key].length > 1) {
//           formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
//       } else {
//           errorsArray.push(`${key} ${formErrors[key]}`);
//       }
//     }
//    this.setState({errors: errorsArray})
//   }
// }
