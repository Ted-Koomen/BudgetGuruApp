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
  Platform,
  View
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator }from 'react-navigation';

class Update extends Component{
    constructor(props){
      super(props);

      this.state = {
        access_token: global.ACCESS_TOKEN,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        balance_floor: "",
        errors: [],
      };
    }

    componentWillMount() {
    this.fetchUserData();
    }

    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }

    async fetchUserData() {
    try {
      let response = await fetch("https://budgetguru.herokuapp.com/users/"+global.ACCESS_TOKEN+"/edit");
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        let userData = JSON.parse(res);
          this.setState({first_name: userData.first_name});
          this.setState({last_name: userData.last_name});
          this.setState({email: userData.email});
          this.setState({balance_floor: userData.balance_floor});
      } else {
          let error = res;
          throw err;
      }
    } catch(error) {
        this.props.navigation.navigate('Profile')
    }
  }

    async handleSubmit(){
      try {
        let response = await fetch(`https://budgetguru.herokuapp.com/update/`+global.ACCESS_TOKEN, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
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
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.heading}>
                Account Details
              </Text>
              <Errors errors={this.state.errors}/>
              <TextInput
                onChangeText={(text) => this.setState({first_name:text})}
                style={styles.input} value={this.state.first_name}
              />
              <TextInput
                onChangeText={(text) => this.setState({last_name:text})}
                style={styles.input} value={this.state.last_name}
              />
              <TextInput
                onChangeText={(text) => this.setState({email:text})}
                style={styles.input} value={this.state.email}
              />
              <TextInput
                onChangeText={(text) => this.setState({password:text})}
                style={styles.input} placeholder="Password"
                secureTextEntry={true}
              />
              <TextInput
                onChangeText={(text) => this.setState({balance_floor:text})}
                style={styles.input} value={this.state.balance_floor}
              />
              <TouchableHighlight onPress={()=> this.handleSubmit()} style={styles.button}>
              <Text style={styles.buttonText}>
                Save
              </Text>
              </TouchableHighlight>
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
    borderColor: '#48bbec',
    width: Platform.OS == 'ios' ? window.width - 20 : 375
  },
   button: {
    height: 50,
    backgroundColor: '#2eba66',
    
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    alignSelf: 'center'
  },
 buttonText:{
    color:'#FFF',
    alignSelf:'center',
    fontSize: 18,

  },
  heading: {
    fontSize: 30,
    color: "#F3C152",
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
