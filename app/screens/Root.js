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

class Root extends Component {
  //   componentWillMount() {
  //   this.getToken();
  // }
  // navigate(routeName) {
  //   this.props.navigator.push({
  //     name: routeName
  //   });
  // }
    render() {
    return (
      <View style={styles.container}>
        <Text> Budget Guru </Text>
            {/*<TextInput>
                onChangeText={ (text)=> this.setState({email: text}) }
                style={styles.input} placeholder="Email">
            </TextInput>
            <TextInput>
                onChangeText={ (text)=> this.setState({password: text}) }
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}>
            </TextInput>
       <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>*/}
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
    paddingTop: 180
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  }
});


export default Root