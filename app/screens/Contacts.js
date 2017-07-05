import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {contacts} from  '../config/data';
import colors from '../config/colors';
import { ListItem } from '../components/ListItem'

class Contacts extends Component {
  constructor(){
    super();
    this.state= {
      bills:[]
    }
  }

  componentDidMount(){
    axios('http://localhost:8080/bills/all')
    .then(data => {
      this.setState({
        bills: data.data
      })
    })
  }

  handleRowPress = (item) => {
    this.props.navigation.navigate('Details', item)
  };

  render() {
    return (
      <FlatList
        style={{backgroundColor: colors.background}}
        data={contacts}
        renderItem={(item)=>
        <ListItem contact={this.state.bills} onPress={() => this.handleRowPress(item)}/>
      }
      keyExtractor={(item)=>item.email}
      />
    );
  }
}

export default Contacts;
