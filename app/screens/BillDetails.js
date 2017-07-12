import React, { Component } from 'react';
import { View, Text, ScrollView, AlertIOS } from 'react-native';
import { Header, Actions, Info } from '../components/UserDetails';
import colors from '../config/colors';
import { PrimaryButton } from '../components/Buttons';
import EditBill from './EditBill';

//want amount and name of bill in this screen
class Details extends Component{
    constructor(){
      super()
    }

    handleSubmit(){
      let bill = this.props.navigation.state.params
      this.props.navigation.navigate('EditBill',bill)
    }

    handleDelete(){
      fetch("https://budgetguru.herokuapp.com/bills", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.navigation.state.params.id,
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "Successfully deleted"
            )
            this.props.navigation.navigate('Bills')
        })
      .done();
    }

    render(){
      const contact = this.props.navigation.state.params;
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
                <Header {...contact} />

                <Info bill={contact}/>
                <PrimaryButton
                  onPress={()=> this.handleSubmit()}
                  label='Edit Bill'
                />

              <View>
                <PrimaryButton
                  onPress={()=> this.handleDelete()}
                  label="Delete Bill"
                />
              </View>

            </ScrollView>
        );
    }
}

export default Details;
