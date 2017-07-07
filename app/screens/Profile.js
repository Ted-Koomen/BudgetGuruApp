import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Profile extends Component{
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Profile Page</Text>
            </View>
        );
    }
}

export default Profile;
