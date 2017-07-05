import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      balance_floor: 0,
      errors: [],
      showProgress: false,
    }
  }
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            Register User
          </Text>
          <TextInput>
            onChangeText={ (text)=> this.setState({first_name: text}) }
            style={styles.input} placeholder="First Name">
          </TextInput>
          <TextInput>
            onChangeText={ (text)=> this.setState({last_name: text}) }
            style={styles.input} placeholder="Last Name">
          </TextInput>
          <TextInput>
            onChangeText={ (text)=> this.setState({email: text}) }
            style={styles.input} placeholder="Email">
          </TextInput>
          <TextInput>
            onChangeText={ (text)=> this.setState({password: text}) }
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}>
          </TextInput>
          <TextInput>
            onChangeText={ (text)=> this.setState({balance_floor: text}) }
            style={styles.input} placeholder="Balance Floor">
          </TextInput>
          <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableHighlight>


          <ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
      )
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

export default Login;