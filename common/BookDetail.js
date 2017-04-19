import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Slider,
} from 'react-native';

import styles from "./PolliStyles";
import FitImage from 'react-native-fit-image';

import Icon2 from 'react-native-vector-icons/FontAwesome';

export default class BookDetail extends React.Component {

  static navigationOptions = {
    title: 'Book Details',
  };

  constructor(props){
    super(props);
    this.state = {
      sliderValue: 0.5,
      currentRating: global.currentBook.rating,
    };
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

  getSliderIndex(value){
    switch (value){
      case 0:{
        return "A";
      }
      case 0.25:{
        return "B";
      }
      case 0.5:{
        return "C";
      }
      case 0.75:{
        return "D";
      }
      case 1:{
        return "E";
      }
    }
  }

  renderRating(){
    var rating = this.state.currentRating;

    jsx_rating = []
    jsx_rating.push(this.renderStar(1,rating));
    jsx_rating.push(this.renderStar(2,rating));
    jsx_rating.push(this.renderStar(3,rating));
    jsx_rating.push(this.renderStar(4,rating));
    jsx_rating.push(this.renderStar(5,rating));

    return jsx_rating;
  }

  renderStar(id,rating){
    var decimal_value = (id - rating);

    var starType = "star-o";
    if (id <= rating){
      starType = "star";
    } else if (decimal_value > 0 && decimal_value < 1){
      starType = "star-half-o";
    }
    return <Icon2 name={starType} size={40} color='orange' onPress ={()=>this.setState({currentRating:id})} onLongPress = {()=>this.setState({currentRating: (id - 0.5)})}/>
  }

  showReader() {
      const { navigate } = this.props.navigation;
      console.log("this.props.navigation = " + this.props.navigation);
      navigate('Reader',{blend: this.getSliderIndex(this.state.sliderValue)});
  }

  render() {

    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailTitle}>
          <FitImage
            source={{uri: global.currentBook.thumbnail}}
            style={styles.detailThumbnail}
          />
          <View style={styles.detailTitleRight}>
            <Text style={styles.detailTitleBook}>{global.currentBook.title}</Text>
            <Text style={styles.detailTitleText}>{global.currentBook.author}</Text>
            <View style={styles.detailTitleRating} >
              {this.renderRating(this.state.rating)}
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
            <Text style={styles.detailTitleText}>{global.currentBook.L1} and {global.currentBook.L2}</Text>
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
          <Text style={styles.detailButton} onPress={()=>this.showReader()}>Start reading!</Text>
        </View>
      </View>
    );
  }
}
