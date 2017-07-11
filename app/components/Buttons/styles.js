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
  primaryButton:{
    borderColor: colors.border,
    borderWidth: StyleSheet.harlineWidth,
    backgroundColor: colors.link,
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
    backgroundColor: '#064F9C',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1d2b59',
    padding: 10,
    paddingTop: 80
  },

  });