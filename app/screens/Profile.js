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

    _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

  _onHideUnderlay2(){
    this.setState({ pressStatus2: false });
  }
  _onShowUnderlay2(){
    this.setState({ pressStatus2: true });
  }

    render(){
        return(
          <View style={styles.container}>
            <Text style={styles.heading}>
              Summary
            </Text>
            {this.state.remaining_balance < 0 ? <Text style={{fontSize: 20,fontWeight: 'bold',color: 'red'}}>{this.state.remaining_balance}</Text> : <Text style={{fontSize: 20,fontWeight: 'bold',color: 'green'}}>Remaining Balance:{this.state.remaining_balance}</Text>}

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
              {this.state.remaining_balance < 0 ? <Text style={{fontSize: 20,fontWeight: 'bold',color: 'red'}}>{this.state.remaining_balance}</Text> : <Text style={{fontSize: 20,fontWeight: 'bold',color: 'green'}}>Remaining Balance:{this.state.remaining_balance}</Text>}

              {this.state.canSpend && this.state.amount > 0 ? <ScrollView><TextInput style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({amount:text})}
              />
              <TouchableHighlight onPress={this.goHere} tyle={this.state.pressStatus2? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay2.bind(this)}
                onShowUnderlay={this._onShowUnderlay2.bind(this)}>
                <Text style={styles.buttonText}>
                  Feelin Lucky
                </Text>
              </TouchableHighlight></ScrollView>: <Text style={{color:'red',fontWeight: 'bold'}}>Warning</Text>}

             <Text style={styles.subHeading}>
              {this.state.message}
            </Text>

             <TouchableHighlight onPress={this.refresh} style={this.state.pressStatus? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay.bind(this)}
                onShowUnderlay={this._onShowUnderlay.bind(this)}>
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
    justifyContent: 'center',
    backgroundColor: '#2eba66',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    borderRadius:10,
    width: 300
  },
 buttonText: {
    fontSize: 18,
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
  },
  pressedButton:{
    height: 50,
    backgroundColor: '#29593c',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'

  },
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
