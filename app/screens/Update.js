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

class Update extends Component{
    constructor(props){
      super(props);

      this.state = {
        first_name: this.props.navigation.state.params.first_name,
        last_name: this.props.navigation.state.params.last_name,
        email: this.props.navigation.state.params.email,
        password: this.props.navigation.state.params.password,
        balance_floor: this.props.navigation.state.params.amount.toString(),
        errors: [],
      };
    }

    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }

    async handleSubmit(){
    //   let access_token = global.ACCESS_TOKEN;
      try {
        let response = await fetch(`http://localhost:3000/users/update`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // access_token: access_token,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            balance_floor: this.balance_floor
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

    render(){
      const user = this.props.navigation.state.params
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                value={this.state.first_name}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({first_name:text})}
              />
              <TextInput
                value={this.state.last_name}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({last_name:text})}
              />
              <TextInput
                value={this.state.email}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({email:text})}
              />
            <TextInput
                value={this.state.password}
                returnKeyLabel = {"next"}
                onChangeText={(text) => this.setState({password:text})}
                secureTextEntry={true}
              />

              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
              <Errors errors={this.state.errors}/>
            </ScrollView>

        );
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

export default Update;
