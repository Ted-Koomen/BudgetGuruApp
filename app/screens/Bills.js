import React, { Component } from 'react';
import { View, Text, FlatList,TouchableHighlight, StyleSheet } from 'react-native';
import {bills} from  '../config/data';
import colors from '../config/colors';
import { ListItem } from '../components/ListItem';
import { PrimaryButton,styles } from '../components/Buttons';
import axios from 'axios';


class Bills extends Component {


  constructor(){
    super();
    this.state = {
      bills: []
    }
  }

  componentWillMount(){
    fetch("https://budgetguru.herokuapp.com/bills/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        bills: [].concat(responseData)
      })
    })
    .done();
  }

  handleRowPress = (item) => {
    this.props.navigation.navigate('Details', item)
  };

  handleSubmit = () => {
    this.props.navigation.navigate('NewBill')
  }

  refresh(){
    fetch("https://budgetguru.herokuapp.com/bills/"+global.ACCESS_TOKEN)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        bills: [].concat(responseData)
      })
    })
    .done();
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

  render() {
    return (
      <View>
      <FlatList
        style={{backgroundColor: colors.background}}
        data={this.state.bills}
        renderItem={({item})=>
          <ListItem bill_name={item.bill_name} onPress={() => this.handleRowPress(item)}/>
        }
        keyExtractor={(item)=>item.id}
      />

      <TouchableHighlight onPress={this.refresh.bind(this)} style={this.state.pressStatus2? styles.pressedButton : styles.button}
        onHideUnderlay={this._onHideUnderlay2.bind(this)}
        onShowUnderlay={this._onShowUnderlay2.bind(this)}>
        <Text style={styles.primaryButtonText}
          onPress={()=> this.handleSubmit()}>
          Add Bill
        </Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={this.refresh.bind(this)} style={this.state.pressStatus2? styles.pressedButton : styles.button}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}>
        <Text style={styles.primaryButtonText}>
          Refresh
        </Text>
      </TouchableHighlight>

    </View>
    );
  }
}

const style = StyleSheet.create({
 welcome:{
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    fontSize:16,
  }
})


export default Bills
