import { StyleSheet, Platform } from 'react-native';

import colors from '../../config/colors';

export default StyleSheet.create({
  primaryButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
   subcontainer:{
    marginTop:10,
    borderRadius: 10

  },
  primaryButton:{
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#2eba66',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    
    borderRadius:10,
    width: 300
  },
  primaryButtonText:{
    paddingVertical: 15,
    paddingHorizontal: 40,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
  height: 50,
    justifyContent: 'center',
    backgroundColor: '#2eba66',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    
    borderRadius:10,
    width: 300
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  
    // paddingTop: 80
  },

  });