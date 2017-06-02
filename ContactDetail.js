import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, Linking } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'

import call from 'react-native-phone-call';


export default class ContactDetail extends Component {
  constructor(props) {
    super(props);
  }

  getProvider(number) {
    let providerMapping = new Map([
      ["0814", "Indosat"],
      ["0815", "Indosat"],
      ["0816", "Indosat"],
      ["0855", "Indosat"],
      ["0856", "Indosat"],
      ["0857", "Indosat"],
      ["0858", "Indosat"],
      ["0811", "Telkomsel"],
      ["0812", "Telkomsel"],
      ["0813", "Telkomsel"],
      ["0821", "Telkomsel"],
      ["0822", "Telkomsel"],
      ["0851", "Telkomsel"],
      ["0852", "Telkomsel"],
      ["0853", "Telkomsel"],
      ["0817", "XL"],
      ["0818", "XL"],
      ["0819", "XL"],
      ["0877", "XL"],
      ["0878", "XL"],
      ["0859", "XL"],
      ["0877", "XL"],
      ["0878", "XL"],
      ["0831", "XL"],
      ["0832", "XL"],
      ["0833", "XL"],
      ["0838", "XL"],
      ["0881", "Smartfren"],
      ["0882", "Smartfren"],
      ["0883", "Smartfren"],
      ["0884", "Smartfren"],
      ["0885", "Smartfren"],
      ["0886", "Smartfren"],
      ["0887", "Smartfren"],
      ["0888", "Smartfren"],
      ["0889", "Smartfren"],
      ["0895", "3"],
      ["0896", "3"],
      ["0897", "3"],
      ["0898", "3"],
      ["0899", "3"],
      ["888-", "US BASED"]
    ]);
    let prefix = '';
    if (number.substring(0,3) === '+62') {
      prefix = '0'+number.substring(3);
      prefix = prefix.substring(0,4);
    } else if (number.substring(0,2) === '62') {
      prefix = '0'+number.substring(2);
      prefix = prefix.substring(0,4);
    } else {
      prefix = number.substring(0,4);
    }
    console.log(prefix);
    if (providerMapping.has(prefix)) {
      console.log("Provider: " + providerMapping.get(prefix));
      return providerMapping.get(prefix)
    }
    return "Unknown";
  }

  /*_handleClick = (number) => {
    call({
      number: number,
      prompt: true
    }).catch(console.error);
  };*/

  _handleClick = (number) => {
    Linking.canOpenURL("telprompt:" + number).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + number);
      } else {
        return Linking.openURL("telprompt:" + number);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  render() {
    const {contact, closeContactDetail, visible} = this.props;
    return (

    <View style={{marginTop: 22}}>
      {contact !== null &&
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={visible}
      >
        <View style={styles.container}>
          <View>
            <Text numberOfLines={1} style={styles.titleBox}>{contact.name}</Text>
            <List containerStyle={{marginBottom: 20}}>
              {
                contact.phoneNumbers.map((phoneNumber, i) => (
                  <ListItem
                    onPress={() => this._handleClick(phoneNumber.number)}
                    key={i}
                    title={phoneNumber.number + " (" + this.getProvider(phoneNumber.number) + ")"}
                  />
                ))
              }
            </List>
            <Button title="BACK" onPress={closeContactDetail}/>
          </View>
        </View>
      </Modal>
      }
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22
  },
  titleBox: {
    fontSize: 20,
    padding: 20,
    justifyContent: "center"
  },

});
