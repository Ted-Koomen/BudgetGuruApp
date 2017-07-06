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
import Me from './Me';
import { StackNavigator, TabNavigator, DrawerNavigator }from 'react-navigation';


const ACCESS_TOKEN = 'access_token';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }

  redirect(){
    this.props.navigation.navigate('Me')
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
         
          this.setState({error: ""})
          let accessToken = res;
          console.log("res token: " + accessToken);
          this.storeToken(accessToken);
          this.props.navigation.navigate('Me') 
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
        <View style={styles.container}>
          <Text style={styles.heading}>
            Login User
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

          <Text style={styles.error}>
            {this.state.error}
          </Text>

          {/*<ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />*/}
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