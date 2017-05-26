'use strict';

import Expo from 'expo';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {contacts: []};
  }
  
  componentDidMount() {
    this._loadContacts().done();
  }
  
  _loadContacts = async () => {
    // Ask for permission to query contacts.
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
      ],
      pageSize: 10,
      pageOffset: 0,
    });
    console.log(contacts);
    let results = [];
    if (contacts.total > 0) {
      contacts.data.map((contact) => {
        results.push({
          name: contact.name,
          phoneNumbers: JSON.stringify(contact.phoneNumbers)
        });
      });
    }
    this.setState({
      contacts: results
    });
  };
  
  render() {
    let contacts = this.state.contacts;
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        {contacts.map((contact, i) =>
          <Text key={i}>{contact.name}: {contact.phoneNumbers}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
