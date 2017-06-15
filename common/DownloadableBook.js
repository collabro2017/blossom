import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FitImage from 'react-native-fit-image';

var PolliBookFetch = require('./polli-book-fetch.js');
import styles from "./PolliStyles";

const fetcher = new PolliBookFetch();

export default class DownloadableBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = { percentDownloaded : 0,
                        showProgress : false }
    }

    showReader(book) {
        const { navigate } = this.props.navigation;
        global.currentBook = book;
        navigate('Reader',{blend:'A'});
    }

    showLibraryDetails(book) {
        const { navigate } = this.props.navigation;
        global.currentBook = book;
        navigate('BookLibraryDetail');
    }

    fetchDone(book) {
        //var book = require(bookJsonPath);
        this.showReader(book);
        this.setState({showProgress : false});
    }

    downloadBook(bookDescriptor) {
        this.setState({showProgress : true, percentDownloaded: 0});
        fetcher.fetchBook(bookDescriptor.bookId, this);
    }

    shouldShowOverlay() {
        if(!this.state.showProgress) {
            return { display: 'none' };
        }

        return { display: 'flex' };
    }

    render() {
      const { navigate } = this.props.navigation;

      return (
        <TouchableOpacity
        onPress={() => this.downloadBook(this.props.book)}
        onLongPress={() => this.showLibraryDetails(this.props.book)}
        style={styles.physicalBook} >
            <View>
                <View>
                  <FitImage
                    source={{uri: this.props.book.thumbnail}}
                    style={styles.thumbnail}
                  />
                </View>
                <View style={[styles.downloadOverlay,this.shouldShowOverlay()]}>
                    <Text style={styles.downloadProgress}>{this.state.percentDownloaded}</Text>
                </View>
            </View>
        </TouchableOpacity>
      );
  }
}
