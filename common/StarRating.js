import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './PolliStyles';

import Icon2 from 'react-native-vector-icons/FontAwesome';

export default class StarRating extends Component {

  renderStar(id,rating){
    var decimal_value = (id - rating);

    var starType = "star-o";
    if (id <= rating){
      starType = "star";
    } else if (decimal_value > 0 && decimal_value < 1){
      starType = "star-half-o";
    }
    return <Icon2 key={id} name={starType} size={40} color='orange' onPress ={()=>this.props.updateRating(id)} onLongPress = {()=>this.props.updateRating(id - 0.5)}/>
  }

  render(){
    var rating = this.props.currentRating;

    jsx_rating = [];
    for(var i=1; i<=this.props.maxRating; i++) {
        jsx_rating.push(this.renderStar(i,rating));
    }

    return <View style={styles.detailTitleRating} >
      {jsx_rating}
    </View>;
  }

}
