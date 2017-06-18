import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView,
} from 'react-native';

import {
  Text,
  Card,
  ButtonGroup,
  Slider,
  Tile,
  Grid,
  Col,
  Row,
  Avatar,
  Icon,
  List,
  ListItem,
} from 'react-native-elements';

import colors from 'HSColors';

const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    phoneNo: '+62818135377'
  },
  {
    name: 'thot leader',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    phoneNo: '+62818135377'
  },
  {
    name: 'jsa',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    phoneNo: '+62818135377'
  },
  {
    name: 'talhaconcepts',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
    phoneNo: '+62818135377'
  },
  {
    name: 'andy vitale',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
    phoneNo: '+62818135377'
  },
  {
    name: 'katy friedson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    phoneNo: '+62818135377'
  },
];

const log = () => console.log('this is an example method');

class ContactsHome extends Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: 0,
      value: 0.5,
    };
  }

  render() {
    const { navigation } = this.props;
    const buttons = ['Button1', 'Button2'];
    const { selectedIndex } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          {users.map((u, i) =>
            <Card key={i} title={u.name}>
              <View style={styles.user}>
                <Text style={styles.name}>{u.phoneNo}</Text>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.secondary,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default ContactsHome;
