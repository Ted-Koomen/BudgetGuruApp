import React, { Component } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableHighlight, 
  AsyncStorage, 
  ActivityIndicatorIOS, 
  Text, 
  View,
  Dimensions,
  Platform
} from 'react-native';

global.ACCESS_TOKEN = 'access_token';

class Register extends Component {
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

    async onRegisterPressed(){
      this.setState({showProgress: true})
      try {
        let response = await fetch('http://localhost:3000/users', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  first_name: this.state.first_name,
                                  last_name: this.state.last_name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  balance_floor: this.state.balance_floor,
                                }
                              })
                            });

          let res = await response.text();

          if (response.status >= 200 && response.status < 300) {
            console.log("res is" + res);
            this.props.navigation.navigate('Home')
            let accessToken = res;
            console.log("res token: " + accessToken);
            this.storeToken(accessToken);
            global.ACCESS_TOKEN = accessToken
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
       this.setState({showProgress: false});
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            Register User
          </Text>
          <Errors errors={this.state.errors}/>
          <TextInput
            onChangeText={ (text)=> this.setState({first_name: text}) }
            style={styles.input} placeholder="First Name">
          </TextInput>
          <TextInput
            onChangeText={ (text)=> this.setState({last_name: text}) }
            style={styles.input} placeholder="Last Name">
          </TextInput>
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
          <TextInput
            onChangeText={ (text)=> this.setState({balance_floor: text}) }
            style={styles.input} placeholder="Balance Floor">
          </TextInput>
          <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableHighlight>

          {/*<ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />*/}
      </View>
      )
    }
  }

  const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
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
    paddingTop: 10,
  },
  loader: {
    marginTop: 20
  }
});

export default Register;
