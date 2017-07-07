import React from 'react';
import { View, Text, TouchableHighlight, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import styles, { CHEVRON_SIZE } from './styles';
import { capitalizeFirstLetter } from '../../helpers/string';
import colors from '../../config/colors';

const ListItem = ({bill_name, onPress})=>{
  // const name = `${capitalizeFirstLetter(contact.name)} `
  const name = bill_name
  const iconName = Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward';
  return(
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors.rowUnderlay}
      >
      <View style={styles.row}>
          {/* <Image
            source={{ uri: contact.picture.thumbnail }}
            style = {styles.avatar}
          /> */}
          <View>
            <Text style={styles.name}>{name}</Text>
            {/* <Text style={styles.email}>{contact.email}</Text> */}
          </View>
          <View style={styles.chevronContainer}>
            <Icon
              name="ios-arrow-forward"
              size={CHEVRON_SIZE}
              color={colors.subtleText}
              style={styles.chevron}
            />
          </View>
      </View>
    </TouchableHighlight>
  )
}

export default ListItem;
