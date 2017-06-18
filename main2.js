'use strict';

import Expo, { Location, Permissions } from 'expo';
import React from 'react';
import {Platform, StyleSheet, View, Text, TouchableHighlight, ScrollView} from 'react-native';
import { List, ListItem} from 'react-native-elements'

import ContactDetail from './ContactDetail';
import Geocoder from 'react-native-geocoder';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: null,
      isReady: false,
      position: null,
      errorMessage: null
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {

      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    console.log("get location async");
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    console.log(Geocoder);
    Geocoder.fallbackToGoogle('AIzaSyCMf3CneUGn6OzAouukT69bBzQa4zuqXy4');
    try {
      let results = await Geocoder.geocodePosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      this.setState({position: results});
    } catch(err) {
      console.log(err);
    }

  };
/*
  async getCurrentPosition(position) {
    console.log("Get reverse geocoding from: ", position);
    Geocoder.fallbackToGoogle('AIzaSyCMf3CneUGn6OzAouukT69bBzQa4zuqXy4');
    return await Geocoder.geocodePosition({lat: position.coords.latitude, lng: position.coords.longitude});
  }
*/
  componentDidMount() {
    /*navigator.geolocation.getCurrentPosition((position) => {
      console.log("Getting position:");
      try {
        this.getCurrentPosition(position).then(data => {
          console.log(data);
        });
      } catch(err) {
        console.log(err);
      }

    });*/
    console.log(this.state.errorMessage);
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
      pageSize: 250,
      pageOffset: 0,
    });
    let results = [];
    if (contacts.total > 0) {
      contacts.data.map((contact) => {
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
    const {contacts, selectedContact, position, errorMessage} = this.state;

    return (
      <ScrollView style={styles.container}>
        <ContactDetail visible={selectedContact !== null} contact={selectedContact} closeContactDetail={this.closeContactDetail} />
        <Text h1 style={{marginTop: 20}}>Contact List</Text>
        {position !== null &&
        <Text h1 style={{marginTop: 20}}>Your location: {JSON.stringify(position)}</Text>
        }
        {errorMessage &&
        <Text h1 style={{marginTop: 20}}>{errorMessage}</Text>
        }
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
