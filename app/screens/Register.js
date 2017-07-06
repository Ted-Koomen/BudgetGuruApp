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

  // async storeToken(accessToken) {
  //   try {
  //       await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  //       console.log("Token was stored successfull ");
  //   } catch(error) {
  //       console.log("Something went wrong");
  //   }
  // }


      // if (response.status >= 200 && response.status < 300) {
      //     //Handle success
      //     let accessToken = res;
      //     console.log(accessToken);
      //     //On success we will store the access_token in the AsyncStorage
      //     this.storeToken(accessToken);
      //     this.redirect('home');
      // } else {
      //     //Handle error
      //     let error = res;
      //     throw error;
      // }
    // } catch(errors) {
      // //errors are in JSON form so we must parse them first.
      // let formErrors = JSON.parse(errors);
      // //We will store all the errors in the array.
      // let errorsArray = [];
      // for(var key in formErrors) {
      //   //If array is bigger than one we need to split it.
      //   if(formErrors[key].length > 1) {
      //       formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
      //   } else {
      //       errorsArray.push(`${key} ${formErrors[key]}`);
      //   }
      // }
      // this.setState({errors: errorsArray})
      // this.setState({showProgress: false});
    // }

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
          } else {
            let errors = res;
            throw errors;
          }
      } catch(errors) {
        console.log("catch errors: " + res);
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            Register User
          </Text>
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

          <Errors errors={this.state.errors}/>

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

export default Register;