import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Slider,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles, {colors} from "./PolliStyles";
import FitImage from 'react-native-fit-image';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from './StarRating';

const STAR_MAX = 5;

export default class BookLibraryDetail extends React.Component {

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
    return (<StarRating
              currentRating={this.state.currentRating}
              maxRating={STAR_MAX}
              updateRating={()=>{}}
             />);
  }

  showReader() {
      const { navigate } = this.props.navigation;
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
            <TouchableOpacity style={styles.detailLibraryButton}>
                <Text style={styles.detailButtonText} onPress={()=>this.showReader()}><Icon2 style={styles.detailIcon} name="download" size={20} color={colors.primaryDark}/>  Add to my Library</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.detailScrollView}>
            <View style={styles.detailMain}>

                <View style={styles.detailSection}>
                    <View style={[styles.detailTitleContainer]}>
                      <Icon2 style={styles.detailIcon} name="earth" size={30} color={colors.textOnSecondary}/>
                      <Text style={styles.detailInfoTitle}>Secondary langauge</Text>
                    </View>
                    <Text style={styles.detailInfoText}>{global.currentBook.L2}</Text>
                </View>

              <View >
                    <View style={styles.detailSection}>
                        <View style={[styles.detailTitleContainer, styles.backgroundTertiary]}>
                            <Icon2 style={styles.detailIcon} name="book" size={30} color={colors.textOnSecondary}/>
                            <Text style={styles.detailInfoTitle}>Description</Text>
                        </View>
                        <Text style={styles.detailInfoText}>{global.currentBook.about}</Text>
                    </View>

                    <View style={styles.detailSection}>
                        <View style={[styles.detailTitleContainer, styles.backgroundQuaternary]}>
                            <Icon2 style={styles.detailIcon} name="clock" size={30} color={colors.textOnSecondary}/>
                            <Text style={styles.detailInfoTitle}>Ages</Text>
                        </View>
                        <Text style={styles.detailInfoText}>{global.currentBook.ages}</Text>
                    </View>

                    <View style={styles.detailSection}>
                        <View style={[styles.detailTitleContainer, styles.backgroundQuinary]}>
                            <Icon2 style={styles.detailIcon} name="pen" size={30} color={colors.textOnSecondary}/>
                            <Text style={styles.detailInfoTitle}>Publisher</Text>
                        </View>
                        <Text style={styles.detailInfoText}>{global.currentBook.publisher}</Text>
                    </View>
              </View>


            </View>
        </ScrollView>
      </View>
    );
  }
}
