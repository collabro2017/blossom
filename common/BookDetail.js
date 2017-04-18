import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Slider,
} from 'react-native';

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

var styles = StyleSheet.create({
  //details screen
  detailContainer: {
    flex: 1,
    //borderWidth: 2,
    margin: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTitle: {
    height: 200,
    flexDirection: 'row',
    //borderWidth: 2,
  },
  detailTitleRight: {
    margin: 20,
  },
  detailTitleBook: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailTitleText: {
    fontSize: 20,
    justifyContent: 'center',
  },
  detailIconContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    margin: 10,
  },
  detailIcon: {
    marginRight: 20,
  },
  detailThumbnail: {
    borderWidth: 2,
    width: 120,
  },
  detailMain: {
    //marginTop: 30,
    alignItems:'flex-start',
  },
  detailBottom: {
    alignItems: 'center',
  },
  detailTitleRating: {
    flexDirection:'row',
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: 'green',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 80,
    paddingLeft: 80,
    fontSize: 20,
  },
  detailSlider: {
    height: 10,
    margin: 10,
    width: 300,
  },
  detailSliderLabel: {
    alignItems:'center',
    borderWidth: 3
  },
});
