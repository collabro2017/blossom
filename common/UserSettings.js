import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Slider,
} from 'react-native';

import FitImage from 'react-native-fit-image';
import mixins from './Mixins';

import styles from './PolliStyles';
import Hr from 'react-native-hr';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import GeneralPicker from './Picker';

export default class UserSettings extends Component{
  static navigationOptions = {
    title: 'User Settings',
  };
  constructor(props) {
    super(props);
    this.state={
      editmode: false,
      email:"jentin@t19.com",
      password: "longpassword",
      ageSliderValue: 0.2,
      nativeLang: "Eng",
      secondaryLang: "Spa",
      subscriptionActive: true,
    };
  }

  toggleEditable(value){
    this.setState({editmode:value});
  }
  getAge(){
    return parseInt(this.state.ageSliderValue*10) + 3;
  }
  renderSlider(){
    if (this.state.editmode){
      return (<Slider value={this.state.ageSliderValue}
              step={0.1}
              style={styles.detailSlider}
              onValueChange={(data)=>this.setState({ageSliderValue:data})}
            />);
    } else {
      return null;
    }
  }
  renderSubscription(){
    if (this.state.editmode){
      return (
        <View style={[styles.settingsButtonContainer,{marginTop:20}]}>
            <Button
              title="Deactivate Account"
              color="navy"
              style={styles.settingsButton}
            />
        </View>
      );
    }else{
      return (
        <View>
        <View style={styles.settingsField}>
          <Text style={styles.settingsTextTitle}>Subscription Status:</Text>
          <Text style={styles.settingsTextInput}>Active</Text>
        </View>
        <View style={styles.settingsField}>
          <Text style={styles.settingsTextTitle}>Since:</Text>
          <Text style={styles.settingsTextInput}>June 2016</Text>
        </View>
        </View>
      );
    }
  }

  render () {
    if (this.state.editmode){
      underlineColor='black';
    }else{
      underlineColor='transparent';
    }

    var languageOptions = {

        Eng: 'English',
        Spa: 'Spanish',
        Chi: 'Chinese',
        Ger: 'German'

    };

    return (
      <ScrollView style={styles.settingsContainer}>
        <View style={styles.settingsSection}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.settingsSectionTitle}>
              Account Details
            </Text>
            <Icon2
              style={styles.detailIcon} name="pencil" size={30} color='black'
              onPress={()=>this.toggleEditable(!this.state.editmode)}
            />
          </View>
          <View style={styles.settingsField}>
            <Text style={styles.settingsTextTitle}>Email:</Text>
            <TextInput
              style={styles.settingsTextInput}
              value={this.state.email}
              underlineColorAndroid= {underlineColor}
              editable={this.state.editmode}
              onChangeText={(text)=>this.setState({email:text})}
            />
          </View>
          <View style={styles.settingsField}>
            <Text style={styles.settingsTextTitle}>Password:</Text>
            <TextInput
              style={styles.settingsTextInput}
              value={this.state.password}
              underlineColorAndroid= {underlineColor}
              editable={this.state.editmode}
              secureTextEntry={true}
              onChangeText={(text)=>this.setState({password:text})}
            />
          </View>
        </View>
        <Hr lineColor='black'/>
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>
            Reader Information
          </Text>
          <View>
            <View style={styles.settingsField}>
              <Text style={styles.settingsTextTitle}>Age:</Text>
              <Text style={styles.settingsTextInput}>{this.getAge()}</Text>
            </View>
            {this.renderSlider()}
          </View>
          <View style={styles.settingsField}>
            <Text style={styles.settingsTextTitle}>Native language:</Text>
            <GeneralPicker enabled={this.state.editmode} pickerOptions={languageOptions} selected={this.state.nativeLang} onValueChange={(key)=>{this.setState({nativeLang: key})}}/>
          </View>
          <View style={styles.settingsField}>
            <Text style={styles.settingsTextTitle}>Secondary language:</Text>
            <GeneralPicker enabled={this.state.editmode} pickerOptions={languageOptions} selected={this.state.secondaryLang} onValueChange={(key)=>{this.setState({secondaryLang: key})}}/>
          </View>
        </View>
        <Hr lineColor='black' />
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>
            Subscription
          </Text>
          {this.renderSubscription()}
        </View>

      </ScrollView>
    );
  }
}
