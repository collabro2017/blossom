import RNFetchBlob from 'react-native-fetch-blob';
import React from 'react';
import { unzip } from 'react-native-zip-archive'

import LocalLibraryDAO from './LocalLibraryDAO.js';

var LocalLibrary = new LocalLibraryDAO();

function ObjectCreator(obj) { // CONSTRUCTOR CAN BE OVERLOADED WITH AN OBJECT
  // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
  for (var prop in obj) this[prop] = obj[prop];
}

function readFileIntoBook(basePath, bookFilename, context) {
    var path = basePath + bookFilename;
    console.log('going to read ', basePath + bookFilename);
    RNFetchBlob.fs.readFile(path, 'utf8')
      .then((data) => {
          var book = new ObjectCreator(JSON.parse(data));

          book.thumbnail = `file://${basePath}${book.cover_image_thumbnail}`;

          for(i=0; i<book.pages.length; i++) {
              var page = book.pages[i];
              for(j=0; j<page.content.length; j++) {
                  var node = page.content[j];
                  if(node.type == 'image') {
                      // divert image from assets to absolute paths
                      node.src = `file://${basePath}${node.src}`;
                  }
              }
          }
          
          context.fetchDone(book);
    })
    .catch((err) => { console.log(`Exception when reading book from ${path}: >> ${err} <<`) });
}

class PolliBookFetch {

    fetchBook(bookId, context) {
        console.log('fetching', bookId);
        // check if book is stored locally
        var path = this.getPathForId(bookId);
        RNFetchBlob.fs.exists(path)
        .then((exist) => {
            console.log(`file ${exist ? '' : 'not'} exists`)
            if(exist) {
                readFileIntoBook(this.getUnzipPathForId(bookId), 'book.json', context);
            }
            else { // if not, download and store it
                console.log('trying to fetch');
                this.getRemoteBook(bookId, context);
            }
        })
        .catch(() => { console.log(`Exception when checking if file ${path} exists`) })
    }

    getPathForId(bookId) {
        return this.getUnzipPathForId(bookId) + 'contents.zip';
    }

    getBookPathForId(bookId) {
        return this.getUnzipPathForId(bookId) + 'book.json';
    }

    getUnzipPathForId(bookId) {
        let dirs = RNFetchBlob.fs.dirs
        return dirs.DocumentDir + `/${bookId}/`;
    }

    getRemoteBook(bookId, context) {
        RNFetchBlob
        .config({
            // response data will be saved to this path if it has access right.
            path : this.getPathForId(bookId),
        })
        .fetch('GET', 'https://s3.amazonaws.com/polli-static/peter-rabbit/peter-rabbit.zip', {
            //some headers ..
        })
        .progress((received, total) => {
            var percent = `${Math.ceil(received/total*100)}% `;
            context.setState({percentDownloaded : percent });
        })
        .then((res) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('The file saved to ', res.path());

            context.setState({percentDownloaded : '100%' });

            //unzip
            const sourcePath = res.path();
            const targetPath = this.getUnzipPathForId(bookId);

            unzip(sourcePath, targetPath)
            .then((path) => {
              console.log(`unzip completed at ${path}`);
                  //RNFetchBlob.fs.readFile(PATH_TO_READ, 'base64')

                  // add book to local library
                  LocalLibrary.save(bookId, `${this.getUnzipPathForId(bookId)}`)
                  readFileIntoBook(this.getUnzipPathForId(bookId), 'book.json', context);
            })
            .catch((error) => {
              console.log(error)
          });
        })
    }

}

module.exports = PolliBookFetch;
