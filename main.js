import Expo, { SQLite, Permissions, Contacts } from 'expo';
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './src/drawer/home';

const db = SQLite.openDatabase({ name: 'db.db' });

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
    </View>
    <DrawerItems {...props} />
  </View>
);

const MainRoot = DrawerNavigator(
  {
    Home: {
      path: '/home',
      screen: Home,
    }/*,
    SwipeDecker: {
      path: '/swiper_decker',
      screen: SwipeDecker,
    },
    Ratings: {
      path: '/ratings',
      screen: Ratings,
    },
    Pricing: {
      path: '/pricing',
      screen: Pricing,
    },*/
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
        marginTop: 15
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
  }
);

class App extends React.Component {
  state = {
    isReady: false,
  };

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <Components.AppLoading />;
    }

    return (
      <MainRoot />
    );
  }

  _loadContacts = async () => {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    const contacts = await Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
      ],
      pageOffset: 0,
    });
    let results = [];
    if (contacts.total > 0) {
      contacts.data.map((contact) => {
        let phoneNo = [];
        contact.phoneNumbers.map((phoneNumber, i) => {
          phoneNo.push(phoneNumber.number);
        });
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO contacts(name, phoneNo) VALUES(?, ?);',
            [contact.name, phoneNo.join(",")]
          );
        });
      });
    }
  };

  async _cacheContactsAsync() {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE if exists contacts;'
      );
      tx.executeSql(
        'create table if not exists contacts (id integer primary key autoincrement, name text, phoneNo text);'
      );
    });

    this.setState({isReady: true});
  }
}


Expo.registerRootComponent(App);
