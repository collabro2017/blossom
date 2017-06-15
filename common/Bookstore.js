import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

import DownloadableBook from './DownloadableBook';
import styles from "./PolliStyles";

import GridView from 'react-native-grid-view';
const BOOKS_TO_RENDER = 3;

const second_shelf = [
    {
        bookId: 11,
        title:"Charlotte's Web",
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs01.jpeg'
    },
    {
        bookId: 12,
        title:'Frog and Toad Are Friends',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs02.jpeg'
    },
    {
        bookId: 13,
        title:'Green Eggs and Ham',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs03.jpeg'
    },
    {
        bookId: 14,
        title:'Harold and the Purple Crayon',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs04.jpeg'
    }
];

const third_shelf = [
    {
        bookId: 11,
        title:"Charlotte's Web",
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs11.jpg'
    },
    {
        bookId: 12,
        title:'Frog and Toad Are Friends',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs12.jpg'
    },
    {
        bookId: 13,
        title:'Green Eggs and Ham',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs13.jpg'
    },
    {
        bookId: 14,
        title:'Harold and the Purple Crayon',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs14.jpg'
    }
];

const fourth_shelf = [
    {
        bookId: 11,
        title:"Charlotte's Web",
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs21.jpg'
    },
    {
        bookId: 12,
        title:'Frog and Toad Are Friends',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs22.jpg'
    },
    {
        bookId: 13,
        title:'Green Eggs and Ham',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs23.jpg'
    },
    {
        bookId: 14,
        title:'Harold and the Purple Crayon',
        thumbnail: 'https://s3.amazonaws.com/polli-static/images/bs_sample_covers/bs24.jpg'
    }
];


export default class Bookstore extends React.Component {

  constructor(props) {
    super(props);

    var demoBook = {
          "title": "War and Peace",
          "thumbnail": 'https://images-na.ssl-images-amazon.com/images/I/510UE7bvHoL._SY344_BO1,204,203,200_.jpg',
          "L1": 'English',
          "L2": 'German',
          "author": "Loolie",
          "bookId": "peter-rabbit",
          "about": "A novel by the Russian author Leo Tolstoy, which is regarded as a central work of world literature and one of Tolstoy's finest literary achievements",
          "ages": "60+",
          "publisher": "The Russian Messenger",
          "rating": 1.5,
      }

    var demoBook2 = {
        "title": "I will help you",
        "thumbnail": 'https://bookdash.org/wp-content/uploads/2015/12/i-will-help-you-cover-600x590.jpg',
        "L1": 'English',
        "L2": 'Spanish',
        "author": "Andrea Abbott",
        "bookId": "i-will-help-you",
        "about": "When Mama Heron needs help, Lungile comes to her rescue.",
        "ages": "Definitely EVERYONE!",
        "publisher": "Bookdash",
        "rating": 3.7,
    }

    var demoBook3 = {
          "title": "Bananas: A Deep Analysis",
          "thumbnail": 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/17499197_10154290656191366_6391349757135483406_n.jpg?oh=fa79f01cd80d93656dddbc666c948a2b&oe=59602942',
          "L1": 'English',
          "L2": 'Spanish',
          "author": "Loolie",
          "bookId": "banana-rabbit",
          "about": "BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA BANANA BA NA NA NA BAAAAAA BANANA ",
          "ages": "1-2",
          "publisher": "PutzkyPress",
          "rating": 4.9,
      }


    this.state = {
      dataSource: [ demoBook, demoBook2, demoBook3],
    }
  }
  static navigationOptions = {
    title: 'Bookstore',
  };

  renderItem = ({item}) => {
      const {navigation} = this.props;
      return <DownloadableBook key={item.bookId} book={item} navigation={ navigation } />
  }

  componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
  }

  renderShelf(data,title){
    const { navigation } = this.props;
    return (
      <View>
        <View style={styles.galleryShelfTitle}><Text style={styles.galleryShelfTitleText}>{title}</Text></View>

        <FlatList
            horizontal
            data={data}
            renderItem={this.renderItem}
            initialNumToRender={BOOKS_TO_RENDER}
            navigation={ navigation }
            style={styles.galleryFlatList}
        />

        {/* shelf top */}
        <View style={styles.galleryShelfTopContainer}>
          <View style={styles.galleryShelfTriangle} />
          <View style={styles.galleryShelfTop} />
        </View>

        {/* shelf */}
        <View style={styles.galleryShelfRectangle} />

      </View>
    );
  }

  render() {
  const { navigation } = this.props;
  console.log("NAVIGATION HERE", navigation);
  /*    return  <View style={styles.storeGalleryContainer}>
          <GridView
              items={this.state.dataSource}
              itemsPerRow={BOOKS_PER_ROW}
              renderItem={this.renderItem}
              contentContainerStyle={styles.listView}
              navigation={ navigation }
            />
            {this.renderShelf(this.state.dataSource,"Favorites:")}
            
      </View>*/
      return (
          <ScrollView style={styles.storeGalleryContainer}>
            {this.renderShelf(second_shelf,"Disney:")}
            {this.renderShelf(third_shelf,"Templar:")}
            {this.renderShelf(fourth_shelf,"Little Tiger:")}
          </ScrollView>

      )

  }
}
