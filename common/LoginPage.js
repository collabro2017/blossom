import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import styles, {propStyles} from './PolliStyles';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

export default class LoginPage extends Component{

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state={
      email: null,
      password: null,
    };
  }

  showFrontPage(){
    global.user = true;

    const {navigation} = this.props;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'FrontPage' })
      ]
    });
    navigation.dispatch(resetAction);
  }

  showUserOnboarding(){
    const {navigation} = this.props;
    navigation.navigate('OBWFirst');
  }

  render () {

    return (
      <View style={styles.loginContentContainer}>
        <View>
          <Image source={require('../images/Polli-Logo-l.png')} style={styles.loginLogo} />
        </View>
        <View style={styles.loginInputContainer}>
          <View style={styles.loginField}>
            <Text style={styles.loginTextTitle}>Email:</Text>
            <TextInput
              style={styles.loginTextInput}
              value={this.state.email}
              underlineColorAndroid= {'transparent'}
              onChangeText={(text)=>this.setState({email:text})}
            />
          </View>
          <View style={[styles.loginField,{borderTopWidth:1,borderColor:'grey'}]}>
            <Text style={styles.loginTextTitle}>Password:</Text>
            <TextInput
              style={styles.loginTextInput}
              value={this.state.password}
              underlineColorAndroid= {'transparent'}
              secureTextEntry={true}
              onChangeText={(text)=>this.setState({password:text})}
            />
          </View>
        </View>
        <View style={styles.loginButtons}>
          <View style={styles.loginButtonContainer}>
            <Icon2.Button name="sign-in" size={propStyles.iconSize} backgroundColor="#00a1f1" style={styles.loginButton}
              onPress={()=>this.showFrontPage(true)}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Icon2.Button>
          </View>
          <View style={styles.loginSignUpContainer}>
              <Text style={styles.loginSignUpText}>No account yet? </Text>
              <Text style={styles.loginSignUpLink} onPress={()=>this.showUserOnboarding()}>Sign Up</Text>
          </View>
          <View style={styles.loginButtonContainer}>
            <Icon2.Button name="facebook" size={propStyles.iconSize} iconStyle={{marginLeft:3,marginRight:15}} backgroundColor="#3b5998" style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login with Facebook</Text>
            </Icon2.Button>
          </View>
          <View style={styles.loginButtonContainer}>
            <Icon2.Button name="google" size={propStyles.iconSize} backgroundColor="#ea4335" style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login with Google</Text>
            </Icon2.Button>
          </View>

        </View>
      </View>
    );
  }
}
