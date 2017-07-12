import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  Text,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator }from 'react-navigation';



global.ACCESS_TOKEN= "accessToken"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      pressedStatus: false
    }
    this.storeToken = this.storeToken.bind(this)
  }

  storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }

  async onLoginPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch('https://budgetguru.herokuapp.com/login', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                session:{
                                  email: this.state.email,
                                  password: this.state.password,
                                }
                              })
                            });

      let res = await response.text();
      console.log("res: " + res)
      if (response.status >= 200 && response.status < 300) {
          this.props.navigation.navigate('Home')
          this.setState({error: ""})
          let accessToken = res;
          console.log("res token: " + accessToken);
          this.storeToken(accessToken);
          global.ACCESS_TOKEN =  accessToken
      } else {
          let error = res;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
    }
  }

  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

    render() {
      return (
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={styles.container}>
          <Text style={styles.heading}>
            Check Your Account!
          </Text>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
          <TextInput
            onChangeText={ (text)=> this.setState({email: text}) }
            style={styles.input} placeholder="Email"
            autoCapitalize='none'>
          </TextInput>
          <TextInput
            onChangeText={ (text)=> this.setState({password: text}) }
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}>
          </TextInput>
          <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={this.state.pressStatus? styles.pressedButton : styles.button}
                onHideUnderlay={this._onHideUnderlay.bind(this)}
                onShowUnderlay={this._onShowUnderlay.bind(this)}>
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableHighlight>
      </ScrollView>
      )
    }
  }
const window = Dimensions.get('window');

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
    justifyContent: 'center',
    backgroundColor: '#2eba66',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',

    borderRadius:10,
    width: 300
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
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
    color:"#F3C152"
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login;
