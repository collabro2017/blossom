import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Slider,
} from 'react-native';

import styles from "./PolliStyles";

import Icon2 from 'react-native-vector-icons/FontAwesome';

export default class BookDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {sliderValue: 0.5};
  }

  getSliderLabel(value){
    switch (value){
      case 0:{
        return "95% English";
      }
      case 0.25:{
        return "Mostly English";
      }
      case 0.5:{
        return "50% Each";
      }
      case 0.75:{
        return "Mostly Spanish";
      }
      case 1:{
        return "95% Spanish";
      }
    }
  }

  render() {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailTitle}>
          <Text style={styles.detailThumbnail}>image here</Text>
          <View style={styles.detailTitleRight}>
            <Text style={styles.detailTitleBook}>Book Title</Text>
            <Text style={styles.detailTitleText}>Author</Text>
            <View style={styles.detailTitleRating} >
              <Icon2 name="star" size={40} color='orange'/>
              <Icon2 name="star" size={40} color='orange' />
              <Icon2 name="star" size={40} color='orange' />
              <Icon2 name="star-half-o" size={40} color='orange' />
              <Icon2 name="star-o" size={40} color='orange' />
            </View>
          </View>
        </View>
        <View style={styles.detailMain}>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="trophy" size={40} color='purple'/>
            <Text style={styles.detailTitleText}>I've read this book 4 times</Text>
          </View>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="globe" size={40} color='blue'/>
            <Text style={styles.detailTitleText}>English and Spanish</Text>
          </View>

          <Slider value={this.state.sliderValue}
                  step={0.25}
                  style={styles.detailSlider}
                  onValueChange={(data)=>this.setState({sliderValue:data})}
                />

          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="book" size={40} color='teal'/>
            <Text style={styles.detailTitleText}>{this.getSliderLabel(this.state.sliderValue)}</Text>
          </View>


        </View>
        <View style={styles.detailBottom}>
          <Text style={styles.detailButton}>Start reading!</Text>
        </View>
      </View>
    );
  }
}
