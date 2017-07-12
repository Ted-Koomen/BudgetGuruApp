// import React, { Component } from 'react';
// import { ScrollView } from 'react-native';
//
// import colors from '../config/colors';
// import { TextInput, View } from '../components/TextInput';
// import { PrimaryButton } from '../components/Buttons'
//
// const fields = [
//   { placeholder: 'Bill', stateKey: 'billName' },
//   { placeholder: 'Amount', stateKey: 'billAmount' },
// ]
//
// class NewContact extends Component{
//     constructor(props){
//       super(props);
//
//       this.state = {
//
//       };
//     }
//
//     onInputChange = (text, stateKey) => {
//       const mod = {};
//       mod[stateKey] = text;
//       this.setState(mod);
//     }
//
//     handleSubmit = () => {
//       alert("Submit");
//     }
//     render(){
//         return(
//             <ScrollView style={{ backgroundColor: colors.background }}>
//               {
//                 fields.map((field) =>(
//                   <TextInput
//                     key={field.stateKey}
//                     onChangeText={(text) => this.onInputChange(text, field.stateKey)}
//                     {...field}
//                   />
//                 ))
//               }
//               <PrimaryButton
//                 onPress={()=> this.handleSubmit()}
//                 label="Save"
//               />
//             </ScrollView>
//         );
//     }
// }
//
// export default NewContact;
