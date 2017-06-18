import Expo from 'expo';
import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ButtonsTab from '../tabs/buttons';
import ListsTab from '../tabs/lists';
import ContactsTab from '../tabs/contacts';
import FormsTab from '../tabs/forms';
import FontsTab from '../tabs/fonts';

const Home = TabNavigator(
  {
    ButtonsTab: {
      screen: ButtonsTab,
      path: '/buttons',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='home'
            size={20}
            color={tintColor}
          />
        )
      },
    },
    ContactsTab: {
      screen: ContactsTab,
      path: '/contacts',
      navigationOptions: {
        tabBarLabel: 'Contacts',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name="contacts" size={20} color={tintColor} />
        ),
      },
    },
    /*FormsTab: {
      screen: FormsTab,
      path: '/forms',
      navigationOptions: {
        tabBarLabel: 'Forms',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name="wpforms"
            size={30}
            type="font-awesome"
            color={tintColor}
          />
        ),
      },
    },
    FontsTab: {
      screen: FontsTab,
      path: '/fonts',
      navigationOptions: {
        tabBarLabel: 'Fonts',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'font' : 'font'}
            size={30}
            type="font-awesome"
            color={tintColor}
          />
        ),
      },
    },*/
  },
  {
    initialRouteName: 'ButtonsTab',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#fff',
      showIcon: true,
      style: {
        marginTop: 24
      }
    },
  }
);

Home.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="home"
      size={30}
      style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      type="material-community"
      color={tintColor}
    />
  ),
};

export default Home;
