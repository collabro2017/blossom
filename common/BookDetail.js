import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Slider,
} from 'react-native';

import styles, {colors} from "./PolliStyles";
import FitImage from 'react-native-fit-image';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from './StarRating';

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
    return (<StarRating
              currentRating={this.state.currentRating}
              maxRating={STAR_MAX}
              updateRating={(rating)=>this.updateRating(rating)}
             />);
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
            {this.renderRating()}
            <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText} onPress={()=>this.showReader()}>Read now!</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailMain}>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="counter" size={30} color={colors.primaryDark}/>
            <Text style={[styles.detailInfoText, styles.colorPrimary]}>I have read this book {this.state.readCount} times</Text>
          </View>
          <View style={styles.detailIconContainer}>
            <Icon2 style={styles.detailIcon} name="translate" size={30} color={colors.tertiaryDark}/>
            <Text style={[styles.detailInfoText, styles.colorTertiary]}>{global.currentBook.L1} and {global.currentBook.L2}</Text>
          </View>

          <View style={styles.sliderContainer}>
              <Slider value={this.state.sliderValue}
                      step={1}
                      maximumValue={STAR_MAX-1}
                      style={styles.detailSlider}
                      minimumTrackTintColor={colors.secondary}
                      onValueChange={(data)=>this.updateBlendLevel(data)}
                    />

              <View style={styles.detailIconContainer}>
                <Icon2 style={styles.detailIcon} name="gauge" size={30} color={colors.secondary}/>
                <Text style={styles.detailInfoText}>{this.getSliderLabel(this.state.sliderValue)}</Text>
              </View>
          </View>


        </View>
      </View>
    );
  }
}
