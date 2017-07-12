import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, Platform} from 'react-native';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons';
import colors from '../config/colors';

class Profile extends Component{

    constructor(props){
      super(props)
      this.state = {
        remaining_balance: null,
        canSpend: null,
        message: "",
        amount: 0,
        error: "",
        spend: null
      }
      this.onSettingsPressed = this.onSettingsPressed.bind(this);
      this.search = this.search.bind(this)
      this.addExpense = this.addExpense.bind(this)
    }

    componentWillMount(){
      fetch("https://budgetguru.herokuapp.com/summary")
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
      fetch("https://budgetguru.herokuapp.com/summary")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          remaining_balance: responseData.remaining_balance,
          canSpend: responseData.can_spend,
          message: responseData.message,
        })
      })
    }

    async search(num) {
      this.setState({amount:num})
    try {
      let response = await fetch("https://budgetguru.herokuapp.com/calculate/"+num);
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        let userData = JSON.parse(res);
          this.setState({spend: userData.can_spend});
      } else {
          let error = res;
          throw err;
      }
    } catch(error) {
        this.setState({error:error})
    }
  }

    async addExpense(){
      this.setState({showProgress: true})
      try {
        let response = await fetch('https://budgetguru.herokuapp.com/expense/', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                amount: this.state.amount
                              })
                            });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            this.props.navigation.navigate('Profile')
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
            {this.state.remaining_balance < 0 ? <Text style={{fontSize: 20,fontWeight: 'bold',color: 'red', paddingBottom: 20}}> {this.state.remaining_balance}</Text> : <Text style={{fontSize: 20,fontWeight: 'bold',color: 'green', paddingBottom: 20}}>Remaining Balance: ${this.state.remaining_balance}</Text>}

            <Text style={styles.subHeading}>
              {this.state.message}
            </Text>

            {this.state.canSpend && this.state.remaining_balance > 0 ? <ScrollView><TextInput style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              returnKeyLabel = {"next"}
              onChangeText={this.search}
            /></ScrollView>: null}

              {this.state.spend && this.state.remaining_balance > 0 ? <TouchableHighlight onPress={this.addExpense} style={this.state.pressStatus? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay2.bind(this)}
                onShowUnderlay={this._onShowUnderlay2.bind(this)}>
              <Text style={styles.buttonText}>
                Save
              </Text>
            </TouchableHighlight> : null}


            <TouchableHighlight onPress={this.refresh.bind(this)} style={this.state.pressStatus2? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay2.bind(this)}
                onShowUnderlay={this._onShowUnderlay2.bind(this)}>
              <Text style={styles.buttonText}>
                Refresh
              </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.onSettingsPressed.bind(this)} style={this.state.pressStatus? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay.bind(this)}
                onShowUnderlay={this._onShowUnderlay.bind(this)}>
              <Text style={styles.buttonText}>
                Settings
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
    width: Platform.OS == 'ios' ? 130 : 175,
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
    color: "#F3C152"
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
