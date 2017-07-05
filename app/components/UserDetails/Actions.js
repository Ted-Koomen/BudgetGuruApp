import React from 'react';
import { View} from 'react-native';
import Row from './Row'
import { toPhoneNumber } from '../../helpers/string';
import styles from './styles'

const Actions = ({ email, cell }) =>{
  return(
    <View style={styles.actionContainer}>
      <Row
        label='email'
        body={email}
        actions={[{
          onPress:() => null,
          iosIcon: 'ios-mail',
          androidIcon:'md-mail'}
        ]}
      />
    </View>
  )
};

export default Actions;
