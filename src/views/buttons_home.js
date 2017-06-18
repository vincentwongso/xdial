import Expo, {Constants, Location, Permissions} from 'expo';
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';

import { Text, Button, Icon, SocialIcon, Card } from 'react-native-elements';

import colors from 'HSColors';
import socialColors from 'HSSocialColors';
import fonts from 'HSFonts';

import firebase from '../firebase/firebase';

import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyDKSGOuo7sBoRIGPGUOhpBDWRBvJ6bL1-g');

const log = () => {
  console.log('Attach a method here.');
};

class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: null,
      pageContent: null
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
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    Geocoder.getFromLatLng(location.coords.latitude, location.coords.longitude).then(
      json => {
        let address_component = json.results[0].formatted_address;

        this.setState({ location: address_component });
      },
      error => {
        alert(error);
      }
    );
  };

  componentDidMount() {
    const pagesRef = firebase.database().ref('pages');
    pagesRef.on('value', (snapshot) => {
      let pages = snapshot.val();
      let newState = [];
      newState.push({
        title: pages["home"].title,
      });
      this.setState({
        pageContent: {
          title: pages["home"].title,
        }
      });
    });
  }

  render() {
    const { navigation } = this.props;
    let locationText = 'Waiting..';
    if (this.state.errorMessage) {
      locationText = this.state.errorMessage;
    } else if (this.state.location) {
      locationText = JSON.stringify(this.state.location);
    }

    return (
      <ScrollView>
        <Card title="Welcome" containerStyle={{ marginTop: 15 }}>
          <View style={[styles.socialRow, { marginVertical: 10 }]}>
            {this.state.pageContent &&
            <Text>Welcome to {this.state.pageContent.title}!</Text>
            }
          </View>
          <View style={[styles.socialRow, { marginVertical: 10 }]}>
            <Text>{locationText}</Text>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.primary2,
  },
  titleContainer: {},
  button: {
    marginTop: 15,
  },
  title: {
    textAlign: 'center',
    color: colors.grey2,
    ...Platform.select({
      ios: {
        fontFamily: fonts.ios.black,
      },
    }),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Buttons;
