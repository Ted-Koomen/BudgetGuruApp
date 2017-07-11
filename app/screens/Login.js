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
      let response = await fetch('http://localhost:3000/login', {
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
    render() {
      return (
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={styles.container}>
          <Text style={styles.heading}>
            Login User
          </Text>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
          <TextInput
            onChangeText={ (text)=> this.setState({email: text}) }
            style={styles.input} placeholder="Email">
          </TextInput>
          <TextInput
            onChangeText={ (text)=> this.setState({password: text}) }
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}>
          </TextInput>
          <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
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
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login;
