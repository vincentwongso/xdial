'use strict';

import Expo from 'expo';
import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight, ScrollView} from 'react-native';
import { List, ListItem} from 'react-native-elements'

import ContactDetail from './ContactDetail';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: null
    };
  }

  componentDidMount() {
    this._loadContacts().done();
  }

  _onPressButton = (contact) => {
    console.log(contact);
    this.setState({selectedContact: contact});
  };

  closeContactDetail = () => {
    this.setState({selectedContact: null});
  };

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
      pageSize: 100,
      pageOffset: 0,
    });
    let results = [];
    if (contacts.total > 0) {
      contacts.data.map((contact) => {
        console.log(contact.phoneNumbers);
        results.push({
          name: contact.name,
          phoneNumbers: contact.phoneNumbers
        });
      });
    }
    this.setState({
      contacts: results
    });
  };

  render() {
    const {contacts, selectedContact} = this.state;
    console.log(contacts);
    return (
      <ScrollView style={styles.container}>
        <ContactDetail visible={selectedContact !== null} contact={selectedContact} closeContactDetail={this.closeContactDetail} />
        <Text h1 style={{marginTop: 20}}>Contact List</Text>
        <List containerStyle={{marginBottom: 20}}>
          {
            contacts.map((contact, i) => (
              <ListItem
                key={i}
                onPress={() => this._onPressButton(contact)}
                roundAvatar
                avatar={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                title={contact.name}
                subtitle={
                  <View style={styles.subtitleView}>
                    {contact.phoneNumbers.map((phoneNumber, i) => (
                      <Text numberOfLines={1} ellipsizeMode="tail" key={i} style={styles.ratingText}>{phoneNumber.number + "\n"}</Text>
                    ))
                    }
                  </View>

                }
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});

Expo.registerRootComponent(App);
