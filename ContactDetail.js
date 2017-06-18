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
      ["0815", "Mentari"],
      ["0816", "Matrix"],
      ["0855", "Matrix"],
      ["0856", "IM3"],
      ["0857", "IM3"],
      ["0858", "Mentari"],
      ["0811", "Kartu Halo"],
      ["0812", "Simpati"],
      ["0813", "Simpati"],
      ["0821", "Simpati"],
      ["0822", "Simpati"],
      ["0823", "Simpati"],
      ["0851", "Kartu As Flexi"],
      ["0852", "Kartu As"],
      ["0853", "Kartu As"],
      ["0817", "XL"],
      ["0818", "XL"],
      ["0819", "XL"],
      ["0877", "XL"],
      ["0878", "XL"],
      ["0859", "XL"],
      ["0877", "XL"],
      ["0878", "XL"],
      ["0879", "XL"],
      ["0831", "AXIS"],
      ["0832", "AXIS"],
      ["0833", "AXIS"],
      ["0838", "AXIS"],
      ["0881", "Smart-Fren"],
      ["0882", "Smart-Fren"],
      ["0883", "Smart-Fren"],
      ["0884", "Smart-Fren"],
      ["0885", "Smart-Fren"],
      ["0886", "Smart-Fren"],
      ["0887", "Smart-Fren"],
      ["0888", "Smart-Fren"],
      ["0889", "Smart-Fren"],
      ["0895", "Three"],
      ["0896", "Three"],
      ["0897", "Three"],
      ["0898", "Three"],
      ["0899", "Three"],
      ["0828", "Ceria"],
      ["0868", "Byru"],
      ["888-", "US BASED"]
    ]);
    let prefix = '';
    number = number.replace(" ", "");
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
