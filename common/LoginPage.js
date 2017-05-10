import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import styles from './PolliStyles';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default class LoginPage extends Component{
  static navigationOptions = {
    title: 'Welcome to Polli!',
  };
  constructor(props) {
    super(props);
    this.state={
      email: null,
      password: null,
    };
  }

  showFrontPage(demoUserEnabled=false){
    if (demoUserEnabled) {
      global.user = true;
    }else{
      global.user = null;
    }
    const {navigation} = this.props;
    navigation.navigate('FrontPage');
  }

  render () {

    return (
      <ScrollView style={styles.loginContainer} contentContainerStyle={styles.loginContentContainer}>
        <View>
          <Image source={require('../images/Icon-76.png')} />
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
            <Icon2.Button name="sign-in" backgroundColor="#00a1f1" style={styles.loginButton}
              onPress={()=>this.showFrontPage(true)}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Icon2.Button>
          </View>
          <View style={styles.loginSignUpContainer}>
              <Text style={styles.loginSignUpText}>No account yet? </Text>
              <Text style={styles.loginSignUpLink} onPress={()=>this.showFrontPage(false)}>Sign Up</Text>
          </View>
          <View style={styles.loginButtonContainer}>
            <Icon2.Button name="facebook" iconStyle={{marginLeft:3,marginRight:15}} backgroundColor="#3b5998" style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login with Facebook</Text>
            </Icon2.Button>
          </View>
          <View style={styles.loginButtonContainer}>
            <Icon2.Button name="google" backgroundColor="#ea4335" style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login with Google</Text>
            </Icon2.Button>
          </View>

        </View>
      </ScrollView>
    );
  }
}
