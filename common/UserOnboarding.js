import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Slider,
  TextInput,
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PolliStyles';
import GeneralPicker from './Picker';

export class OBWFirst extends Component {

  static navigationOptions = {
    title: 'Sign Up (1/3)',
  };

  render(){
    const {navigation} = this.props;

    return (
      <View style={styles.obwContainer}>
        <Text style={styles.obwTitle}>Welcome to </Text>
        <Image source={require('../images/Polli-Logo-s.png')} style={styles.obwLogo} />

        <Text style={styles.obwText}>
          Polli is a bilingual e-reader that will help your young reader
          learn a new language while reading their favorite books!
        </Text>

        <View style={styles.obwImageContainer}>
          <Image source={require('../images/pr_cover.png')} style={styles.obwImage} />
          <Text style={styles.obwSmallText}>
            Once upon a time there were <Text style={{color:'#528F6B'}}>quatro</Text> rabbits,
            and their names were - Flopsy, Mopsy,
            Cotton-tail, and Peter. They lived with their
            <Text style={{color:'#BF5F2D'}}> mother</Text> in the sand-bank, underneath the root
            of a big fir-tree.
          </Text>
        </View>

        <View style={styles.obwButtonContainer}>
          <Icon.Button name="arrow-right" backgroundColor="green" style={styles.obwButton} onPress={()=>navigation.navigate('OBWSecond')}>
            <Text style={styles.obwButtonText}>Get started!</Text>
          </Icon.Button>
        </View>

      </View>
    );
  }

}

export class OBWSecond extends Component {

  static navigationOptions = {
    title: 'Sign Up (2/3)',
  };

  constructor(props) {
    super(props);
    this.state = {
      ageSliderValue: 0.1,
      nativeLang: 'Eng',
      secondaryLang: 'Spa',
    };
  }

  getAge(){
    return parseInt(this.state.ageSliderValue*10) + 3;
  }

  render(){
    const {navigation} = this.props;

    var languageOptions = {
        Eng: 'English',
        Spa: 'Spanish',
        Chi: 'Chinese',
        Ger: 'German'
    };

    return (
      <View style={styles.obwContainer}>
        <View style={styles.obwSection}>
          <Text style={styles.obwTitle}>How old is the reader?</Text>

          <Slider value={this.state.ageSliderValue}
                  step={0.1}
                  style={styles.detailSlider}
                  onValueChange={(data)=>this.setState({ageSliderValue:data})}
          />

          <Text style={styles.obwTitle}> {this.getAge()}</Text>

        </View>
        <View style={styles.obwSection}>
          <Text style={styles.obwTitle}>What Languages?</Text>

          <Text style={styles.obwText}>
            Tell us what language the reader speaks and what language you want them to learn
          </Text>

          <View style={styles.settingsField}>
            <Text style={styles.settingsTextTitle}>Native:</Text>
            <GeneralPicker pickerOptions={languageOptions} selected={this.state.nativeLang} onValueChange={(key)=>{this.setState({nativeLang: key})}}/>
          </View>
          <View style={styles.settingsField}>
            <Text style={styles.settingsTextTitle}>Secondary:</Text>
            <GeneralPicker pickerOptions={languageOptions} selected={this.state.secondaryLang} onValueChange={(key)=>{this.setState({secondaryLang: key})}}/>
          </View>


        </View>
        <View style={styles.obwButtonContainer}>
          <Icon.Button name="arrow-right" backgroundColor="green" style={styles.obwButton} onPress={()=>navigation.navigate('OBWThird')}>
            <Text style={styles.obwButtonText}>Next</Text>
          </Icon.Button>
        </View>
      </View>
    );
  }

}

export class OBWThird extends Component {

  static navigationOptions = {
    title: 'Sign Up (3/3)',
  };

  constructor(props){
    super(props);
    this.state = {
      email: 'example@mail.com',
      password: 'secretlongpassword',
      yearOfBirth: '1986',
    }
  }

  render(){
    const {navigation} = this.props;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'FrontPage' })
      ]
    });
    return (
      <View style={[styles.obwContainer, {justifyContent:'center',marginTop:40}]}>
        <Text style={styles.obwTitle}>
          Create an account
        </Text>
        <Text style={styles.obwText}>
          Create an account to save your information and start reading
        </Text>
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
          <View style={[styles.loginField,{borderTopWidth:1,borderColor:'grey'}]}>
            <Text style={styles.loginTextTitle}>Year of birth:</Text>
            <TextInput
              style={styles.loginTextInput}
              value={this.state.yearOfBirth}
              underlineColorAndroid= {'transparent'}
              onChangeText={(text)=>this.setState({yearOfBirth:text})}
            />
          </View>
        </View>
        <View style={styles.obwButtonContainer}>
          <Icon.Button name="check" backgroundColor="green" style={styles.obwButton} onPress={()=>navigation.dispatch(resetAction)}>
            <Text style={styles.obwButtonText}>Create Account</Text>
          </Icon.Button>
        </View>
      </View>
    );
  }

}
