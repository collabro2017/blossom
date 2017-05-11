import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';

import styles from './PolliStyles';

export class OBWFirst extends Component {

  static navigationOptions = {
    title: 'Wizard First Screen',
  };

  render(){
    const {navigation} = this.props;

    return (
      <View>
        <Text>Im in the first screen</Text>
        <Text onPress={()=>navigation.navigate('OBWSecond')}>go to second</Text>
      </View>
    );
  }

}

export class OBWSecond extends Component {

  static navigationOptions = {
    title: 'Wizard Second Screen',
  };

  render(){
    const {navigation} = this.props;

    return (
      <View>
        <Text>Im in the second screen</Text>
        <Text onPress={()=>navigation.navigate('OBWThird')}>go to third</Text>
      </View>
    );
  }

}

export class OBWThird extends Component {

  static navigationOptions = {
    title: 'Wizard Third Screen',
  };

  render(){
    const {navigation} = this.props;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'FrontPage' })
      ]
    });
    return (
      <View>
        <Text>Im in the third screen</Text>
        <Text onPress={()=>navigation.dispatch(resetAction)}>Finish wizard</Text>
      </View>
    );
  }

}
