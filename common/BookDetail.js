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

import LocalLibraryDAO from './LocalLibraryDAO.js';
var LocalLibrary = new LocalLibraryDAO();

const STAR_MAX = 5;

export default class BookDetail extends React.Component {

  static navigationOptions = {
    title: 'Book Details',
  };

  static blendLevelLabels = [
      "95% English",
      "Mostly English",
      "50% Each",
      "Mostly Spanish",
      "95% Spanish"
  ];

  static blendLevelIndexes = [
      "A",
      "B",
      "C",
      "D",
      "E"
  ];

  updateBookStats(statsArray) {
      var stats = statsArray[0] || {};
      console.log('stats for book ID ' + global.currentBook.bookId, stats);

      global.currentBook.rating = stats.rating || 0;
      global.currentBook.blendLevel = stats.blendLevel || 0;
      global.currentBook.readCount = stats.readCount || 0;

      this.setState({
              currentRating: stats.rating,
              sliderValue: stats.blendLevel,
              readCount: stats.readCount
          }
      );
  }

  constructor(props){
    super(props);

    this.state = {
      sliderValue: 0,
      currentRating: 0,
      readCount: 0
    };
  }

  componentDidMount() {
      LocalLibrary.get(global.currentBook.bookId, this.updateBookStats.bind(this));
  }

  getSliderLabel(value){
    return BookDetail.blendLevelLabels[value];
  }

  getSliderIndex(value){
    return BookDetail.blendLevelIndexes[value];
  }

  renderRating(){
    var rating = this.state.currentRating;

    jsx_rating = [];
    for(var i=1; i<STAR_MAX; i++) {
        jsx_rating.push(this.renderStar(i,rating));
    }

    return jsx_rating;
  }

  updateRating(rating) {
      this.setState({currentRating:rating});
      global.currentBook.rating = rating;
      LocalLibrary.update(global.currentBook);
  }

  updateReadCount(count) {
      this.setState({readCount:count});
      global.currentBook.readCount = count;
      LocalLibrary.update(global.currentBook);
  }

  updateBlendLevel(level) {
      this.setState({sliderValue:level});
      global.currentBook.blendLevel = level;
      LocalLibrary.update(global.currentBook);
  }

  renderStar(id,rating){
    var decimal_value = (id - rating);

    var starType = "star-o";
    if (id <= rating){
      starType = "star";
    } else if (decimal_value > 0 && decimal_value < 1){
      starType = "star-half-o";
    }
    return <Icon2 key={id} name={starType} size={40} color='orange' onPress ={()=>this.updateRating(id)} onLongPress = {()=>this.updateRating(id - 0.5)}/>
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
              {this.renderRating(this.state.currentRating)}
            </View>
          </View>
        </View>
        <View style={styles.detailMain}>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="trophy" size={40} color='purple'/>
            <Text style={styles.detailTitleText}>I've read this book {this.state.readCount} times</Text>
          </View>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="globe" size={40} color='blue'/>
            <Text style={styles.detailTitleText}>{global.currentBook.L1} and {global.currentBook.L2}</Text>
          </View>

          <Slider value={this.state.sliderValue}
                  step={1}
                  maximumValue={STAR_MAX-1}
                  style={styles.detailSlider}
                  onValueChange={(data)=>this.updateBlendLevel(data)}
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
