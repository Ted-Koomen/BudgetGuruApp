import React from 'react';
import { View } from 'react-native';
import moment from 'moment';

import styles from './styles';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';


const Info = ({ login, dob, location, registered }) =>{
  return (
    <View style={styles.infoContainer}>
      <Row
        label="city"
        body={capitalizeFirstLetter(location.city)}
      />
    </View>
  )
};

export default Info
