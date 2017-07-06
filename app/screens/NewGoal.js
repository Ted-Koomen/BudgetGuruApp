import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import colors from '../config/colors';
import { TextInput, View } from '../components/TextInput';
import { PrimaryButton } from '../components/Buttons'
import Calendar from 'react-native-calendar-datepicker'



class NewGoal extends Component{
    constructor(props){
      super(props);

      this.state = {

      };
    }

    onInputChange = (text, stateKey) => {
      const mod = {};
      mod[stateKey] = text;
      this.setState(mod);
    }


    render(){
        return(
            <ScrollView style={{ backgroundColor: colors.background }}>
              <TextInput
                placeholder="Goal"
              />

              <TextInput
                placeholder="Amount"
                keyboardType='numeric'
              />
              <Calendar
                onChange={(date) => this.setState({date})}
                selected={this.state.date}

              />
              <PrimaryButton
                onPress={()=> this.handleSubmit()}
                label="Save"
              />
            </ScrollView>
        );
    }
}

export default NewGoal;
