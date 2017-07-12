import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight} from 'react-native';
import {contacts} from  '../config/data';
import colors from '../config/colors';
import { BudgetList } from '../components/ListItem'
import { PrimaryButton,styles } from '../components/Buttons';


class Incomes extends Component {

    constructor(){
      super();
      this.state = {
        incomes: [],
      }
    }

    componentWillMount(){
      fetch("https://budgetguru.herokuapp.com/incomes/"+global.ACCESS_TOKEN)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          incomes: [].concat(responseData)
        })
        console.log(this.state.budgets)
      })
      .done();
    }

    handleRowPress = (item) => {
      this.props.navigation.navigate('IncomeDetails', item)
    };

    handleSubmit = ()=>{
      this.props.navigation.navigate('IncomeNew')
    }

    refresh(){
      fetch("https://budgetguru.herokuapp.com/incomes/"+global.ACCESS_TOKEN)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          incomes: [].concat(responseData)
        })
        console.log(this.state.budgets)
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
            data={this.state.incomes}
            renderItem={({item})=>
            <BudgetList itemName={item.source} onPress={() => this.handleRowPress(item)}/>
          }
          keyExtractor={(item)=>item.id}
          />

          <TouchableHighlight style={this.state.pressStatus? styles.pressedButton : styles.button}
              onHideUnderlay={this._onHideUnderlay.bind(this)}
              onShowUnderlay={this._onShowUnderlay.bind(this)}>
            <Text style={styles.primaryButtonText}
              onPress={()=> this.handleSubmit()}>
              Add Income
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.refresh.bind(this)} style={this.state.pressStatus2? styles.pressedButton : styles.button}
            onHideUnderlay={this._onHideUnderlay2.bind(this)}
            onShowUnderlay={this._onShowUnderlay2.bind(this)}>
            <Text style={styles.primaryButtonText}>
              Refresh
            </Text>
          </TouchableHighlight>
      </View>
      );
    }
  }

export default Incomes
