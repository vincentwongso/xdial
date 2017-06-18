import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import ContactsHome from '../views/contacts_home';

const ContactsTabView = ({ navigation }) => (
  <ContactsHome banner="Contacts" navigation={navigation} />
);

const ContactsTab = StackNavigator({
  Home: {
    screen: ContactsTabView,
    path: '/',
    navigationOptions: () => ({
      title: 'Contacts',
    }),
  }
});

export default ContactsTab;
